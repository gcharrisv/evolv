import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectMongo from "./connectMongo";
import authRoutes from "./routes/authRoutes";
import petRoutes from "./routes/petRoutes";
import profileRoutes from "./routes/profileRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const ABS_STATIC_PATH = path.resolve(__dirname, "../../frontend/dist");
const INDEX_HTML_PATH = path.join(ABS_STATIC_PATH, "index.html");

app.use(express.json());
app.use(express.static(ABS_STATIC_PATH));

app.use("/api/auth", authRoutes);
app.use("/api/pet", petRoutes);
app.use("/api/profile", profileRoutes);

app.get("*", (_req, res) => {
    res.sendFile(INDEX_HTML_PATH);
});

connectMongo().then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});
