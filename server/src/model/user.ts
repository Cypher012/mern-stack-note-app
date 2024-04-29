import { InferSchemaType, Schema, model } from "mongoose";

const userAuthSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userId: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

type Note = InferSchemaType<typeof userAuthSchema>;

export default model<Note>("Note", userAuthSchema);
