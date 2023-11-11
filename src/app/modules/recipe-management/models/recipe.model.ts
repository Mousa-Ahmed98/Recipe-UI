import { Ingredient as Ingredient } from "./Ingredient.model";
import { Category } from "./category.model";
import { Plan } from "../../account/models/plan.model";
import { Rating } from "./review.model";
import { Step } from "./step.model";
import { AppUser } from "../../authentication/models/appUser.model";

export interface Recipe{
  id: number,
  name: string,
  imageName: string,
  category: Category,
  inFavourites: boolean,
  plan: Plan,
  ingredients: Ingredient[],
  steps: Step[],
  ratings: Rating[],
  userRating: Rating,
  author: AppUser
}