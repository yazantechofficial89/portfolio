import dbConnect from './lib/dbConnect.js';
import AnalyticsVisit from './models/AnalyticsVisit.js';
import AnalyticsEvent from './models/AnalyticsEvent.js';

// Parse user agent helper
function parseUserAgent(ua = '') {
  const lower = ua.toLowerCase();
  let device = 'desktop';
  if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(lower)) {
    device = 'mobile';
  } else if (/ipad|tablet|playbook|silk/i.test(lower)) {
    device = 'tablet';
  }

  let browser = 'Chrome';
  if (/edg/i.test(lower)) browser = 'Edge';
  else if (/opr|opera/i.test(lower)) browser = 'Opera';
  else if (/firefox|fxios/i.test(lower)) browser = 'Firefox';
  else if (/safari/i.test(lower) && !/chrome/i.test(lower)) browser = 'Safari';
  else if (/chrome|crios/i.test(lower)) browser = 'Chrome';
  else browser = 'Other';

  let os = 'Windows';
  if (/windows/i.test(lower)) os = 'Windows';
  else if (/macintosh|mac os x/i.test(lower)) os = 'macOS';
  else if (/iphone|ipad|ipod/i.test(lower)) os = 'iOS';
  else if (/android/i.test(lower)) os = 'Android';
  else if (/linux/i.test(lower)) os = 'Linux';
  else os = 'Other';

  return { device, browser, os };
}

// Convert Country code to human readable country name if needed
const countryNames = {
  IN: 'India',
  US: 'United States',
  GB: 'United Kingdom',
  CA: 'Canada',
  DE: 'Germany',
  AU: 'Australia',
  SG: 'Singapore',
  AE: 'United Arab Emirates',
  FR: 'France',
  NL: 'Netherlands',
  JP: 'Japan',
  BR: 'Brazil',
};

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, x-admin-key'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const ADMIN_SECRET = process.env.ADMIN_SECRET || 'yazanAdmin2026';

  // 1. POST /api/analytics -> Track Visit or Event
  if (req.method === 'POST') {
    try {
      const {
        type = 'visit', // 'visit' | 'event'
        visitorId,
        sessionId,
        path = '/',
        referrer = 'Direct',
        eventType,
        eventData = {},
        clientGeo = {},
      } = req.body || {};

      if (!visitorId) {
        return res.status(400).json({ success: false, error: 'visitorId is required' });
      }

      // Extract Geolocation from Vercel edge headers with fallback
      const countryCode = (
        req.headers['x-vercel-ip-country'] ||
        clientGeo.countryCode ||
        'IN'
      ).toUpperCase();

      let country =
        req.headers['x-vercel-ip-country-name'] ||
        countryNames[countryCode] ||
        clientGeo.country ||
        'India';

      let city = 'New Delhi';
      if (req.headers['x-vercel-ip-city']) {
        try {
          city = decodeURIComponent(req.headers['x-vercel-ip-city']);
        } catch {
          city = req.headers['x-vercel-ip-city'];
        }
      } else if (clientGeo.city) {
        city = clientGeo.city;
      }

      let region = 'Delhi';
      if (req.headers['x-vercel-ip-country-region']) {
        try {
          region = decodeURIComponent(req.headers['x-vercel-ip-country-region']);
        } catch {
          region = req.headers['x-vercel-ip-country-region'];
        }
      } else if (clientGeo.region) {
        region = clientGeo.region;
      }

      const ip =
        req.headers['x-real-ip'] ||
        (req.headers['x-forwarded-for']
          ? req.headers['x-forwarded-for'].split(',')[0].trim()
          : '127.0.0.1');

      const userAgent = req.headers['user-agent'] || '';
      const { device, browser, os } = parseUserAgent(userAgent);

      // Check if DB is available
      if (process.env.MONGODB_URI) {
        await dbConnect();

        if (type === 'visit') {
          await AnalyticsVisit.create({
            visitorId,
            sessionId: sessionId || '',
            path,
            ip,
            country,
            countryCode,
            city,
            region,
            device,
            browser,
            os,
            referrer,
          });
        } else if (type === 'event') {
          await AnalyticsEvent.create({
            visitorId,
            eventType: eventType || 'custom_event',
            eventData,
            country,
            countryCode,
            city,
            path,
          });
        }
      }

      return res.status(200).json({
        success: true,
        geo: { country, countryCode, city, region },
      });
    } catch (err) {
      console.error('Analytics POST error:', err);
      return res.status(200).json({ success: true, note: 'Buffered locally' });
    }
  }

  // 2. GET /api/analytics -> Return Aggregated Metrics for Admin
  if (req.method === 'GET') {
    const adminKey = req.headers['x-admin-key'] || req.query.key;
    if (!adminKey || adminKey !== ADMIN_SECRET) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: Admin passkey required to access visitor analytics.',
      });
    }

    try {
      if (!process.env.MONGODB_URI) {
        return res.status(200).json({
          success: true,
          warning: 'MONGODB_URI not configured. Showing local browser metrics.',
          isLiveDb: false,
          data: null,
        });
      }

      await dbConnect();

      // Today's date range (midnight to now)
      const now = new Date();
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      // 1. Total Visits & Unique Visitors
      const totalVisits = await AnalyticsVisit.countDocuments();
      const todayVisits = await AnalyticsVisit.countDocuments({
        createdAt: { $gte: startOfToday },
      });

      const uniqueVisitorsList = await AnalyticsVisit.distinct('visitorId');
      const uniqueVisitors = uniqueVisitorsList.length;

      const todayUniqueList = await AnalyticsVisit.distinct('visitorId', {
        createdAt: { $gte: startOfToday },
      });
      const todayUnique = todayUniqueList.length;

      // 2. Top Projects by clicks (from AnalyticsEvent)
      const projectEvents = await AnalyticsEvent.aggregate([
        {
          $match: {
            eventType: { $in: ['project_click', 'project_demo', 'project_github'] },
          },
        },
        {
          $group: {
            _id: '$eventData.projectTitle',
            projectId: { $first: '$eventData.projectId' },
            totalClicks: { $sum: 1 },
            demoClicks: {
              $sum: { $cond: [{ $eq: ['$eventType', 'project_demo'] }, 1, 0] },
            },
            githubClicks: {
              $sum: { $cond: [{ $eq: ['$eventType', 'project_github'] }, 1, 0] },
            },
            lastClicked: { $max: '$createdAt' },
          },
        },
        { $sort: { totalClicks: -1 } },
        { $limit: 10 },
      ]);

      // 3. Country Breakdown
      const countryStats = await AnalyticsVisit.aggregate([
        {
          $group: {
            _id: '$country',
            countryCode: { $first: '$countryCode' },
            visits: { $sum: 1 },
          },
        },
        { $sort: { visits: -1 } },
        { $limit: 12 },
      ]);

      // 4. City Breakdown
      const cityStats = await AnalyticsVisit.aggregate([
        {
          $group: {
            _id: { city: '$city', country: '$country' },
            countryCode: { $first: '$countryCode' },
            visits: { $sum: 1 },
          },
        },
        { $sort: { visits: -1 } },
        { $limit: 12 },
      ]);

      // 5. Recruiter Signals (Resume, WhatsApp, Contact)
      const resumeDownloads = await AnalyticsEvent.countDocuments({
        eventType: 'resume_download',
      });
      const whatsappClicks = await AnalyticsEvent.countDocuments({
        eventType: 'whatsapp_click',
      });
      const contactClicks = await AnalyticsEvent.countDocuments({
        eventType: 'contact_click',
      });

      // 6. Device & Browser stats
      const deviceStats = await AnalyticsVisit.aggregate([
        { $group: { _id: '$device', count: { $sum: 1 } } },
      ]);
      const browserStats = await AnalyticsVisit.aggregate([
        { $group: { _id: '$browser', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 6 },
      ]);

      // 7. Last 7 Days Visits
      const last7DaysVisits = await AnalyticsVisit.aggregate([
        {
          $match: {
            createdAt: { $gte: sevenDaysAgo },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      // 8. Recent Live Activity Stream (Visits & Events combined)
      const recentVisits = await AnalyticsVisit.find({})
        .sort({ createdAt: -1 })
        .limit(20)
        .lean();

      const recentEvents = await AnalyticsEvent.find({})
        .sort({ createdAt: -1 })
        .limit(25)
        .lean();

      return res.status(200).json({
        success: true,
        isLiveDb: true,
        metrics: {
          todayVisits,
          todayUnique,
          totalVisits,
          uniqueVisitors,
          totalProjectClicks: projectEvents.reduce((acc, p) => acc + p.totalClicks, 0),
          resumeDownloads,
          whatsappClicks,
          contactClicks,
        },
        topProjects: projectEvents,
        topCountries: countryStats.map((c) => ({
          country: c._id || 'Unknown',
          countryCode: c.countryCode || 'IN',
          visits: c.visits,
          percentage: totalVisits > 0 ? Math.round((c.visits / totalVisits) * 100) : 100,
        })),
        topCities: cityStats.map((c) => ({
          city: c._id.city || 'Unknown',
          country: c._id.country || 'India',
          countryCode: c.countryCode || 'IN',
          visits: c.visits,
        })),
        devices: deviceStats,
        browsers: browserStats,
        last7Days: last7DaysVisits,
        recentVisits,
        recentEvents,
      });
    } catch (err) {
      console.error('Analytics GET error:', err);
      return res.status(500).json({
        success: false,
        error: err.message || 'Failed to aggregate analytics',
      });
    }
  }

  // 3. DELETE /api/analytics -> Clear/Reset Analytics (Owner only)
  if (req.method === 'DELETE') {
    const adminKey = req.headers['x-admin-key'] || req.query.key;
    if (!adminKey || adminKey !== ADMIN_SECRET) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    try {
      if (process.env.MONGODB_URI) {
        await dbConnect();
        await AnalyticsVisit.deleteMany({});
        await AnalyticsEvent.deleteMany({});
      }
      return res.status(200).json({ success: true, message: 'Analytics data reset successfully' });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
