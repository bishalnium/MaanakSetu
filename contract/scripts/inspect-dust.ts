import { WebSocket } from 'ws';
import { resolveNetwork, getOrCreateWallet } from './network.js';
import { createWallet, unshieldedToken } from './wallet.js';

// @ts-expect-error WebSocket polyfill required in Node.js
globalThis.WebSocket = WebSocket;

async function check(network: 'preview' | 'preprod') {
  console.log(`\n─── Checking ${network.toUpperCase()} ───────────────────────`);
  const { config: networkConfig } = resolveNetwork({ argv: ['node', 'script', '--network', network] });
  const walletCreds = getOrCreateWallet(network);
  
  const walletCtx = await createWallet({ network, networkConfig, seed: walletCreds.seed, restore: false });
  const address = walletCtx.unshieldedKeystore.getBech32Address().toString();
  console.log(`Address: ${address}`);

  const state = await new Promise<any>((resolve) => {
    const sub = walletCtx.wallet.state().subscribe((s) => {
      const bal = s.unshielded?.balances?.[unshieldedToken().raw] ?? 0n;
      if (s.isSynced || bal > 0n) {
        sub.unsubscribe();
        resolve(s);
      }
    });
  });

  const tNightBalance = state.unshielded?.balances?.[unshieldedToken().raw] ?? 0n;
  console.log(`tNIGHT: ${tNightBalance.toLocaleString()}`);
  
  console.log('Dust object keys:', Object.keys(state.dust || {}));
  try {
    const dustVal = state.dust?.balance ? state.dust.balance(new Date()) : 'no balance method';
    console.log(`Dust balance(now):`, dustVal);
  } catch (e: any) {
    console.log(`Dust balance call error:`, e.message);
  }

  if (state.dust?.registeredNight) {
    console.log('Registered NIGHT for dust:', state.dust.registeredNight);
  }

  await walletCtx.wallet.stop();
}

async function main() {
  await check('preview');
  await check('preprod');
  process.exit(0);
}

main().catch(console.error);
