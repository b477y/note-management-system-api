import mongoose, { Schema, model } from "mongoose";
import { generateHash } from "../../utils/security/hash.security.js";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    resetPasswordOTP: String,
    password: {
      type: String,
      required: true,
    },
    profilePicture: { type: String },
    deletedAt: {
      type: Date,
    },
    changeCredentialsTime: Date,
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      this.password = await generateHash({ plaintext: this.password });
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

export const userModel = mongoose.models.User || model("User", UserSchema);
