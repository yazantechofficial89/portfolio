// Client-side visitor analytics & tracking utility

const VISITOR_KEY = 'yazan_visitor_id';
const SESSION_KEY = 'yazan_session_id';
const LOCAL_ANALYTICS_KEY = 'yazan_local_analytics';

// Country & City inference from browser timezone
function getClientGeoHint() {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (timeZone.includes('Calcutta') || timeZone.includes('Kolkata') || timeZone.includes('India')) {
      return { country: 'India', countryCode: 'IN', city: 'New Delhi', region: 'Delhi' };
    }
    if (timeZone.includes('New_York')) {
      return { country: 'United States', countryCode: 'US', city: 'New York', region: 'NY' };
    }
    if (timeZone.includes('Los_Angeles') || timeZone.includes('San_Francisco')) {
      return { country: 'United States', countryCode: 'US', city: 'San Francisco', region: 'CA' };
    }
    if (timeZone.includes('London')) {
      return { country: 'United Kingdom', countryCode: 'GB', city: 'London', region: 'England' };
    }
    if (timeZone.includes('Berlin') || timeZone.includes('Frankfurt')) {
      return { country: 'Germany', countryCode: 'DE', city: 'Berlin', region: 'Berlin' };
    }
    if (timeZone.includes('Singapore')) {
      return { country: 'Singapore', countryCode: 'SG', city: 'Singapore', region: 'Singapore' };
    }
    if (timeZone.includes('Dubai')) {
      return { country: 'United Arab Emirates', countryCode: 'AE', city: 'Dubai', region: 'Dubai' };
    }
    if (timeZone.includes('Toronto')) {
      return { country: 'Canada', countryCode: 'CA', city: 'Toronto', region: 'Ontario' };
    }
  } catch (e) {}
  return { country: 'India', countryCode: 'IN', city: 'New Delhi', region: 'Delhi' };
}

// Generate or retrieve persistent visitor ID
export function getVisitorId() {
  try {
    let vid = localStorage.getItem(VISITOR_KEY);
    if (!vid) {
      vid = 'v_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
      localStorage.setItem(VISITOR_KEY, vid);
    }
    return vid;
  } catch {
    return 'v_guest_' + Date.now();
  }
}

// Generate or retrieve session ID
export function getSessionId() {
  try {
    let sid = sessionStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = 's_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
      sessionStorage.setItem(SESSION_KEY, sid);
    }
    return sid;
  } catch {
    return 's_guest';
  }
}

// Send non-blocking beacon/request to backend
async function sendPayload(payload) {
  const visitorId = getVisitorId();
  const sessionId = getSessionId();
  const clientGeo = getClientGeoHint();

  const fullData = {
    visitorId,
    sessionId,
    clientGeo,
    referrer: typeof document !== 'undefined' ? document.referrer || 'Direct' : 'Direct',
    ...payload,
  };

  // Update local offline analytics mirror
  recordLocalAnalytics(fullData);

  // Send to server
  try {
    if (typeof fetch !== 'undefined') {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullData),
        keepalive: true,
      }).catch(() => {});
    }
  } catch (e) {
    // Silently suppress network errors
  }
}

// Record into LocalStorage cache so Admin page always has instant data
function recordLocalAnalytics(item) {
  try {
    const raw = localStorage.getItem(LOCAL_ANALYTICS_KEY);
    const store = raw
      ? JSON.parse(raw)
      : {
          visits: [],
          events: [],
          projectClicks: {},
          lastUpdated: Date.now(),
        };

    const now = new Date();
    const timestamp = now.toISOString();

    if (item.type === 'visit') {
      store.visits.unshift({
        path: item.path,
        country: item.clientGeo?.country || 'India',
        countryCode: item.clientGeo?.countryCode || 'IN',
        city: item.clientGeo?.city || 'New Delhi',
        timestamp,
        visitorId: item.visitorId,
      });
      if (store.visits.length > 100) store.visits = store.visits.slice(0, 100);
    } else if (item.type === 'event') {
      store.events.unshift({
        eventType: item.eventType,
        eventData: item.eventData,
        country: item.clientGeo?.country || 'India',
        countryCode: item.clientGeo?.countryCode || 'IN',
        city: item.clientGeo?.city || 'New Delhi',
        timestamp,
      });
      if (store.events.length > 100) store.events = store.events.slice(0, 100);

      // Aggregate project clicks
      if (
        item.eventType === 'project_click' ||
        item.eventType === 'project_demo' ||
        item.eventType === 'project_github'
      ) {
        const title = item.eventData?.projectTitle || 'Project';
        if (!store.projectClicks[title]) {
          store.projectClicks[title] = {
            projectTitle: title,
            projectId: item.eventData?.projectId || '',
            totalClicks: 0,
            demoClicks: 0,
            githubClicks: 0,
          };
        }
        store.projectClicks[title].totalClicks += 1;
        if (item.eventType === 'project_demo') store.projectClicks[title].demoClicks += 1;
        if (item.eventType === 'project_github') store.projectClicks[title].githubClicks += 1;
      }
    }

    localStorage.setItem(LOCAL_ANALYTICS_KEY, JSON.stringify(store));
  } catch (e) {}
}

// Track a Page View
export function trackPageView(path = window.location.pathname) {
  sendPayload({
    type: 'visit',
    path,
  });
}

// Track Project Clicks (Demo, GitHub, Card preview)
export function trackProjectClick(project, linkType = 'demo') {
  if (!project) return;
  const eventType =
    linkType === 'demo'
      ? 'project_demo'
      : linkType === 'github'
      ? 'project_github'
      : 'project_click';

  sendPayload({
    type: 'event',
    eventType,
    path: window.location.pathname,
    eventData: {
      projectId: project.id || project._id || 'proj-id',
      projectTitle: project.title || 'Portfolio Project',
      linkType,
      url: linkType === 'demo' ? project.demoUrl : project.githubUrl,
    },
  });
}

// Track Resume Download (Recruiter signal)
export function trackResumeDownload() {
  sendPayload({
    type: 'event',
    eventType: 'resume_download',
    path: window.location.pathname,
    eventData: {
      label: 'Yazan Gupta Resume PDF',
    },
  });
}

// Track WhatsApp Inquiry Click
export function trackWhatsAppClick(source = 'floating_button') {
  sendPayload({
    type: 'event',
    eventType: 'whatsapp_click',
    path: window.location.pathname,
    eventData: {
      label: `WhatsApp Chat from ${source}`,
    },
  });
}

// Track Contact / Social Click
export function trackContactClick(channel = 'email') {
  sendPayload({
    type: 'event',
    eventType: 'contact_click',
    path: window.location.pathname,
    eventData: {
      channel,
      label: `Clicked ${channel}`,
    },
  });
}

// Read local fallback analytics for instant admin display
export function getLocalAnalytics() {
  try {
    const raw = localStorage.getItem(LOCAL_ANALYTICS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// Reset local storage analytics
export function clearLocalAnalytics() {
  try {
    localStorage.removeItem(LOCAL_ANALYTICS_KEY);
  } catch {}
}
