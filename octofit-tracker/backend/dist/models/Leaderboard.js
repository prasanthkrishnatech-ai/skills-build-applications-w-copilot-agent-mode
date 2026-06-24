"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const leaderboardSchema = new mongoose_1.Schema({
    entryType: { type: String, enum: ['user', 'team'], required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    teamId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
}, {
    timestamps: true,
});
const Leaderboard = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
exports.default = Leaderboard;
