import { Router } from 'express';
import Activity from '../models/Activity';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res) => {
  try {
    const items = await Activity.find()
      .sort({ completedAt: -1 })
      .populate('userId', 'username email fitnessLevel')
      .lean();

    res.status(200).json({
      route: '/api/activities/',
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch activities',
      error,
    });
  }
});

export default activitiesRouter;
