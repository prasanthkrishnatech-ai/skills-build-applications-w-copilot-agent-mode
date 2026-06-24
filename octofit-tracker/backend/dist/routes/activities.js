"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = __importDefault(require("../models/Activity"));
const activitiesRouter = (0, express_1.Router)();
activitiesRouter.get('/', async (_req, res) => {
    try {
        const items = await Activity_1.default.find()
            .sort({ completedAt: -1 })
            .populate('userId', 'username email fitnessLevel')
            .lean();
        res.status(200).json({
            route: '/api/activities/',
            count: items.length,
            items,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to fetch activities',
            error,
        });
    }
});
exports.default = activitiesRouter;
