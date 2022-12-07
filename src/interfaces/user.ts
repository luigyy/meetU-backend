import { Document } from "mongoose";
import userRoleEnum from "./userRole";
import University from "../types/Universities";
import Cards from "./Cards";
import Sex from "../types/sex";

export default interface UserInterface extends Document {
  profileImgURL?: string;
  sex?: Sex;
  university?: Array<University>;
  major?: string;
  name: string;
  lastName: string;
  email: string;
  description?: string;
  cards?: Cards;
  city?: string;
  role: userRoleEnum;
  slogan?: string; //little phrase to show under profile pic
  hobbies?: string;
  idealFirstDate?: string;
  password: string;
  comparePasswords?: (candidatePassword: string) => Promise<boolean>;
}
