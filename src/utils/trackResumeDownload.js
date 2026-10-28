/**
 * Asynchronously tracks resume download events to MongoDB
 * Uses navigator.sendBeacon with keepalive fallback to ensure
 * the tracking request completes even if the user navigates or opens the file.
 *
 * @param {string} source - 'hero' | 'about' | 'experience' | 'direct'
 */
export function trackResumeDownload(source = 'hero') {
  try {
    const payload = JSON.stringify({
      source,
      referrer: typeof document !== 'undefined' ? document.referrer || '' : '',
      timestamp: new Date().toISOString(),
    });

    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([payload], { type: 'application/json' });
      navigator.sendBeacon('/api/resume-download', blob);
    } else if (typeof fetch === 'function') {
      fetch('/api/resume-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {
        // Fail silently so the user's download is never interrupted
      });
    }
  } catch (e) {
    // Fail silently
  }
}
