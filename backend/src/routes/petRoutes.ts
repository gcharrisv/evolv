import express, { Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/pet', authenticateToken, (req: AuthRequest, res: Response) => {
    res.json({ message: `This is a protected pet route! User ID: ${req.userId}` });
});

export default router;

