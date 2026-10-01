import { Router, Request, Response } from 'express';
import { getDBStatus } from '../config/db.js';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  const dbStatus = getDBStatus();
  
  res.status(200).json({
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: dbStatus,
    },
  });
});

export default router;
