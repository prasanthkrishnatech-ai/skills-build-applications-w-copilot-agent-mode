"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const leaderboardRouter = (0, express_1.Router)();
leaderboardRouter.get('/', async (_req, res) => {
    try {
        const items = await Leaderboard_1.default.find()
            .sort({ rank: 1, points: -1 })
            .populate('userId', 'username email')
            .populate('teamId', 'name points')
            .lean();
        res.status(200).json({
            route: '/api/leaderboard/',
            count: items.length,
            items,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to fetch leaderboard',
            error,
        });
    }
});
exports.default = leaderboardRouter;
