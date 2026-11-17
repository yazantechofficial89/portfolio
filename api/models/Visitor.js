import mongoose from 'mongoose';

const VisitorSchema = new mongoose.Schema(
  {
    visitorId: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    sessionId: {
      type: String,
      default: '',
      trim: true,
    },
    path: {
      type: String,
      default: '/',
      trim: true,
    },
    fullUrl: {
      type: String,
      default: '',
      trim: true,
    },
    referrer: {
      type: String,
      default: 'Direct',
      trim: true,
    },
    source: {
      type: String,
      default: 'Direct',
      index: true,
      trim: true,
    },
    utmSource: {
      type: String,
      default: '',
      trim: true,
    },
    utmMedium: {
      type: String,
      default: '',
      trim: true,
    },
    utmCampaign: {
      type: String,
      default: '',
      trim: true,
    },
    ipAddress: {
      type: String,
      default: '',
      trim: true,
    },
    country: {
      type: String,
      default: '',
      trim: true,
    },
    city: {
      type: String,
      default: '',
      trim: true,
    },
    region: {
      type: String,
      default: '',
      trim: true,
    },
    userAgent: {
      type: String,
      default: '',
    },
    deviceType: {
      type: String,
      default: 'Desktop',
      trim: true,
    },
    browser: {
      type: String,
      default: 'Unknown',
      trim: true,
    },
    os: {
      type: String,
      default: 'Unknown',
      trim: true,
    },
    screenResolution: {
      type: String,
      default: '',
      trim: true,
    },
    language: {
      type: String,
      default: 'en',
      trim: true,
    },
    isFirstVisit: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: 'visitors',
  }
);

VisitorSchema.index({ createdAt: -1 });

export default mongoose.models.Visitor ||
  mongoose.model('Visitor', VisitorSchema, 'visitors');
