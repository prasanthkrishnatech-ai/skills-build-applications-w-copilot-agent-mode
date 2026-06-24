"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    targetMuscles: [{ type: String, required: true }],
    recommendedForGoals: [{ type: String, required: true }],
    description: { type: String, required: true, trim: true },
}, {
    timestamps: true,
});
const Workout = (0, mongoose_1.model)('Workout', workoutSchema);
exports.default = Workout;
