import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,'Please enter user name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        index: true,
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email address'
        ],
    },
    loginType: String,
    password:String,
    image: String,
    isactive: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    }
}, {
    timestamps: true
});

export const User =mongoose.models.users ||  mongoose.model('users', UserSchema);