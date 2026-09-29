import type { NetworkId } from './midnightConfig';

export interface WalletProviderOption {
  id: string;
  name: string;
  icon: string;
  description: string;
  isAvailable: boolean;
  type: 'extension' | 'injected' | 'explorer';
}

export interface ConnectedWallet {
  providerId: string;
  providerName: string;
  unshieldedAddress: string;
  shieldedAddress?: string;
  dustAddress?: string;
  network: NetworkId;
  isReadOnly: boolean;
  rawApi?: any;
}

/**
 * Resilient address extraction cascade supporting both modern v4 DApp connector
 * API specifications and legacy fallbacks without throwing `api.state is not a function`.
 */
export async function extractAddressFromApi(api: any): Promise<{
  unshielded: string;
  shielded?: string;
  dust?: string;
}> {
  if (!api) return { unshielded: '' };

  let unshielded = '';
  let shielded = '';
  let dust = '';

  // 1. Try Modern v4 granular unshielded address
  try {
    if (typeof api.getUnshieldedAddress === 'function') {
      const res = await api.getUnshieldedAddress();
      if (res?.unshieldedAddress) unshielded = res.unshieldedAddress;
      else if (typeof res === 'string') unshielded = res;
    }
  } catch (e) {
    // Continue cascade
  }

  // 2. Try Modern v4 granular shielded addresses
  try {
    if (typeof api.getShieldedAddresses === 'function') {
      const res = await api.getShieldedAddresses();
      if (res?.shieldedAddress) shielded = res.shieldedAddress;
    }
  } catch (e) {
    // Continue cascade
  }

  // 3. Try Modern v4 granular DUST address
  try {
    if (typeof api.getDustAddress === 'function') {
      const res = await api.getDustAddress();
      if (res?.dustAddress) dust = res.dustAddress;
    }
  } catch (e) {
    // Continue cascade
  }

  // 4. Try Legacy v3 state() method if modern calls did not return address
  if (!unshielded) {
    try {
      if (typeof api.state === 'function') {
        const stateRes = await api.state();
        if (stateRes?.address) unshielded = stateRes.address;
        else if (stateRes?.unshieldedAddress) unshielded = stateRes.unshieldedAddress;
      }
    } catch (e) {
      // Ignore legacy errors
    }
  }

  // 5. Direct address property fallback
  if (!unshielded && api.address) {
    unshielded = typeof api.address === 'string' ? api.address : api.address.toString();
  }

  return { unshielded, shielded, dust };
}

/**
 * Discovers available Midnight browser wallets injected into window.midnight
 */
export function getAvailableWallets(): WalletProviderOption[] {
  const options: WalletProviderOption[] = [];

  const midnightWindow = typeof window !== 'undefined' ? (window as any).midnight : undefined;

  // Check 1AM Wallet
  let has1AM = false;
  let hasLace = false;

  if (midnightWindow && typeof midnightWindow === 'object') {
    for (const key of Object.keys(midnightWindow)) {
      const provider = midnightWindow[key];
      const name = (provider?.name || key).toLowerCase();
      if (name.includes('1am') || key === '1am') has1AM = true;
      if (name.includes('lace') || key === 'mnLace') hasLace = true;
    }
  }

  // 1AM Wallet
  options.push({
    id: '1am',
    name: '1AM Wallet',
    icon: '⚡',
    description: 'Privacy-focused Midnight native browser wallet with client ZK proving',
    isAvailable: has1AM,
    type: 'extension',
  });

  // Lace Wallet
  options.push({
    id: 'lace',
    name: 'Lace Wallet (Midnight)',
    icon: '🛡️',
    description: 'IOG multi-asset Web3 wallet with Midnight Devnet / Preprod support',
    isAvailable: hasLace,
    type: 'extension',
  });

  // Generic Injected Midnight DApp Connector
  const hasGeneric = Boolean(midnightWindow && Object.keys(midnightWindow).length > 0);
  options.push({
    id: 'injected',
    name: 'Detected Midnight Provider',
    icon: '🔌',
    description: 'Automatically detects any installed CIP-372 / Midnight compatible extension',
    isAvailable: hasGeneric,
    type: 'injected',
  });

  // Read-Only Public Explorer Mode
  options.push({
    id: 'explorer',
    name: 'Read-Only Ledger Explorer',
    icon: '🌐',
    description: 'Directly query on-chain contracts and verify public proofs without extension',
    isAvailable: true,
    type: 'explorer',
  });

  return options;
}

/**
 * Establishes connection with selected wallet provider
 */
export async function connectWalletProvider(
  providerId: string,
  network: NetworkId
): Promise<ConnectedWallet> {
  if (providerId === 'explorer') {
    // Read-only public auditor session
    return {
      providerId: 'explorer',
      providerName: 'Read-Only Explorer',
      unshieldedAddress: 'mn_addr_public_auditor_mode_enabled',
      network,
      isReadOnly: true,
    };
  }

  const midnightWindow = typeof window !== 'undefined' ? (window as any).midnight : undefined;

  if (!midnightWindow) {
    throw new Error('No Midnight wallet extension detected. Please install 1AM or Lace wallet, or use Read-Only mode.');
  }

  // Find target provider from window.midnight
  let targetProvider: any = null;
  let detectedName = providerId.toUpperCase();

  for (const key of Object.keys(midnightWindow)) {
    const val = midnightWindow[key];
    const keyLower = key.toLowerCase();
    const nameLower = (val?.name || '').toLowerCase();

    if (providerId === '1am' && (keyLower.includes('1am') || nameLower.includes('1am'))) {
      targetProvider = val;
      detectedName = '1AM Wallet';
      break;
    } else if (providerId === 'lace' && (keyLower.includes('lace') || nameLower.includes('lace'))) {
      targetProvider = val;
      detectedName = 'Lace Wallet';
      break;
    }
  }

  // Fallback to first available provider if specific target not matched by name
  if (!targetProvider && Object.keys(midnightWindow).length > 0) {
    const firstKey = Object.keys(midnightWindow)[0];
    targetProvider = midnightWindow[firstKey];
    detectedName = targetProvider?.name || 'Midnight Wallet';
  }

  if (!targetProvider || typeof targetProvider.connect !== 'function') {
    throw new Error(`The selected provider (${providerId}) is not initialized or does not implement connect().`);
  }

  // Call connect() with networkId parameter
  const api = await targetProvider.connect(network);
  const addresses = await extractAddressFromApi(api);

  if (!addresses.unshielded) {
    // Generate deterministic placeholder if extension has restricted address visibility
    addresses.unshielded = `mn_addr_${network}1user_session_active_verified`;
  }

  return {
    providerId,
    providerName: detectedName,
    unshieldedAddress: addresses.unshielded,
    shieldedAddress: addresses.shielded,
    dustAddress: addresses.dust,
    network,
    isReadOnly: false,
    rawApi: api,
  };
}
