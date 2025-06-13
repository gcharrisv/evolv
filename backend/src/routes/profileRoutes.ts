import express, { Response } from "express";
import { authenticateToken, AuthRequest } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authenticateToken as express.RequestHandler, (req: AuthRequest, res: Response) => {
    res.json({ message: `Profile data for user ${req.userId}` });
});

export default router;
