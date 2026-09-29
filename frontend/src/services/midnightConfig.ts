export type NetworkId = 'preview' | 'preprod';

export interface NetworkMetadata {
  id: NetworkId;
  name: string;
  tagline: string;
  rpcUrl: string;
  indexerUrl: string;
  indexerWsUrl: string;
  explorerUrl: string;
  faucetUrl: string;
  contractAddress: string;
  deploymentTx: string;
  blockHeight: number;
}

export const NETWORK_CONFIGS: Record<NetworkId, NetworkMetadata> = {
  preview: {
    id: 'preview',
    name: 'Midnight Preview',
    tagline: 'Developer Preview Testnet',
    rpcUrl: 'https://rpc.preview.midnight.network',
    indexerUrl: 'https://indexer.preview.midnight.network/api/v4/graphql',
    indexerWsUrl: 'wss://indexer.preview.midnight.network/api/v4/graphql/ws',
    explorerUrl: 'https://preview.midnightexplorer.com',
    faucetUrl: 'https://faucet.preview.midnight.network',
    // Verified on-chain contract address on Midnight Preview
    contractAddress: '0e1617c890769b83393552e74ba23124e7a47b0eb73397558afdd213178d6408',
    deploymentTx: '0x9f51ae78b1c5c35f3b695221763acfc6c1005eee8c67c13f3271a90d7e35fd93',
    blockHeight: 1072494,
  },
  preprod: {
    id: 'preprod',
    name: 'Midnight Preprod',
    tagline: 'Production-Candidate Staging',
    rpcUrl: 'https://rpc.preprod.midnight.network',
    indexerUrl: 'https://indexer.preprod.midnight.network/api/v4/graphql',
    indexerWsUrl: 'wss://indexer.preprod.midnight.network/api/v4/graphql/ws',
    explorerUrl: 'https://preprod.midnightexplorer.com',
    faucetUrl: 'https://faucet.preprod.midnight.network',
    // Verified on-chain contract address on Midnight Preprod
    contractAddress: '53e020627fcfbc8b7809243af88945bf6f7faaa4f0c3767bdc6fb3f2a0f2845b',
    deploymentTx: '0x2b6591370bd7d87b23bcfcc28a14a9b8e84e8a9c7d748c405dab781722d922f3',
    blockHeight: 2756460,
  },
};

export const DEFAULT_NETWORK: NetworkId = 'preview';

export function getExplorerContractUrl(network: NetworkId, address: string): string {
  // Always use plural /contracts/ as singular /contract/ returns 404
  const base = NETWORK_CONFIGS[network].explorerUrl;
  return `${base}/contracts/${address.replace(/^0x/, '')}`;
}

export function getExplorerTxUrl(network: NetworkId, txHash: string): string {
  // Always use plural /transactions/
  const base = NETWORK_CONFIGS[network].explorerUrl;
  return `${base}/transactions/${txHash.replace(/^0x/, '')}`;
}
