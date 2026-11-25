import mongoose from 'mongoose';

const getMongoUri = () => process.env.MONGODB_URI || process.env.MONGO_URI || process.env.DATABASE_URL;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function dbConnect() {
  const MONGODB_URI = getMongoUri();
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI or MONGO_URI environment variable in Vercel or .env');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 20000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
