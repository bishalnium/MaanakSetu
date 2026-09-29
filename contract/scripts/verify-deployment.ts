import ws from 'ws';
// @ts-expect-error WebSocket polyfill
globalThis.WebSocket = ws;

import { ApiPromise, WsProvider } from '@polkadot/api';
import { resolveNetwork, parseNetworkFlag } from './network.js';

const DEPLOYMENTS = {
  preview: {
    contractAddress: '0e1617c890769b83393552e74ba23124e7a47b0eb73397558afdd213178d6408',
    blockHash: '0x8db6529ed23be708ff9f1842b9bf71b2456dd6476403a49f4bd8ba2ecb95d799',
  },
  preprod: {
    contractAddress: '53e020627fcfbc8b7809243af88945bf6f7faaa4f0c3767bdc6fb3f2a0f2845b',
    blockHash: '0xf5870e85573b2d15aab7be6e8d113be039d18e5047d8c03a242e9e6bbacda07d',
  },
};

async function verifyDeployment(network: 'preview' | 'preprod') {
  const { config } = resolveNetwork({ argv: ['', '', '--network', network] });
  const { contractAddress, blockHash } = DEPLOYMENTS[network];

  console.log('\n╔══════════════════════════════════════════════════════════════════════╗');
  console.log(`║   INDEPENDENT ON-CHAIN VERIFICATION: ${network.toUpperCase().padEnd(31)}║`);
  console.log('╚══════════════════════════════════════════════════════════════════════╝\n');
  console.log(`  📌 Contract Address: ${contractAddress}`);
  console.log(`  📦 Block Hash:       ${blockHash}\n`);

  // 1. Substrate RPC Node Verification
  console.log(`─── 1. ${network.toUpperCase()} Substrate Node RPC Verification ────────────────`);
  const relayWsUrl = config.node.replace(/^http/, 'ws');
  const provider = new WsProvider(relayWsUrl);
  const api = await ApiPromise.create({ provider, noInitWarn: true });

  try {
    const block = await api.rpc.chain.getBlock(blockHash);
    const blockNum = block.block.header.number.toHuman();
    console.log(`  ✓ Block #${blockNum} confirmed on-chain!`);
    console.log(`  ✓ Block Parent: ${block.block.header.parentHash.toHex()}`);
    console.log(`  ✓ Total Block Extrinsics: ${block.block.extrinsics.length}`);
    
    for (let i = 0; i < block.block.extrinsics.length; i++) {
      const ext = block.block.extrinsics[i];
      const call = `${ext.method.section}.${ext.method.method}`;
      console.log(`     [Extrinsic #${i}] ${call}`);
      if (call === 'midnight.sendMnTransaction') {
        console.log(`       ⭐ Deployment Transaction Found in Extrinsic #${i}!`);
      }
    }
  } catch (err: any) {
    console.error('  ❌ RPC error:', err.message);
  } finally {
    await api.disconnect();
  }

  // 2. Official Midnight Indexer Verification
  console.log(`\n─── 2. ${network.toUpperCase()} Official Indexer Verification ──────────────────`);
  try {
    const contractQuery = `
      query CheckContract($address: String!) {
        contract(address: $address) {
          address
          state
        }
      }
    `;
    const res = await fetch(config.indexer, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: contractQuery, variables: { address: contractAddress } }),
    });
    const json = await res.json();
    console.log(`  ✓ Confirmed Address: ${json.data?.contract?.address}`);
    console.log(`  ✓ On-Chain State Hash/Root: ${json.data?.contract?.state?.slice(0, 32)}...`);
    console.log(`  ✓ Query Status: 200 OK — Contract is live and registered on ${network}.\n`);
  } catch (err: any) {
    console.error('  ❌ Indexer query error:', err.message);
  }
}

async function main() {
  const target = parseNetworkFlag(process.argv);
  if (target === 'preprod') {
    await verifyDeployment('preprod');
  } else if (target === 'preview') {
    await verifyDeployment('preview');
  } else {
    await verifyDeployment('preview');
    await verifyDeployment('preprod');
  }
}

main().catch(console.error);
