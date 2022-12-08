import mongoose, { Schema } from "mongoose";
import Matches from "../interfaces/matches";

const matchesSchema: Schema<Matches> = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  date: Date,
  result: Boolean,
});

export default mongoose.model<Matches>("matches", matchesSchema);
