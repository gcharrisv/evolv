import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    pet: {
        name: String,
        type: String,
        stage: { type: Number, default: 0 },
        xp: { type: Number, default: 0 }
    },
    bio: { type: String, default: '' }
});

export default mongoose.model('User', userSchema);