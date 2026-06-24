"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true, trim: true },
    memberIds: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true }],
    points: { type: Number, default: 0, min: 0 },
}, {
    timestamps: true,
});
const Team = (0, mongoose_1.model)('Team', teamSchema);
exports.default = Team;
