import dbConnect from './lib/dbConnect.js';
import ResumeDownload from './models/ResumeDownload.js';

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const source = req.query.source || 'direct';
  const referrer = req.headers['referer'] || '';
  const userAgent = req.headers['user-agent'] || '';
  const ipAddress =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    '';

  const hasDb = process.env.MONGODB_URI || process.env.MONGO_URI || process.env.DATABASE_URL;

  if (hasDb) {
    try {
      await dbConnect();
      await ResumeDownload.create({
        source,
        referrer,
        userAgent,
        ipAddress,
      });
      console.log(`[ResumeDownload] Logged download event from ${source}`);
    } catch (err) {
      console.error('[ResumeDownload] Failed to log resume download:', err);
    }
  }

  // Redirect directly to the PDF file to initiate instant download
  res.writeHead(302, {
    Location: '/Yazan_Gupta_Resume.pdf',
    'Cache-Control': 'no-store, no-cache, must-revalidate',
  });
  return res.end();
}
