import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    pet: {
        type: {
            type: String,
            default: null,
        },
        stage: {
            type: Number,
            default: 0,
        }
    },
    xp: {
        type: Number,
        default: 0
    },
    name: { type: String, default: "" },
    bio: { type: String, default: "" },
    favoriteEgg: { type: String, default: "" }
}, { minimize: false });

export default mongoose.model("User", userSchema);

