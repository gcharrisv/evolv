import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = express.Router();

type AuthBody = {
    email: string;
    password: string;
};

router.post(
    "/register",
    async (req: Request<any, any, AuthBody>, res: Response): Promise<void> => {
        const { email, password } = req.body;

        try {
            const existing = await User.findOne({ email });
            if (existing) {
                res.status(400).json({ message: "User already exists" });
                return;
            }

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const newUser = new User({ email, passwordHash: hash });
            await newUser.save();

            res.status(201).json({ message: "User created" });
        } catch (err) {
            res.status(500).json({ message: "Server error" });
        }
    }
);

router.post(
    "/login",
    async (req: Request<any, any, AuthBody>, res: Response): Promise<void> => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                res.status(401).json({ message: "Invalid credentials" });
                return;
            }

            const isMatch = await bcrypt.compare(password, user.passwordHash);
            if (!isMatch) {
                res.status(401).json({ message: "Invalid credentials" });
                return;
            }

            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET!,
                { expiresIn: "2h" }
            );

            res.json({ token });
        } catch (err) {
            res.status(500).json({ message: "Login failed" });
        }
    }
);

export default router;