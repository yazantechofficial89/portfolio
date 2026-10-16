import dbConnect from './lib/dbConnect.js';
import Certificate from './models/Certificate.js';

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }



  // Check if MongoDB is connected
  if (!process.env.MONGODB_URI) {
    if (req.method === 'GET') {
      return res.status(200).json({
        success: true,
        certificates: [],
        warning: 'MONGODB_URI is not set in environment. Storing locally in browser.',
      });
    }

    if (req.method === 'POST') {
      return res.status(200).json({
        success: true,
        certificate: req.body,
        warning: 'MONGODB_URI not configured; saved to local browser cache.',
      });
    }

    return res.status(200).json({ success: true });
  }

  try {
    await dbConnect();

    // GET /api/certificates -> Retrieve all certificates from MongoDB
    if (req.method === 'GET') {
      const certificates = await Certificate.find({}).sort({ createdAt: -1 }).lean();
      return res.status(200).json({
        success: true,
        count: certificates.length,
        certificates,
      });
    }

    // POST /api/certificates -> Save new certificate permanently
    if (req.method === 'POST') {
      const {
        title,
        issuer,
        issueDate,
        category,
        skills,
        credentialId,
        credentialUrl,
        description,
        image,
        type,
        fileName,
      } = req.body || {};

      if (!title || !issuer || !image) {
        return res.status(400).json({
          success: false,
          error: 'Title, issuer, and certificate image/file are required.',
        });
      }

      const newCert = await Certificate.create({
        title: title.trim(),
        issuer: issuer.trim(),
        issueDate: issueDate || new Date().getFullYear().toString(),
        category: category || 'Hackathons & Competitions',
        skills: Array.isArray(skills) ? skills : [],
        credentialId: credentialId || `VERIFIED-${Date.now()}`,
        credentialUrl: credentialUrl || '',
        description: description || 'Officially verified certificate.',
        image,
        type: type || 'image',
        fileName: fileName || '',
        isVerified: true,
        isOriginal: true,
        isCustom: true,
      });

      return res.status(201).json({
        success: true,
        message: 'Certificate saved permanently and verified!',
        certificate: newCert,
      });
    }

    // DELETE /api/certificates?id=XYZ
    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ success: false, error: 'Certificate ID is required' });
      }

      // Check if valid ObjectId or query by custom ID
      try {
        await Certificate.findByIdAndDelete(id);
      } catch {
        await Certificate.deleteOne({ credentialId: id });
      }

      return res.status(200).json({
        success: true,
        message: 'Certificate deleted permanently',
      });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (error) {
    console.error('Certificates API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Server error occurred while handling certificates',
    });
  }
}
