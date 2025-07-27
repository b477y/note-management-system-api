import mongoose, { Schema, Types, model } from "mongoose";

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    ownerId: { type: Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const noteModel = mongoose.models.Note || model("Note", NoteSchema);
