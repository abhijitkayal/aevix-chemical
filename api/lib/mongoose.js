import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || process.env.MONGO_URL || process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.warn('mongoose helper: MONGO_URI is not set. Set MONGO_URI env var in Vercel or your environment.');
}

let cached = globalThis._mongoose;

if (!cached) cached = globalThis._mongoose = { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      // keep default options but can add useNewUrlParser etc if needed
    }).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
