/*
 * Where to get the Mova app.
 *
 * Booking happens in the app now, not on the website: the old reservation
 * form sent requests nowhere. Every "Réserver" button points here instead.
 */
export const APP_STORE_URL = 'https://apps.apple.com/us/app/mova-mobility/id6762112462';
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.busaccess.client';

/** The section of the home page that shows both store badges. */
export const DOWNLOAD_SECTION = '/#application';

/**
 * The best download link for this visitor: the store of their phone, or the
 * page section with both badges on a computer, where neither store applies.
 */
export function downloadUrl() {
  if (typeof navigator === 'undefined') return DOWNLOAD_SECTION;
  const ua = navigator.userAgent || '';
  if (/iPhone|iPad|iPod/i.test(ua)) return APP_STORE_URL;
  if (/Android/i.test(ua)) return PLAY_STORE_URL;
  return DOWNLOAD_SECTION;
}
