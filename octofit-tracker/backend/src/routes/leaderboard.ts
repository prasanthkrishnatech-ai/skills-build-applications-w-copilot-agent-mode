import { Router } from 'express';
import Leaderboard from '../models/Leaderboard';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res) => {
  try {
    const items = await Leaderboard.find()
      .sort({ rank: 1, points: -1 })
      .populate('userId', 'username email')
      .populate('teamId', 'name points')
      .lean();

    res.status(200).json({
      route: '/api/leaderboard/',
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch leaderboard',
      error,
    });
  }
});

export default leaderboardRouter;
