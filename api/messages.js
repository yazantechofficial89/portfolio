import dbConnect from './lib/dbConnect.js';
import Contact from './models/Contact.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,DELETE,PATCH');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, x-admin-key'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Security check: Check admin key from header or query param
  const adminKey = req.headers['x-admin-key'] || req.query.key;
  const validKey = process.env.ADMIN_SECRET || 'yazanAdmin2026';

  if (!adminKey || adminKey !== validKey) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Invalid or missing admin key.',
    });
  }

  if (!process.env.MONGODB_URI) {
    return res.status(200).json({
      success: true,
      messages: [],
      warning: 'MONGODB_URI is not set in Vercel environment variables yet.',
    });
  }

  try {
    await dbConnect();

    // GET /api/messages -> Fetch all contacts
    if (req.method === 'GET') {
      const messages = await Contact.find({}).sort({ createdAt: -1 }).lean();
      return res.status(200).json({
        success: true,
        count: messages.length,
        messages,
      });
    }

    // DELETE /api/messages?id=XYZ -> Delete a message
    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ success: false, error: 'Message ID is required' });
      }
      await Contact.findByIdAndDelete(id);
      return res.status(200).json({ success: true, message: 'Message deleted successfully' });
    }

    // PATCH /api/messages?id=XYZ -> Mark as read/unread
    if (req.method === 'PATCH') {
      const { id } = req.query;
      const { status } = req.body || {};
      if (!id || !status) {
        return res.status(400).json({ success: false, error: 'ID and status are required' });
      }
      const updated = await Contact.findByIdAndUpdate(id, { status }, { new: true });
      return res.status(200).json({ success: true, message: 'Status updated', data: updated });
    }

    res.setHeader('Allow', ['GET', 'DELETE', 'PATCH', 'OPTIONS']);
    return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
  } catch (error) {
    console.error('Messages API Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
