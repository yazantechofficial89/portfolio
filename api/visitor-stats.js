import dbConnect from './lib/dbConnect.js';
import Visitor from './models/Visitor.js';

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const hasDb = process.env.MONGODB_URI || process.env.MONGO_URI || process.env.DATABASE_URL;
  if (!hasDb) {
    return res.status(200).json({
      success: true,
      stats: {
        totalVisits: 0,
        uniqueVisitors: 0,
        todayVisits: 0,
        topSources: [],
        topPages: [],
        topCities: [],
        deviceBreakdown: [],
        recentVisitors: [],
      },
      warning: 'MONGODB_URI not configured',
    });
  }

  try {
    await dbConnect();

    // Start of today in UTC
    const startOfToday = new Date();
    startOfToday.setUTCHours(0, 0, 0, 0);

    const [
      totalVisits,
      uniqueVisitorsResult,
      todayVisits,
      topSources,
      topPages,
      topCities,
      deviceBreakdown,
      recentVisitors,
    ] = await Promise.all([
      Visitor.countDocuments({}),
      Visitor.distinct('visitorId'),
      Visitor.countDocuments({ createdAt: { $gte: startOfToday } }),
      Visitor.aggregate([
        { $group: { _id: '$source', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
      Visitor.aggregate([
        { $group: { _id: '$path', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
      Visitor.aggregate([
        {
          $match: {
            city: { $exists: true, $ne: '' },
          },
        },
        { $group: { _id: { city: '$city', country: '$country' }, count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
      Visitor.aggregate([
        { $group: { _id: '$deviceType', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Visitor.find({})
        .sort({ createdAt: -1 })
        .limit(50)
        .select('source referrer path city country deviceType browser os createdAt utmSource')
        .lean(),
    ]);

    return res.status(200).json({
      success: true,
      stats: {
        totalVisits,
        uniqueVisitors: uniqueVisitorsResult.length,
        todayVisits,
        topSources: topSources.map((s) => ({ source: s._id || 'Direct', count: s.count })),
        topPages: topPages.map((p) => ({ path: p._id || '/', count: p.count })),
        topCities: topCities.map((c) => ({
          city: c._id.city,
          country: c._id.country,
          count: c.count,
        })),
        deviceBreakdown: deviceBreakdown.map((d) => ({ device: d._id || 'Desktop', count: d.count })),
        recentVisitors,
      },
    });
  } catch (err) {
    console.error('[VisitorStats] Error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
}
