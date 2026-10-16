import mongoose from 'mongoose';

const AnalyticsVisitSchema = new mongoose.Schema(
  {
    visitorId: {
      type: String,
      required: true,
      index: true,
    },
    sessionId: {
      type: String,
      default: '',
    },
    path: {
      type: String,
      default: '/',
      index: true,
    },
    ip: {
      type: String,
      default: 'Unknown',
    },
    country: {
      type: String,
      default: 'India',
      index: true,
    },
    countryCode: {
      type: String,
      default: 'IN',
    },
    city: {
      type: String,
      default: 'New Delhi',
      index: true,
    },
    region: {
      type: String,
      default: 'Delhi',
    },
    device: {
      type: String,
      enum: ['desktop', 'mobile', 'tablet', 'unknown'],
      default: 'desktop',
    },
    browser: {
      type: String,
      default: 'Chrome',
    },
    os: {
      type: String,
      default: 'Windows',
    },
    referrer: {
      type: String,
      default: 'Direct',
    },
  },
  {
    timestamps: true,
  }
);

// Index to quickly query today's and recent visits
AnalyticsVisitSchema.index({ createdAt: -1 });

export default mongoose.models.AnalyticsVisit ||
  mongoose.model('AnalyticsVisit', AnalyticsVisitSchema);
