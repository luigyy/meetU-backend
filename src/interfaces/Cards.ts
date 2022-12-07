import Sex from "../types/sex";
interface Cards {
  sexualPreference?: Sex;
  lookingFor?: "Friend" | "Date" | "Fire";
  height?: number; // 100 < number < 250 ;
  dogsOrCats?: "Dogs" | "Cats";
  party?: boolean;
  beachOrMountain?: "Beach" | "Mountain";
}

export default Cards;
