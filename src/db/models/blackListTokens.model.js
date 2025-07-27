import mongoose, { model, Schema } from "mongoose";

const BlackListTokenSchema = new Schema(
  {
    tokenId: { type: String, required: true, unique: true },
    expiryDate: { type: String, required: true },
  },
  { timestamps: true }
);

export const blackListTokenModel =
  mongoose.models.BlackListToken ||
  model("BlackListToken", BlackListTokenSchema);
