import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const port = Number(process.env.PORT) || 8000;
const mongoPort = Number(process.env.MONGO_PORT) || 27017;
const mongoHost = process.env.MONGO_HOST || 'localhost';
const mongoDatabase = process.env.MONGO_DB_NAME || 'octofit_db';
const mongoUri = process.env.MONGODB_URI || `mongodb://${mongoHost}:${mongoPort}/${mongoDatabase}`;

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

const startServer = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoUri);
    console.log(`MongoDB connected: ${mongoUri}`);

    app.listen(port, () => {
      const codespaceName = process.env.CODESPACE_NAME;
      const baseUrl = codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : `http://localhost:${port}`;

      console.log(`API listening at ${baseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
};

void startServer();