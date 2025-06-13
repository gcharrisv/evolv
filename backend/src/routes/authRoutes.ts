import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = express.Router();

export interface AuthRequest extends Request {
    userId?: string;
}

export function authenticateToken(
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
        req.userId = decoded.userId;
        next();
    } catch {
        res.status(403).json({ message: "Invalid token" });
    }
}

router.post("/register", async function (req: Request, res: Response): Promise<void> {
    try {
        const { email, password } = req.body;
        const existing = await User.findOne({ email });
        if (existing) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const hash = await bcrypt.hash(password, 10);
        const newUser = new User({ email, passwordHash: hash });
        await newUser.save();
        res.status(201).json({ message: "User created" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/login", async function (req: Request, res: Response): Promise<void> {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: "2h" });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: "Login error" });
    }
});

export default router;
