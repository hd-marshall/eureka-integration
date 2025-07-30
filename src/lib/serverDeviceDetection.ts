// src/lib/serverDeviceDetection.ts
import { headers } from 'next/headers';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';
export type BrowserType = 'chrome' | 'firefox' | 'safari' | 'edge' | 'opera' | 'other';
export type OSType = 'windows' | 'macos' | 'linux' | 'ios' | 'android' | 'other';

// ============================================================================
// SERVER-ONLY FUNCTIONS (using next/headers)
// ============================================================================

/**
 * Server-side device detection from User-Agent header
 */
export async function getServerDeviceType(): Promise<DeviceType> {
  try {
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || '';
    
    // Mobile detection (prioritize mobile indicators)
    if (/Mobile|Android.*Mobile|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(userAgent)) {
      return 'mobile';
    }
    
    // Tablet detection
    if (/iPad|Android(?!.*Mobile)|Tablet|Kindle|Silk|PlayBook/i.test(userAgent)) {
      return 'tablet';
    }
    
    return 'desktop';
  } catch (error) {
    console.warn('Failed to get server device type:', error);
    return 'desktop';
  }
}

/**
 * Detect browser type from User-Agent (server-side)
 */
export async function getServerBrowserType(): Promise<BrowserType> {
  try {
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || '';
    return detectBrowserFromUA(userAgent);
  } catch {
    return 'other';
  }
}

/**
 * Detect operating system from User-Agent (server-side)
 */
export async function getServerOperatingSystem(): Promise<OSType> {
  try {
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || '';
    return detectOSFromUA(userAgent);
  } catch {
    return 'other';
  }
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