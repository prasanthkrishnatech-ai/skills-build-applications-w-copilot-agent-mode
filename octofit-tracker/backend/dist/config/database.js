"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = exports.getMongoUri = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoPort = Number(process.env.MONGO_PORT) || 27017;
const mongoHost = process.env.MONGO_HOST || 'localhost';
const mongoDatabase = process.env.MONGO_DB_NAME || 'octofit_db';
const getMongoUri = () => {
    return process.env.MONGODB_URI || `mongodb://${mongoHost}:${mongoPort}/${mongoDatabase}`;
};
exports.getMongoUri = getMongoUri;
const connectToDatabase = async () => {
    const mongoUri = (0, exports.getMongoUri)();
    await mongoose_1.default.connect(mongoUri);
    console.log(`MongoDB connected: ${mongoUri}`);
};
exports.connectToDatabase = connectToDatabase;
