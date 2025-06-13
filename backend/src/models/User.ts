import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    selectedPet: { type: String, default: "" }
});


export default mongoose.model("User", userSchema);