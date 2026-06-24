"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = Number(process.env.PORT) || 8000;
const mongoPort = Number(process.env.MONGO_PORT) || 27017;
const mongoHost = process.env.MONGO_HOST || 'localhost';
const mongoDatabase = process.env.MONGO_DB_NAME || 'octofit_db';
const mongoUri = process.env.MONGODB_URI || `mongodb://${mongoHost}:${mongoPort}/${mongoDatabase}`;
app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});
const startServer = async () => {
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log(`MongoDB connected: ${mongoUri}`);
        app.listen(port, () => {
            const codespaceName = process.env.CODESPACE_NAME;
            const baseUrl = codespaceName
                ? `https://${codespaceName}-8000.app.github.dev`
                : `http://localhost:${port}`;
            console.log(`API listening at ${baseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start server', error);
        process.exit(1);
    }
};
void startServer();
