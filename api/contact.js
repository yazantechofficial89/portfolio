import dbConnect from './lib/dbConnect.js';
import Contact from './models/Contact.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      message: 'Portfolio Contact & Database API is online 🚀',
      endpoints: {
        submitContact: 'POST /api/contact',
        viewMessages: 'GET /api/messages',
      },
    });
  }

  if (req.method === 'POST') {
    try {
      const { name, email, phone, subject, message } = req.body || {};

      if (!name || !email || !subject || !message) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: name, email, subject, and message are required.',
        });
      }

      // Check if MongoDB URI is configured
      if (process.env.MONGODB_URI) {
        await dbConnect();
        const newContact = await Contact.create({
          name: name.trim(),
          email: email.trim(),
          phone: phone ? phone.trim() : '',
          subject: subject.trim(),
          message: message.trim(),
        });

        // Also asynchronously notify FormSubmit so email is sent too
        try {
          fetch(`https://formsubmit.co/ajax/yazantechofficial89@gmail.com`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Origin: 'https://yazangupta.com',
              Referer: 'https://yazangupta.com/',
            },
            body: JSON.stringify({
              Name: name,
              Email: email,
              Phone: phone || 'Not provided',
              Subject: subject,
              Message: message,
              _subject: `New Database Enquiry from ${name}: ${subject}`,
              _captcha: 'false',
            }),
          }).catch(() => {});
        } catch (_) {}

        return res.status(201).json({
          success: true,
          message: 'Enquiry successfully saved to MongoDB database & dispatched to email!',
          data: {
            id: newContact._id,
            name: newContact.name,
            createdAt: newContact.createdAt,
          },
        });
      } else {
        // Fallback: If MONGODB_URI is not set yet in Vercel, dispatch via Formsubmit so no lead is lost
        const fallbackRes = await fetch(`https://formsubmit.co/ajax/yazantechofficial89@gmail.com`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Origin: 'https://yazangupta.com',
            Referer: 'https://yazangupta.com/',
          },
          body: JSON.stringify({
            Name: name,
            Email: email,
            Phone: phone || 'Not provided',
            Subject: subject,
            Message: message,
            _subject: `New Portfolio Enquiry: ${subject}`,
            _captcha: 'false',
          }),
        });

        return res.status(200).json({
          success: true,
          message: 'Message received! (Note: Add MONGODB_URI to Vercel Settings to activate database persistence).',
          databaseConfigured: false,
        });
      }
    } catch (error) {
      console.error('Contact API Error:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Internal Server Error while saving enquiry',
      });
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
  return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
}
