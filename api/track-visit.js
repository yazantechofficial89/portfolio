import dbConnect from './_lib/dbConnect.js';
import Visitor from './_models/Visitor.js';

function parseUserAgent(ua = '') {
  const lower = ua.toLowerCase();
  
  // Device Type
  let deviceType = 'Desktop';
  if (/mobile|iphone|ipod|android.*mobile|windows phone/i.test(lower)) {
    deviceType = 'Mobile';
  } else if (/ipad|tablet|android(?!.*mobile)/i.test(lower)) {
    deviceType = 'Tablet';
  }

  // OS
  let os = 'Unknown OS';
  if (/windows/i.test(lower)) os = 'Windows';
  else if (/android/i.test(lower)) os = 'Android';
  else if (/iphone|ipad|ipod/i.test(lower)) os = 'iOS';
  else if (/macintosh|mac os x/i.test(lower)) os = 'macOS';
  else if (/linux/i.test(lower)) os = 'Linux';

  // Browser
  let browser = 'Unknown Browser';
  if (/samsungbrowser/i.test(lower)) browser = 'Samsung Internet';
  else if (/edg\//i.test(lower)) browser = 'Microsoft Edge';
  else if (/opr\/|opera/i.test(lower)) browser = 'Opera';
  else if (/chrome|crios/i.test(lower)) browser = 'Google Chrome';
  else if (/firefox|fxios/i.test(lower)) browser = 'Mozilla Firefox';
  else if (/safari/i.test(lower) && !/chrome|crios/i.test(lower)) browser = 'Apple Safari';

  return { deviceType, os, browser };
}

function resolveTrafficSource(referrer = '', queryRef = '') {
  if (queryRef && queryRef.trim()) {
    const q = queryRef.trim().toLowerCase();
    if (q.includes('linkedin')) return 'LinkedIn';
    if (q.includes('github')) return 'GitHub';
    if (q.includes('insta')) return 'Instagram';
    if (q.includes('whatsapp') || q.includes('wa')) return 'WhatsApp';
    if (q.includes('resume') || q.includes('cv')) return 'Resume/CV Link';
    if (q.includes('google')) return 'Google Search';
    if (q.includes('bing')) return 'Bing Search';
    return queryRef.trim();
  }

  if (!referrer || referrer === 'Direct' || referrer === '') {
    return 'Direct (URL Typed / Bookmarked)';
  }

  try {
    const url = new URL(referrer);
    const host = url.hostname.toLowerCase();

    if (host.includes('linkedin.com') || host.includes('lnkd.in')) return 'LinkedIn';
    if (host.includes('github.com')) return 'GitHub';
    if (host.includes('instagram.com')) return 'Instagram';
    if (host.includes('whatsapp.com') || host.includes('wa.me')) return 'WhatsApp';
    if (host.includes('google.com') || host.includes('google.co')) return 'Google Search';
    if (host.includes('bing.com')) return 'Bing Search';
    if (host.includes('duckduckgo.com')) return 'DuckDuckGo';
    if (host.includes('t.co') || host.includes('twitter.com') || host.includes('x.com')) return 'Twitter / X';
    if (host.includes('youtube.com') || host.includes('youtu.be')) return 'YouTube';
    if (host.includes('facebook.com') || host.includes('fb.com')) return 'Facebook';
    if (host.includes('reddit.com')) return 'Reddit';
    if (host.includes('yazangupta.online') || host.includes('localhost')) return 'Internal Navigation';

    return host.replace(/^www\./, '');
  } catch {
    return 'External Referral';
  }
}

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  // Parse body safely (supports JSON object or stringified beacon)
  let payload = {};
  if (typeof req.body === 'string') {
    try {
      payload = JSON.parse(req.body);
    } catch {
      payload = {};
    }
  } else if (typeof req.body === 'object' && req.body !== null) {
    payload = req.body;
  }

  const visitorId = payload.visitorId || `anon_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const sessionId = payload.sessionId || '';
  const path = payload.path || '/';
  const fullUrl = payload.fullUrl || '';
  const rawReferrer = payload.referrer || req.headers['referer'] || '';
  const queryRef = payload.utmSource || payload.ref || payload.source || '';
  const utmMedium = payload.utmMedium || '';
  const utmCampaign = payload.utmCampaign || '';
  const screenResolution = payload.screenResolution || '';
  const language = payload.language || req.headers['accept-language']?.split(',')[0] || 'en';
  const isFirstVisit = Boolean(payload.isFirstVisit);

  const rawUa = req.headers['user-agent'] || payload.userAgent || '';
  const { deviceType, os, browser } = parseUserAgent(rawUa);
  const source = resolveTrafficSource(rawReferrer, queryRef);

  // Vercel Geolocation & IP Extraction
  const ipAddress =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    '';

  const country = req.headers['x-vercel-ip-country'] || 'IN';
  const region = req.headers['x-vercel-ip-country-region'] || '';
  let city = '';
  try {
    city = req.headers['x-vercel-ip-city'] ? decodeURIComponent(req.headers['x-vercel-ip-city']) : '';
  } catch {
    city = req.headers['x-vercel-ip-city'] || '';
  }

  // Ignore internal search engine bots if requested (or mark them)
  const isBot = /bot|spider|crawl|slurp|facebookexternalhit|whatsapp|preview/i.test(rawUa);
  if (isBot) {
    return res.status(200).json({ success: true, message: 'Bot request acknowledged without logging' });
  }

  const hasDb = process.env.MONGODB_URI || process.env.MONGO_URI || process.env.DATABASE_URL;

  if (hasDb) {
    try {
      await dbConnect();
      const visitorRecord = await Visitor.create({
        visitorId,
        sessionId,
        path,
        fullUrl,
        referrer: rawReferrer || 'Direct',
        source,
        utmSource: queryRef,
        utmMedium,
        utmCampaign,
        ipAddress,
        country,
        city,
        region,
        userAgent: rawUa,
        deviceType,
        browser,
        os,
        screenResolution,
        language,
        isFirstVisit,
      });

      console.log(`[VisitorTracker] Logged visit: ${source} -> ${path} (${city ? city + ', ' : ''}${country})`);
      return res.status(200).json({ success: true, id: visitorRecord._id });
    } catch (err) {
      console.error('[VisitorTracker] DB Error:', err.message);
      return res.status(200).json({ success: false, warning: 'DB log error' });
    }
  }

  return res.status(200).json({ success: true, warning: 'MONGODB_URI not configured in current runtime' });
}
