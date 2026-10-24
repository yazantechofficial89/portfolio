import dbConnect from './lib/dbConnect.js';
import Project from './models/Project.js';

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
  const hasDb = process.env.MONGODB_URI || process.env.MONGO_URI || process.env.DATABASE_URL;
  if (!hasDb) {
    if (req.method === 'GET') {
      return res.status(200).json({
        success: true,
        projects: [],
        warning: 'MONGODB_URI is not set in environment. Storing locally in browser.',
      });
    }

    if (req.method === 'POST') {
      return res.status(200).json({
        success: true,
        project: req.body,
        warning: 'MONGODB_URI not configured; saved to local browser cache.',
      });
    }

    return res.status(200).json({ success: true });
  }

  try {
    await dbConnect();

    // GET /api/projects -> Retrieve all custom projects from MongoDB
    if (req.method === 'GET') {
      res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=600');
      const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
      return res.status(200).json({
        success: true,
        count: projects.length,
        projects,
      });
    }

    // POST /api/projects -> Save new project permanently
    if (req.method === 'POST') {
      const {
        title,
        category,
        description,
        image,
        images,
        tags,
        features,
        demoUrl,
        githubUrl,
        featured,
      } = req.body || {};

      const projectImages = Array.isArray(images) && images.length > 0 ? images : (image ? [image] : []);
      const primaryImage = image || (projectImages.length > 0 ? projectImages[0] : '');

      if (!title || !description || (!primaryImage && projectImages.length === 0)) {
        return res.status(400).json({
          success: false,
          error: 'Title, description, and preview image(s) are required.',
        });
      }

      const newProject = await Project.create({
        title: title.trim(),
        category: category || 'Full-Stack',
        description: description.trim(),
        image: primaryImage,
        images: projectImages,
        tags: Array.isArray(tags) ? tags : ['React', 'JavaScript'],
        features: Array.isArray(features) ? features : [],
        demoUrl: demoUrl ? demoUrl.trim() : '',
        githubUrl: githubUrl ? githubUrl.trim() : '',
        featured: Boolean(featured),
        isCustom: true,
      });

      return res.status(201).json({
        success: true,
        message: 'Project created and saved permanently!',
        project: newProject,
      });
    }

    // DELETE /api/projects?id=XYZ
    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ success: false, error: 'Project ID is required' });
      }

      try {
        await Project.findByIdAndDelete(id);
      } catch {
        await Project.deleteOne({ _id: id });
      }

      return res.status(200).json({
        success: true,
        message: 'Project deleted permanently',
      });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (error) {
    console.error('Projects API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Server error occurred while handling projects',
    });
  }
}
