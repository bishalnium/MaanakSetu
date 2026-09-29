import { Buffer } from 'node:buffer';
import * as ledger from '@midnight-ntwrk/midnight-js-protocol/ledger';
import { setNetworkId, getNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { HDWallet, Roles, createKeystore } from '@midnight-ntwrk/wallet-sdk';
import { getOrCreateWallet, loadState, saveState, STATE_VERSION, type NetworkId } from './network.js';

function deriveKeys(seed: string) {
  const hdWallet = HDWallet.fromSeed(Buffer.from(seed, 'hex'));
  if (hdWallet.type !== 'seedOk') throw new Error('Invalid seed');
  const result = hdWallet.hdWallet
    .selectAccount(0)
    .selectRoles([Roles.Zswap, Roles.NightExternal, Roles.Dust])
    .deriveKeysAt(0);
  if (result.type !== 'keysDerived') throw new Error('Key derivation failed');
  hdWallet.hdWallet.clear();
  return result.keys;
}

function getAddressForNetwork(network: NetworkId) {
  setNetworkId(network);
  const networkId = getNetworkId();
  const walletCreds = getOrCreateWallet(network);
  const keys = deriveKeys(walletCreds.seed);
  const unshieldedKeystore = createKeystore(keys[Roles.NightExternal], networkId);
  const unshieldedAddress = unshieldedKeystore.getBech32Address().toString();

  return {
    network,
    address: unshieldedAddress,
    mnemonic: walletCreds.mnemonic,
  };
}

console.log('\n═══════════════════════════════════════════════════════════════════════════');
console.log('            MAANAKSETU — MIDNIGHT WALLET CREDENTIALS GENERATOR            ');
console.log('═══════════════════════════════════════════════════════════════════════════\n');

for (const net of ['preview', 'preprod'] as NetworkId[]) {
  const info = getAddressForNetwork(net);
  console.log(`[NETWORK: ${net.toUpperCase()}]`);
  console.log(`Unshielded Address (Use this for Faucet):`);
  console.log(`👉 ${info.address}`);
  console.log(`\n24-Word Recovery Phrase (Import into 1AM Wallet):`);
  console.log(`👉 ${info.mnemonic}\n`);
  console.log('───────────────────────────────────────────────────────────────────────────\n');
}
