import express from "express";
import path from "path";
import dotenv from "dotenv";
import connectMongo from "./connectMongo";
import authRoutes from "./routes/authRoutes";
import petRoutes from "./routes/petRoutes";
import profileRoutes from "./routes/profileRoutes";

dotenv.config();

const app = express();
app.use(express.json());

const frontendPath = path.resolve(__dirname, "../../frontend/dist");
app.use(express.static(frontendPath));

app.use("/api/auth", authRoutes);
app.use("/api/pet", petRoutes);
app.use("/api/profile", profileRoutes);

app.get("*", (_, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 3001;

connectMongo().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
