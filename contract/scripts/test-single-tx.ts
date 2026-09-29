import ws from 'ws';
// @ts-expect-error WebSocket polyfill required
globalThis.WebSocket = ws;

import { ApiPromise, WsProvider } from '@polkadot/api';
import { u8aToHex } from '@polkadot/util';
import { MidnightBech32m, UnshieldedAddress } from '@midnight-ntwrk/wallet-sdk-address-format';
import { resolveNetwork, getOrCreateWallet } from './network.js';
import { createWallet, unshieldedToken } from './wallet.js';

async function broadcastTransaction(api: ApiPromise, tx: any): Promise<{ txId: string; blockHash: string }> {
  const rawIds = tx.identifiers && typeof tx.identifiers === 'function' ? tx.identifiers() : [];
  const candidateId = rawIds.length > 0 ? rawIds.at(-1) : undefined;
  const serialized = tx.serialize ? tx.serialize() : tx;
  const hex = u8aToHex(serialized);

  const subTx = api.tx.midnight.sendMnTransaction(hex);
  return await new Promise<{ txId: string; blockHash: string }>((resolve, reject) => {
    let unsub: (() => void) | undefined;
    subTx.send((result) => {
      console.log(`Transaction status: ${result.status.type}`);
      if (result.status.isInBlock) {
        const blockHash = result.status.asInBlock.toHex();
        const txId = candidateId || blockHash;
        if (unsub) { try { unsub(); } catch {} }
        resolve({ txId, blockHash });
      } else if (result.isError) {
        if (unsub) { try { unsub(); } catch {} }
        reject(new Error(`Submission error: ${JSON.stringify(result)}`));
      }
    }).then((unsubFn) => { unsub = unsubFn; }).catch(reject);
  });
}

async function main() {
  const { network, config } = resolveNetwork({ argv: ['', '', '--network', 'preview'] });
  console.log(`Testing signed transfer on ${network}...`);

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

  const dustBal = state.dust.balance(new Date());
  console.log(`DUST Balance: ${dustBal.toLocaleString()}`);

  const recipientStr = 'mn_addr_preview154hy4ceav3qcf76aaf7rpf9h6e62ncxpwe9tvupa35nye90hl3cs4mcaqh';
  console.log(`Sending 10,000 tNIGHT to ${recipientStr}...`);

  const bech = MidnightBech32m.parse(recipientStr);
  const receiverAddress = new UnshieldedAddress(Buffer.from(bech.data));

  const recipe = await walletCtx.wallet.transferTransaction(
    [
      {
        type: 'unshielded',
        outputs: [
          {
            type: unshieldedToken().raw,
            receiverAddress,
            amount: 10_000n,
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

  console.log('Signing recipe with unshielded keystore...');
  const signedRecipe = await walletCtx.wallet.signRecipe(recipe, (data: Uint8Array) =>
    walletCtx.unshieldedKeystore.signData(data)
  );

  console.log('Finalizing recipe...');
  const finalized = await walletCtx.wallet.finalizeRecipe(signedRecipe);
  console.log('Broadcasting transaction to Midnight Substrate node...');
  const { txId, blockHash } = await broadcastTransaction(api, finalized);
  console.log(`\n🎉 SUCCESS! Real On-Chain Transfer Confirmed in Block!`);
  console.log(`TxID: ${txId}`);
  console.log(`Block: ${blockHash}`);
  console.log(`Explorer: https://preview.midnightexplorer.com/transactions/${txId}\n`);

  await api.disconnect();
  await walletCtx.wallet.stop();
}

main().catch(console.error);
