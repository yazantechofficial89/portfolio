import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function VisitorTracker() {
  const location = useLocation();
  const lastTrackedPath = useRef('');

  useEffect(() => {
    // Prevent duplicate logging for the exact same path in quick succession
    if (lastTrackedPath.current === location.pathname) {
      return;
    }
    lastTrackedPath.current = location.pathname;

    try {
      // 1. Persistent Unique Visitor ID
      let isFirstVisit = false;
      let visitorId = localStorage.getItem('yg_visitor_id');
      if (!visitorId) {
        visitorId = 'v_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
        localStorage.setItem('yg_visitor_id', visitorId);
        isFirstVisit = true;
      }

      // 2. Session ID (persists across tabs/refreshes until session ends)
      let sessionId = sessionStorage.getItem('yg_session_id');
      if (!sessionId) {
        sessionId = 's_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
        sessionStorage.setItem('yg_session_id', sessionId);
      }

      // 3. Extract query parameters (e.g. ?ref=linkedin, ?utm_source=github)
      const params = new URLSearchParams(window.location.search);
      const queryRef = params.get('ref') || params.get('source') || '';
      const utmSource = params.get('utm_source') || queryRef;
      const utmMedium = params.get('utm_medium') || '';
      const utmCampaign = params.get('utm_campaign') || '';

      const payload = {
        visitorId,
        sessionId,
        path: location.pathname,
        fullUrl: window.location.href,
        referrer: document.referrer || '',
        utmSource,
        utmMedium,
        utmCampaign,
        screenResolution: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
        language: navigator.language || 'en',
        isFirstVisit,
      };

      // 4. Non-blocking transmission via sendBeacon or fetch keepalive
      const jsonStr = JSON.stringify(payload);
      const endpoint = '/api/track-visit';

      if (typeof navigator.sendBeacon === 'function') {
        const blob = new Blob([jsonStr], { type: 'application/json' });
        navigator.sendBeacon(endpoint, blob);
      } else {
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: jsonStr,
          keepalive: true,
        }).catch(() => {});
      }
    } catch (e) {
      // Silently catch client tracking errors to prevent any UI interruption
      console.debug('[Tracker] Telemetry error:', e);
    }
  }, [location.pathname, location.search]);

  return null;
}
