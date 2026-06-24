"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Activity_1 = __importDefault(require("../models/Activity"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const Team_1 = __importDefault(require("../models/Team"));
const User_1 = __importDefault(require("../models/User"));
const Workout_1 = __importDefault(require("../models/Workout"));
const mongoUri = 'mongodb://localhost:27017/octofit_db';
const seed = async () => {
    console.log('Seed the octofit_db database with test data');
    await mongoose_1.default.connect(mongoUri);
    await Promise.all([
        User_1.default.deleteMany({}),
        Team_1.default.deleteMany({}),
        Activity_1.default.deleteMany({}),
        Leaderboard_1.default.deleteMany({}),
        Workout_1.default.deleteMany({}),
    ]);
    const users = await User_1.default.insertMany([
        {
            username: 'mia_runner',
            email: 'mia.runner@octofit.dev',
            age: 29,
            fitnessLevel: 'intermediate',
            goals: ['5k endurance', 'weight loss'],
        },
        {
            username: 'alex_lifter',
            email: 'alex.lifter@octofit.dev',
            age: 34,
            fitnessLevel: 'advanced',
            goals: ['strength gain', 'muscle definition'],
        },
        {
            username: 'sofia_cycler',
            email: 'sofia.cycler@octofit.dev',
            age: 26,
            fitnessLevel: 'beginner',
            goals: ['cardio fitness', 'consistency'],
        },
        {
            username: 'david_hiit',
            email: 'david.hiit@octofit.dev',
            age: 31,
            fitnessLevel: 'intermediate',
            goals: ['fat burn', 'athletic performance'],
        },
    ]);
    const teams = await Team_1.default.insertMany([
        {
            name: 'Pulse Predators',
            description: 'Cardio-focused athletes chasing weekly mileage goals.',
            memberIds: [users[0]._id, users[2]._id],
            points: 480,
        },
        {
            name: 'Iron Alliance',
            description: 'Strength and HIIT squad focused on max effort sessions.',
            memberIds: [users[1]._id, users[3]._id],
            points: 520,
        },
    ]);
    await Activity_1.default.insertMany([
        {
            userId: users[0]._id,
            type: 'run',
            durationMinutes: 42,
            caloriesBurned: 410,
            completedAt: new Date('2026-06-20T07:00:00Z'),
        },
        {
            userId: users[1]._id,
            type: 'lift',
            durationMinutes: 55,
            caloriesBurned: 360,
            completedAt: new Date('2026-06-20T18:10:00Z'),
        },
        {
            userId: users[2]._id,
            type: 'cycle',
            durationMinutes: 48,
            caloriesBurned: 395,
            completedAt: new Date('2026-06-21T06:30:00Z'),
        },
        {
            userId: users[3]._id,
            type: 'hiit',
            durationMinutes: 30,
            caloriesBurned: 345,
            completedAt: new Date('2026-06-21T17:45:00Z'),
        },
        {
            userId: users[0]._id,
            type: 'yoga',
            durationMinutes: 25,
            caloriesBurned: 120,
            completedAt: new Date('2026-06-22T07:20:00Z'),
        },
    ]);
    await Leaderboard_1.default.insertMany([
        {
            entryType: 'team',
            teamId: teams[1]._id,
            points: 520,
            rank: 1,
        },
        {
            entryType: 'team',
            teamId: teams[0]._id,
            points: 480,
            rank: 2,
        },
        {
            entryType: 'user',
            userId: users[1]._id,
            points: 275,
            rank: 1,
        },
        {
            entryType: 'user',
            userId: users[0]._id,
            points: 260,
            rank: 2,
        },
        {
            entryType: 'user',
            userId: users[3]._id,
            points: 240,
            rank: 3,
        },
    ]);
    await Workout_1.default.insertMany([
        {
            title: 'Tempo Builder Run',
            difficulty: 'intermediate',
            durationMinutes: 40,
            targetMuscles: ['legs', 'core'],
            recommendedForGoals: ['5k endurance', 'cardio fitness'],
            description: 'Steady run with negative split in final 10 minutes.',
        },
        {
            title: 'Foundational Strength Circuit',
            difficulty: 'beginner',
            durationMinutes: 35,
            targetMuscles: ['full body'],
            recommendedForGoals: ['consistency', 'muscle definition'],
            description: 'Simple compound movements with bodyweight progressions.',
        },
        {
            title: 'Power HIIT Ladder',
            difficulty: 'advanced',
            durationMinutes: 28,
            targetMuscles: ['legs', 'shoulders', 'core'],
            recommendedForGoals: ['fat burn', 'athletic performance'],
            description: 'High-intensity intervals with short recovery windows.',
        },
    ]);
    console.log('Seed completed successfully.');
    await mongoose_1.default.disconnect();
};
void seed().catch(async (error) => {
    console.error('Seed failed', error);
    await mongoose_1.default.disconnect();
    process.exit(1);
});
