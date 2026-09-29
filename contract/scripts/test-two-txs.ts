import ws from 'ws';
// @ts-expect-error WebSocket polyfill required
globalThis.WebSocket = ws;

import { ApiPromise, WsProvider } from '@polkadot/api';
import { u8aToHex } from '@polkadot/util';
import { MidnightBech32m, UnshieldedAddress } from '@midnight-ntwrk/wallet-sdk-address-format';
import { resolveNetwork, getOrCreateWallet } from './network.js';
import { createWallet, unshieldedToken } from './wallet.js';

async function broadcastTransaction(api: ApiPromise, tx: any): Promise<{ txId: string; blockHash: string; blockNum?: string }> {
  const rawIds = tx.identifiers && typeof tx.identifiers === 'function' ? tx.identifiers() : [];
  const candidateId = rawIds.length > 0 ? rawIds.at(-1) : undefined;
  const serialized = tx.serialize ? tx.serialize() : tx;
  const hex = u8aToHex(serialized);

  const subTx = api.tx.midnight.sendMnTransaction(hex);
  return await new Promise<{ txId: string; blockHash: string; blockNum?: string }>((resolve, reject) => {
    let unsub: (() => void) | undefined;
    subTx.send(async (result) => {
      if (result.status.isInBlock) {
        const blockHash = result.status.asInBlock.toHex();
        const txId = candidateId || blockHash;
        let blockNum: string | undefined;
        try {
          const header = await api.rpc.chain.getHeader(blockHash);
          blockNum = header.number.toHuman();
        } catch {}
        if (unsub) { try { unsub(); } catch {} }
        resolve({ txId, blockHash, blockNum });
      } else if (result.isError) {
        if (unsub) { try { unsub(); } catch {} }
        reject(new Error(`Submission error: ${JSON.stringify(result)}`));
      }
    }).then((unsubFn) => { unsub = unsubFn; }).catch(reject);
  });
}

async function sendTransfer(walletCtx: any, api: ApiPromise, recipientStr: string, amount: bigint) {
  const bech = MidnightBech32m.parse(recipientStr);
  const receiverAddress = new UnshieldedAddress(Buffer.from(bech.data));

  console.log(`  [1/4] Generating transfer recipe for ${recipientStr.slice(0, 18)}...`);
  const t0 = Date.now();
  const recipe = await walletCtx.wallet.transferTransaction(
    [
      {
        type: 'unshielded',
        outputs: [
          {
            type: unshieldedToken().raw,
            receiverAddress,
            amount,
          },
        ],
      },
    ],
    {
      shieldedSecretKeys: walletCtx.shieldedSecretKeys,
      dustSecretKey: walletCtx.dustSecretKey,
    },
    {
      ttl: new Date(Date.now() + 15 * 60 * 1000),
      payFees: true,
    }
  );
  console.log(`  [1/4] Recipe generated in ${((Date.now() - t0) / 1000).toFixed(1)}s`);

  console.log(`  [2/4] Signing recipe with keystore...`);
  const signedRecipe = await walletCtx.wallet.signRecipe(recipe, (data: Uint8Array) =>
    walletCtx.unshieldedKeystore.signData(data)
  );

  console.log(`  [3/4] Finalizing recipe...`);
  const finalized = await walletCtx.wallet.finalizeRecipe(signedRecipe);

  console.log(`  [4/4] Broadcasting to Substrate node and waiting for block...`);
  const tBroadcast = Date.now();
  const result = await broadcastTransaction(api, finalized);
  console.log(`  ✓ Block reached in ${((Date.now() - tBroadcast) / 1000).toFixed(1)}s!`);
  return result;
}

async function main() {
  const { network, config } = resolveNetwork({ argv: ['', '', '--network', 'preview'] });
  console.log(`Testing 2 sequential transfers with block settling on ${network}...`);

  const relayWsUrl = config.node.replace(/^http/, 'ws');
  const provider = new WsProvider(relayWsUrl);
  const api = await ApiPromise.create({ provider, noInitWarn: true });

  const walletCreds = getOrCreateWallet(network);
  const walletCtx = await createWallet({
    network,
    networkConfig: config,
    seed: walletCreds.seed,
    restore: true,
  });

  console.log('Waiting for initial wallet sync...');
  const state = await new Promise<any>((resolve, reject) => {
    let resolved = false;
    const sub = walletCtx.wallet.state().subscribe((s: any) => {
      const dust = s.dust?.balance ? s.dust.balance(new Date()) : 0n;
      const dProg = s.dust?.progress;
      const applied = dProg?.appliedIndex ? dProg.appliedIndex.toString() : '?';
      const highest = dProg?.highestRelevantWalletIndex ? dProg.highestRelevantWalletIndex.toString() : '?';

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

  console.log(`✓ Wallet Synced. DUST: ${state.dust.balance(new Date()).toLocaleString()}`);

  const addr1 = 'mn_addr_preview154hy4ceav3qcf76aaf7rpf9h6e62ncxpwe9tvupa35nye90hl3cs4mcaqh';
  const addr2 = 'mn_addr_preview1md7n2sy7j0rzty4wm2gsuuff9r4qwraser9tp468z0ar07zqn5vqxt0wg3';

  console.log('\n--- Sending Tx #1 ---');
  const res1 = await sendTransfer(walletCtx, api, addr1, 5_000n);
  console.log(`✓ Tx #1 Confirmed! Block: ${res1.blockNum || res1.blockHash.slice(0, 10)} | TxID: ${res1.txId}`);

  console.log('\nWaiting 15s for block settlement and indexer sync...');
  await new Promise((r) => setTimeout(r, 15000));

  console.log('\n--- Sending Tx #2 ---');
  const res2 = await sendTransfer(walletCtx, api, addr2, 5_000n);
  console.log(`✓ Tx #2 Confirmed! Block: ${res2.blockNum || res2.blockHash.slice(0, 10)} | TxID: ${res2.txId}`);

  await api.disconnect();
  await walletCtx.wallet.stop();
  console.log('\n🎉 Both sequential transactions completed successfully!');
}

main().catch(console.error);
