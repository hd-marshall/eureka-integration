// src/lib/clientDeviceDetection.ts

export type DeviceType = 'mobile' | 'tablet' | 'desktop';
export type BrowserType = 'chrome' | 'firefox' | 'safari' | 'edge' | 'opera' | 'other';
export type OSType = 'windows' | 'macos' | 'linux' | 'ios' | 'android' | 'other';

// ============================================================================
// CLIENT-SIDE DEVICE DETECTION FUNCTIONS
// ============================================================================

/**
 * Client-side device type detection based on window width
 */
export function getClientDeviceType(): DeviceType {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

/**
 * Check if device is mobile (client-side)
 */
export function isMobileDevice(): boolean {
  return getClientDeviceType() === 'mobile';
}

/**
 * Check if device is tablet (client-side)
 */
export function isTabletDevice(): boolean {
  return getClientDeviceType() === 'tablet';
}

/**
 * Check if device is desktop (client-side)
 */
export function isDesktopDevice(): boolean {
  return getClientDeviceType() === 'desktop';
}

/**
 * Check if device has touch capabilities
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Get device pixel ratio for high-DPI displays
 */
export function getDevicePixelRatio(): number {
  if (typeof window === 'undefined') return 1;
  return window.devicePixelRatio || 1;
}

/**
 * Check if device is in landscape mode
 */
export function isLandscapeMode(): boolean {
  if (typeof window === 'undefined') return true;
  return window.innerWidth > window.innerHeight;
}

/**
 * Get viewport dimensions
 */
export function getViewportSize(): { width: number; height: number } {
  if (typeof window === 'undefined') return { width: 1920, height: 1080 };
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

// ============================================================================
// CLIENT-SIDE BROWSER DETECTION FUNCTIONS
// ============================================================================

/**
 * Client-side browser detection
 */
export function getClientBrowserType(): BrowserType {
  if (typeof window === 'undefined') return 'other';
  return detectBrowserFromUA(navigator.userAgent);
}

/**
 * Client-side OS detection
 */
export function getClientOperatingSystem(): OSType {
  if (typeof window === 'undefined') return 'other';
  return detectOSFromUA(navigator.userAgent);
}

/**
 * Check if browser supports modern features
 */
// export function isModernBrowser(): boolean {
//   if (typeof window === 'undefined') return true;
  
//   // Check for key modern browser features
//   return !!(
//     window.fetch &&
//     window.Promise &&
//     window.Map &&
//     window.Set &&
//     Array.prototype.includes &&
//     Object.assign
//   );
// }

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Debounce function for resize events
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function for scroll events
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if user prefers dark mode
 */
export function prefersDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Get user's timezone
 */
export function getUserTimezone(): string {
  if (typeof window === 'undefined') return 'UTC';
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * Get user's locale
 */
export function getUserLocale(): string {
  if (typeof window === 'undefined') return 'en-US';
  return navigator.language || 'en-US';
}

/**
 * Check if page is being loaded in an iframe
 */
export function isInIframe(): boolean {
  if (typeof window === 'undefined') return false;
  return window !== window.top;
}

/**
 * Get referrer information safely
 */
export function getReferrer(): string {
  if (typeof document === 'undefined') return '';
  return document.referrer || '';
}

interface ConnectionInfo {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

interface NavigatorWithConnection extends Navigator {
  connection?: ConnectionInfo;
}

/**
 * Get network connection information
 */
export function getConnectionInfo(): ConnectionInfo | null {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return null;
  }

  const connection = (navigator as NavigatorWithConnection).connection;
  if (!connection) return null;
  
  return {
    effectiveType: connection.effectiveType,
    downlink: connection.downlink,
    rtt: connection.rtt,
    saveData: connection.saveData
  };
}

/**
 * Check if user is on a slow connection
 */
export function isSlowConnection(): boolean {
  const connection = getConnectionInfo();
  if (!connection) return false;
  
  return connection.effectiveType === 'slow-2g' || 
         connection.effectiveType === '2g' ||
         connection.saveData === true;
}

// ============================================================================
// SHARED UTILITY FUNCTIONS (no server dependencies)
// ============================================================================

/**
 * Internal function to detect browser from User-Agent string
 */
function detectBrowserFromUA(userAgent: string): BrowserType {
  if (/Chrome/i.test(userAgent) && !/Edge|Edg/i.test(userAgent)) return 'chrome';
  if (/Firefox/i.test(userAgent)) return 'firefox';
  if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) return 'safari';
  if (/Edge|Edg/i.test(userAgent)) return 'edge';
  if (/Opera|OPR/i.test(userAgent)) return 'opera';
  return 'other';
}

/**
 * Internal function to detect OS from User-Agent string
 */
function detectOSFromUA(userAgent: string): OSType {
  if (/Windows/i.test(userAgent)) return 'windows';
  if (/Macintosh|Mac OS X/i.test(userAgent)) return 'macos';
  if (/Linux/i.test(userAgent) && !/Android/i.test(userAgent)) return 'linux';
  if (/iPhone|iPad|iPod/i.test(userAgent)) return 'ios';
  if (/Android/i.test(userAgent)) return 'android';
  return 'other';
}

// ============================================================================
// SEO FUNCTIONS (client-safe)
// ============================================================================

interface OrganizationData {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
}

interface ServiceData {
  name: string;
  description: string;
  provider: string;
  url: string;
  image?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
}

interface PageData {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  siteName?: string;
}

interface TwitterCardData {
  title: string;
  description: string;
  image?: string;
  card?: 'summary' | 'summary_large_image' | 'app' | 'player';
  creator?: string;
  site?: string;
}

interface RobotsOptions {
  index?: boolean;
  follow?: boolean;
  archive?: boolean;
  snippet?: boolean;
  imageindex?: boolean;
}

/**
 * Generate structured data for organization
 */
export function generateOrganizationStructuredData(org: OrganizationData) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: org.name,
    url: org.url,
    logo: org.logo,
    description: org.description,
    telephone: org.telephone,
    email: org.email,
    address: org.address ? {
      "@type": "PostalAddress",
      ...org.address
    } : undefined
  };
}

/**
 * Generate structured data for service pages
 */
export function generateServiceStructuredData(service: ServiceData) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: service.provider
    },
    url: service.url,
    image: service.image,
    offers: service.offers ? {
      "@type": "Offer",
      price: service.offers.price,
      priceCurrency: service.offers.priceCurrency
    } : undefined
  };
}

/**
 * Generate Open Graph meta tags
 */
export function generateOpenGraphTags(page: PageData) {
  return {
    'og:title': page.title,
    'og:description': page.description,
    'og:url': page.url,
    'og:image': page.image,
    'og:type': page.type || 'website',
    'og:site_name': page.siteName
  };
}

/**
 * Generate Twitter Card meta tags
 */
export function generateTwitterCardTags(page: TwitterCardData) {
  return {
    'twitter:card': page.card || 'summary_large_image',
    'twitter:title': page.title,
    'twitter:description': page.description,
    'twitter:image': page.image,
    'twitter:creator': page.creator,
    'twitter:site': page.site
  };
}

/**
 * Generate canonical URL with proper formatting
 */
export function generateCanonicalUrl(baseUrl: string, path: string): string {
  const cleanBase = baseUrl.replace(/\/$/, '');
  const cleanPath = path.replace(/^\//, '');
  return `${cleanBase}/${cleanPath}`;
}

/**
 * Generate robots meta content based on page type
 */
export function generateRobotsContent(options: RobotsOptions): string {
  const {
    index = true,
    follow = true,
    archive = true,
    snippet = true,
    imageindex = true
  } = options;

  const directives = [
    index ? 'index' : 'noindex',
    follow ? 'follow' : 'nofollow',
    archive ? 'archive' : 'noarchive',
    snippet ? 'snippet' : 'nosnippet',
    imageindex ? 'imageindex' : 'noimageindex'
  ];

  return directives.join(', ');
}