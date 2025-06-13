import express, { Response } from "express";
import User from "../models/User";
import { authenticateToken, AuthRequest } from "../middleware/authMiddleware";

const router = express.Router();

// Save pet and XP
router.post("/save", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        const { pet, xp } = req.body;

        if (!pet || typeof pet.type !== "string" || typeof pet.stage !== "number") {
            return res.status(400).json({ message: "Invalid pet data" });
        }

        await User.findByIdAndUpdate(req.userId, {
            pet: { type: pet.type, stage: pet.stage },
            xp: typeof xp === "number" ? xp : 0,
        });

        res.json({ message: "Pet and XP saved!" });
    } catch (err) {
        console.error("Save error:", err);
        res.status(500).json({ message: "Error saving pet" });
    }
});

// Load pet and XP
router.get("/load", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const pet = user.pet?.type ? user.pet : null;
        const xp = typeof user.xp === "number" ? user.xp : 0;

        res.json({ pet, xp });
    } catch (err) {
        console.error("Load error:", err);
        res.status(500).json({ message: "Error fetching pet" });
    }
});

export default router;




