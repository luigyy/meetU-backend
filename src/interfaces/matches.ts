import { Document } from "mongoose";
import UserInterface from "./user";

interface Matches extends Document {
  user: { type: UserInterface; required: true };
  date: { type: Date; required: true };
  result: boolean; //true for like, false for dislike
}

export default Matches;
