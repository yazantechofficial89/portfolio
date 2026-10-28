import mongoose from 'mongoose';

const ResumeDownloadSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      default: 'hero', // 'hero', 'about', 'experience', etc.
      trim: true,
    },
    referrer: {
      type: String,
      default: '',
      trim: true,
    },
    userAgent: {
      type: String,
      default: '',
    },
    ipAddress: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.ResumeDownload ||
  mongoose.model('ResumeDownload', ResumeDownloadSchema);
