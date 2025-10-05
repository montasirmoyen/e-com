import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || process.env.mongodb_uri || process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI env is not defined');
}

declare global {
  var _mongoose: Promise<typeof mongoose> | undefined;
}

if (!global._mongoose) {
  global._mongoose = mongoose.connect(MONGODB_URI);
}

export default global._mongoose;