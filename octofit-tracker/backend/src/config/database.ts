import mongoose from 'mongoose';

const mongoPort = Number(process.env.MONGO_PORT) || 27017;
const mongoHost = process.env.MONGO_HOST || 'localhost';
const mongoDatabase = process.env.MONGO_DB_NAME || 'octofit_db';

export const getMongoUri = (): string => {
  return process.env.MONGODB_URI || `mongodb://${mongoHost}:${mongoPort}/${mongoDatabase}`;
};

export const connectToDatabase = async (): Promise<void> => {
  const mongoUri = getMongoUri();
  await mongoose.connect(mongoUri);
  console.log(`MongoDB connected: ${mongoUri}`);
};
