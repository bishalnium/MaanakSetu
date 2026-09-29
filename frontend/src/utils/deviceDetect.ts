/**
 * Enterprise hardware-aware and viewport device detection utility
 * Detects pointer capabilities, screen dimensions, and operating systems
 * to route mobile wallet deep-links and adapt responsive layouts.
 */

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  hasTouch: boolean;
  hasCoarsePointer: boolean;
  os: 'ios' | 'android' | 'windows' | 'macos' | 'linux' | 'unknown';
  screenCategory: 'mobile' | 'tablet' | 'desktop' | 'widescreen';
  supportsExtension: boolean;
}

export function detectDevice(): DeviceInfo {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      hasTouch: false,
      hasCoarsePointer: false,
      os: 'unknown',
      screenCategory: 'desktop',
      supportsExtension: true,
    };
  }

  const hasTouch = navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
  const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const width = window.innerWidth;

  // OS Detection
  const ua = navigator.userAgent || '';
  let os: DeviceInfo['os'] = 'unknown';
  if (/iPad|iPhone|iPod/.test(ua)) os = 'ios';
  else if (/Android/i.test(ua)) os = 'android';
  else if (/Win/i.test(ua)) os = 'windows';
  else if (/Mac/i.test(ua)) os = 'macos';
  else if (/Linux/i.test(ua)) os = 'linux';

  const isMobile = (hasTouch && hasCoarsePointer && width < 768) || width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024 && width < 1600;
  const isWidescreen = width >= 1600;

  let screenCategory: DeviceInfo['screenCategory'] = 'desktop';
  if (isMobile) screenCategory = 'mobile';
  else if (isTablet) screenCategory = 'tablet';
  else if (isWidescreen) screenCategory = 'widescreen';

  // Desktop Chromium/Firefox browsers support Midnight extensions (Lace / 1AM)
  const supportsExtension = !isMobile && (os === 'windows' || os === 'macos' || os === 'linux');

  return {
    isMobile,
    isTablet,
    isDesktop,
    hasTouch,
    hasCoarsePointer,
    os,
    screenCategory,
    supportsExtension,
  };
}

/**
 * Mobile wallet routing helper. If a mobile user wants to connect their wallet,
 * this generates the appropriate deep link or in-app browser redirect.
 */
export function getMobileWalletRedirect(provider: '1aim' | 'lace', currentUrl: string): string {
  const encodedUrl = encodeURIComponent(currentUrl);

  if (provider === '1aim') {
    return `https://1aim.xyz/dapp?url=${encodedUrl}`;
  }

  // Lace Wallet preview / preprod mobile web
  return `https://www.lace.io/download`;
}
