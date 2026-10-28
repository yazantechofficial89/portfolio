import dbConnect from './lib/dbConnect.js';
import ResumeDownload from './models/ResumeDownload.js';

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const hasDb = process.env.MONGODB_URI || process.env.MONGO_URI || process.env.DATABASE_URL;

  // GET /api/resume-download -> Returns stats
  if (req.method === 'GET') {
    if (!hasDb) {
      return res.status(200).json({
        success: true,
        totalDownloads: 0,
        recentDownloads: [],
        warning: 'MongoDB not connected in this environment.',
      });
    }

    try {
      await dbConnect();
      const totalDownloads = await ResumeDownload.countDocuments();
      const recentDownloads = await ResumeDownload.find({})
        .sort({ createdAt: -1 })
        .limit(20)
        .lean();

      return res.status(200).json({
        success: true,
        totalDownloads,
        recentDownloads,
      });
    } catch (error) {
      console.error('Error fetching resume downloads:', error);
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // POST /api/resume-download -> Record a new download event
  if (req.method === 'POST') {
    try {
      let body = req.body;
      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
        } catch {
          body = {};
        }
      }

      const source = (body && body.source) || 'direct';
      const referrer = (body && body.referrer) || req.headers['referer'] || '';
      const userAgent = req.headers['user-agent'] || '';
      const ipAddress =
        req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
        req.headers['x-real-ip'] ||
        req.socket?.remoteAddress ||
        '';

      if (hasDb) {
        await dbConnect();
        const record = await ResumeDownload.create({
          source,
          referrer,
          userAgent,
          ipAddress,
        });

        const totalDownloads = await ResumeDownload.countDocuments();

        return res.status(201).json({
          success: true,
          message: 'Resume download recorded in MongoDB',
          downloadId: record._id,
          totalDownloads,
        });
      }

      // If DB is not configured, still return success gracefully
      return res.status(200).json({
        success: true,
        message: 'Download logged (DB disconnected in local dev)',
        source,
      });
    } catch (error) {
      console.error('Error recording resume download:', error);
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
