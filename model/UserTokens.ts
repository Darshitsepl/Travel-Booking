import mongoose from "mongoose";

const TokensSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  expires_at: Date,
  token: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['login', 'reset-token'],
    default: 'login'
  }
}, {
  timestamps: true
});

export const Token = mongoose.models.token || mongoose.model('token', TokensSchema);