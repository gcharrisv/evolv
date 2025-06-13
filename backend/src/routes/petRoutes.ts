import express, { Response } from "express";
import User from "../models/User";
import { authenticateToken, AuthRequest } from "../middleware/authMiddleware";

const router = express.Router();

// Save selected pet
router.post("/select", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        const { selectedPet } = req.body;
        await User.findByIdAndUpdate(req.userId, { selectedPet });
        res.json({ message: "Pet saved!" });
    } catch {
        res.status(500).json({ message: "Error saving pet" });
    }
});

// Get selected pet
router.get("/selected", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.userId);
        res.json({ selectedPet: user?.selectedPet || "" });
    } catch {
        res.status(500).json({ message: "Error fetching pet" });
    }
});

export default router;


