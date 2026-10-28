/**
 * Asynchronously tracks resume download events to MongoDB
 * Uses fetch with keepalive to ensure the tracking request completes.
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

    if (typeof fetch === 'function') {
      fetch('/api/resume-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.success) {
            console.log(`[ResumeDownload] Logged successfully. Total: ${data.totalDownloads}`);
          }
        })
        .catch(() => {
          // Fail silently
        });
    }
  } catch (e) {
    // Fail silently
  }
}
