import express, { Response } from "express";
import User from "../models/User";
import { authenticateToken, AuthRequest } from "../middleware/authMiddleware";

const router = express.Router();

// Get user profile data
router.get("/", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({
            name: user.name,
            bio: user.bio,
            favoriteEgg: user.favoriteEgg,
        });
    } catch {
        res.status(500).json({ message: "Error fetching profile" });
    }
});

// Update profile
router.put("/", authenticateToken, async (req: AuthRequest, res: Response) => {
    const { name, bio, favoriteEgg } = req.body;
    try {
        await User.findByIdAndUpdate(req.userId, { name, bio, favoriteEgg });
        res.json({ message: "Profile updated" });
    } catch {
        res.status(500).json({ message: "Error updating profile" });
    }
});

// Delete user
router.delete("/", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        await User.findByIdAndDelete(req.userId);
        res.json({ message: "Profile deleted" });
    } catch {
        res.status(500).json({ message: "Error deleting profile" });
    }
});

export default router;
