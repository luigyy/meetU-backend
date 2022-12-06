import { Document } from "mongoose";
import userRoleEnum from "./userRole";
import University from "../types/Universities";

export default interface UserInterface extends Document {
  sex: "Male" | "Female";
  University: Array<University>;
  Major: string;
  name: string;
  lastName: string;
  email: string;
  role: userRoleEnum;
  password?: string;
  comparePasswords?: (candidatePassword: string) => Promise<boolean>;
}
