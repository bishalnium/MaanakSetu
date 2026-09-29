import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ws from 'ws';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { u8aToHex } from '@polkadot/util';

// @ts-expect-error WebSocket polyfill required in Node.js
globalThis.WebSocket = ws;

import { resolveNetwork, getOrCreateWallet, formatWalletBackupNotice, recordDeployment } from './network.js';
import { createWallet, persistWalletState, unshieldedToken, type WalletContext } from './wallet.js';

import { deployContract } from '@midnight-ntwrk/midnight-js-contracts';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';

const PRIVATE_STATE_ID = 'maanaksetuPrivateState';

const { network, config: networkConfig } = resolveNetwork();
const WALLET = getOrCreateWallet(network);
const SEED = WALLET.seed;

{
  const notice = formatWalletBackupNotice(WALLET, network);
  if (notice) console.log(notice);
}

async function waitForProofServer(maxAttempts = 30, delayMs = 2000): Promise<boolean> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch(networkConfig.proofServer, {
        method: 'GET',
        signal: AbortSignal.timeout(3000),
      });
      if (res.status === 200) return true;
    } catch {
      if (attempt < maxAttempts) {
        process.stdout.write(`\r  Waiting for proof server on ${networkConfig.proofServer}... (${attempt}/${maxAttempts})   `);
        await new Promise((r) => setTimeout(r, delayMs));
      }
    }
  }
  return false;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const zkConfigPath = path.resolve(__dirname, '..', 'managed');
const contractPath = path.join(zkConfigPath, 'contract', 'index.js');

if (!fs.existsSync(contractPath)) {
  console.error('\n❌ Compiled contract not found in managed/contract/index.js! Run: npm run compile\n');
  process.exit(1);
}

const MaanakSetuModule = await import(pathToFileURL(contractPath).href);

const defaultWitnesses = {
  getSupplierTurnover: (context: any): [any, bigint] => [context.privateState, 12_000_000n],
  getCredentialSecretKey: (context: any): [any, Uint8Array] => [context.privateState, new Uint8Array(32)],
  getCredentialSalt: (context: any): [any, Uint8Array] => [context.privateState, new Uint8Array(32)],
  getCertificationExpiryTimestamp: (context: any): [any, bigint] => [context.privateState, 1861920000n],
  getSupplierExperienceYears: (context: any): [any, bigint] => [context.privateState, 5n],
  getSupplierInsuranceCoverage: (context: any): [any, bigint] => [context.privateState, 5_000_000n],
};

const compiledContract = CompiledContract.make('maanaksetu', MaanakSetuModule.Contract).pipe(
  CompiledContract.withWitnesses(defaultWitnesses),
  CompiledContract.withCompiledFileAssets(zkConfigPath),
);

/**
 * Robust transaction broadcaster via connected Polkadot API
 */
async function broadcastTransaction(api: ApiPromise, tx: any): Promise<string> {
  const rawIds = tx.identifiers && typeof tx.identifiers === 'function' ? tx.identifiers() : [];
  console.log('  Transaction identifiers:', rawIds);
  const candidateId = rawIds.length > 0 ? rawIds.at(-1) : undefined;

  const serialized = tx.serialize ? tx.serialize() : tx;
  const hex = u8aToHex(serialized);
  console.log(`  Broadcasting transaction (${hex.length} hex chars)...`);

  const subTx = api.tx.midnight.sendMnTransaction(hex);
  return await new Promise<string>((resolve, reject) => {
    let unsub: (() => void) | undefined;
    subTx.send((result) => {
      console.log(`  Transaction status: ${result.status.type}`);
      if (result.status.isInBlock) {
        const blockHex = result.status.asInBlock.toHex();
        console.log(`  ✓ Included in block: ${blockHex}`);
        const finalId = candidateId || blockHex;
        console.log(`  ✓ Transaction ID: ${finalId}`);
        if (unsub) {
          try { unsub(); } catch {}
        }
        resolve(finalId);
      } else if (result.status.isFinalized) {
        console.log(`  ✓ Finalized in block: ${result.status.asFinalized.toHex()}`);
      } else if (result.isError) {
        if (unsub) {
          try { unsub(); } catch {}
        }
        reject(new Error(`Transaction submission error: ${JSON.stringify(result)}`));
      }
    }).then((unsubFn) => {
      unsub = unsubFn;
    }).catch(reject);
  });
}

async function createProviders(walletCtx: WalletContext, api: ApiPromise) {
  const privateStatePassword = process.env.PRIVATE_STATE_PASSWORD?.trim() || 'MaanakSetu-Midnight-Secure-Key-2026';

  const walletProvider = {
    getCoinPublicKey: () => walletCtx.shieldedSecretKeys.coinPublicKey,
    getEncryptionPublicKey: () => walletCtx.shieldedSecretKeys.encryptionPublicKey,
    async balanceTx(tx: any, ttl?: Date) {
      console.log('  Balancing deployment transaction with testnet tokens...');
      const recipe = await walletCtx.wallet.balanceUnboundTransaction(
        tx,
        { shieldedSecretKeys: walletCtx.shieldedSecretKeys, dustSecretKey: walletCtx.dustSecretKey },
        { ttl: ttl ?? new Date(Date.now() + 30 * 60 * 1000) },
      );
      console.log('  Recipe created:', recipe.type);
      console.log('  Finalizing recipe...');
      const finalized = await walletCtx.wallet.finalizeRecipe(recipe);
      console.log('  Recipe finalized successfully!');
      return finalized;
    },
    submitTx: async (tx: any) => {
      return broadcastTransaction(api, tx);
    },
  };

  const zkConfigProvider = new NodeZkConfigProvider(zkConfigPath);
  const accountId = walletCtx.unshieldedKeystore.getBech32Address().toString();

  return {
    privateStateProvider: levelPrivateStateProvider({
      privateStateStoreName: 'maanaksetu-private-state',
      accountId,
      privateStoragePasswordProvider: () => privateStatePassword,
    }),
    publicDataProvider: indexerPublicDataProvider(networkConfig.indexer, networkConfig.indexerWS),
    zkConfigProvider,
    proofProvider: httpClientProofProvider(networkConfig.proofServer, zkConfigProvider),
    walletProvider,
    midnightProvider: walletProvider,
  };
}

async function main() {
  console.log('\n╔══════════════════════════════════════════════════════════════════════╗');
  console.log(`║      Deploying MaanakSetu Contract to Midnight ${network.toUpperCase()}      ║`);
  console.log('╚══════════════════════════════════════════════════════════════════════╝\n');

  console.log('─── 1. Substrate Node Connection ───────────────────────────────\n');
  const relayWsUrl = networkConfig.node.replace(/^http/, 'ws');
  console.log(`  Connecting to node: ${relayWsUrl}`);
  const provider = new WsProvider(relayWsUrl);
  const api = await ApiPromise.create({ provider, noInitWarn: true });
  console.log('  ✓ Connected to Midnight Substrate node.\n');

  console.log('─── 2. Wallet Initialization ───────────────────────────────────\n');
  const walletCtx = await createWallet({ network, networkConfig, seed: SEED, restore: true });
  const address = walletCtx.unshieldedKeystore.getBech32Address().toString();
  console.log(`  Wallet Address: ${address}`);

  console.log('  Syncing state with Midnight network...');
  const syncStart = Date.now();

  const state = await new Promise<any>((resolve, reject) => {
    let resolved = false;
    const sub = walletCtx.wallet.state().subscribe((s: any) => {
      const tNight = s.unshielded?.balances?.[unshieldedToken().raw] ?? 0n;
      const dust = s.dust?.balance ? s.dust.balance(new Date()) : 0n;
      const dProg = s.dust?.progress;
      const applied = dProg?.appliedIndex ? dProg.appliedIndex.toString() : '?';
      const highest = dProg?.highestRelevantWalletIndex ? dProg.highestRelevantWalletIndex.toString() : '?';
      const elapsed = Math.round((Date.now() - syncStart) / 1000);

      process.stdout.write(`\r  ⏳ Syncing [${elapsed}s] Index: ${applied}/${highest} | tNIGHT: ${tNight.toLocaleString()} | DUST: ${dust.toLocaleString()}   `);

      // Resolve when both synced and dust gas is confirmed ready
      if (!resolved && (s.isSynced || (dust > 0n && applied === highest))) {
        resolved = true;
        sub.unsubscribe();
        resolve(s);
      }
    });

    walletCtx.wallet.waitForSyncedState().then((s: any) => {
      if (!resolved) {
        resolved = true;
        sub.unsubscribe();
        resolve(s);
      }
    }).catch(reject);
  });

  process.stdout.write('\r  ✓ Synced with network!                                                                             \n\n');

  await persistWalletState(network, walletCtx);

  const tNightBalance = state.unshielded.balances[unshieldedToken().raw] ?? 0n;
  console.log(`  🪙 tNIGHT Balance: ${tNightBalance.toLocaleString()}`);

  if (tNightBalance === 0n) {
    console.log('  ❌ Insufficient Funds for Deployment:');
    console.log(`  Please fund your wallet address via the faucet:`);
    console.log(`  Faucet:  ${networkConfig.faucet}`);
    console.log(`  Address: ${address}\n`);
    await api.disconnect();
    await walletCtx.wallet.stop();
    process.exit(1);
  }

  console.log('\n─── 3. DUST Gas Status ─────────────────────────────────────────\n');
  const dustBal = state.dust?.balance ? state.dust.balance(new Date()) : 0n;
  console.log(`  ⛽ DUST Gas Available: ${dustBal.toLocaleString()}`);

  if (dustBal === 0n) {
    console.log('  ❌ DUST gas balance is 0. Waiting for on-chain DUST UTXO to sync...');
    await api.disconnect();
    await walletCtx.wallet.stop();
    process.exit(1);
  }
  console.log('  ✓ DUST gas active and verified on-chain.\n');

  console.log('─── 4. Checking Proof Server ───────────────────────────────────\n');
  const proofServerReady = await waitForProofServer(5, 1500);
  if (!proofServerReady) {
    console.log(`  ⚠️ Proof server is not currently running on ${networkConfig.proofServer}.`);
    console.log('  Please ensure Docker proof server is active on port 6300.\n');
    await api.disconnect();
    await walletCtx.wallet.stop();
    process.exit(1);
  }
  console.log('  ✓ Proof server ready!\n');

  console.log('─── 5. Deploying MaanakSetu Contract ───────────────────────────\n');
  console.log('  Generating ZK deployment proof and deploying contract...');
  const providers = await createProviders(walletCtx, api);

  const deployed = await deployContract(providers, {
    compiledContract: compiledContract as any,
    args: [],
    privateStateId: PRIVATE_STATE_ID,
    initialPrivateState: {},
  });

  const contractAddress = deployed.deployTxData.public.contractAddress;
  console.log('\n  🎉 MaanakSetu Contract Deployed Successfully!');
  console.log(`  Contract Address: ${contractAddress}\n`);
  console.log(`  Explorer Link: ${networkConfig.explorerUrl ? networkConfig.explorerUrl : 'https://' + network + '.midnightexplorer.com'}/contracts/${contractAddress}\n`);

  recordDeployment(network, contractAddress, address.toString());
  console.log(`  Saved deployment to .midnight-state.json for ${network}.\n`);

  await persistWalletState(network, walletCtx);
  await api.disconnect();
  await walletCtx.wallet.stop();
}

main().catch((err) => {
  console.error('\nDeployment error:', err);
  process.exit(1);
});
