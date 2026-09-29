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
    // Preview contract address
    contractAddress: '0e1617c890769b83393552e74ba23124e7a47b0eb73397558afdd213178d6408',
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
    // Preprod contract address
    contractAddress: '53e020627fcfbc8b7809243af88945bf6f7faaa4f0c3767bdc6fb3f2a0f2845b',
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
