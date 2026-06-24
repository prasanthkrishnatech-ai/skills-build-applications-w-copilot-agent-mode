"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const usersRouter = (0, express_1.Router)();
usersRouter.get('/', async (_req, res) => {
    try {
        const items = await User_1.default.find().sort({ createdAt: -1 }).lean();
        res.status(200).json({
            route: '/api/users/',
            count: items.length,
            items,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to fetch users',
            error,
        });
    }
});
exports.default = usersRouter;
