import mongoose from 'mongoose';

const CertificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Certificate title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    issuer: {
      type: String,
      required: [true, 'Issuing organization is required'],
      trim: true,
      maxlength: [200, 'Issuer cannot exceed 200 characters'],
    },
    issueDate: {
      type: String,
      default: '',
      trim: true,
    },
    category: {
      type: String,
      default: 'Hackathons & Competitions',
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    credentialId: {
      type: String,
      default: '',
      trim: true,
    },
    credentialUrl: {
      type: String,
      default: '',
      trim: true,
    },
    description: {
      type: String,
      default: '',
      maxlength: [3000, 'Description cannot exceed 3000 characters'],
    },
    image: {
      type: String,
      required: [true, 'Certificate image or file is required'],
    },
    type: {
      type: String,
      enum: ['image', 'pdf'],
      default: 'image',
    },
    fileName: {
      type: String,
      default: '',
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    isOriginal: {
      type: Boolean,
      default: true,
    },
    isCustom: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Certificate || mongoose.model('Certificate', CertificateSchema);
