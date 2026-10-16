import mongoose from 'mongoose';

const AnalyticsEventSchema = new mongoose.Schema(
  {
    visitorId: {
      type: String,
      required: true,
      index: true,
    },
    eventType: {
      type: String,
      required: true,
      enum: [
        'project_click',
        'project_demo',
        'project_github',
        'resume_download',
        'whatsapp_click',
        'contact_click',
        'certificate_view',
        'custom_event',
      ],
      index: true,
    },
    eventData: {
      projectId: { type: String, default: '' },
      projectTitle: { type: String, default: '' },
      linkType: { type: String, default: '' },
      url: { type: String, default: '' },
      label: { type: String, default: '' },
    },
    country: {
      type: String,
      default: 'India',
    },
    countryCode: {
      type: String,
      default: 'IN',
    },
    city: {
      type: String,
      default: 'New Delhi',
    },
    path: {
      type: String,
      default: '/',
    },
  },
  {
    timestamps: true,
  }
);

AnalyticsEventSchema.index({ eventType: 1, createdAt: -1 });
AnalyticsEventSchema.index({ 'eventData.projectId': 1 });

export default mongoose.models.AnalyticsEvent ||
  mongoose.model('AnalyticsEvent', AnalyticsEventSchema);
