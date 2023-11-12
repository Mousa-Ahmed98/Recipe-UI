import { Ingredient as Ingredient } from "./Ingredient.model";
import { Category } from "./category.model";
import { Plan } from "../../account/models/plan.model";
import { Rating } from "./review.model";
import { Step } from "./step.model";
import { AppUser } from "../../authentication/models/appUser.model";
import { Comment } from "./comment.model";

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
  averageRating: number,
  comments: Comment[],
  userRating: Rating,
  author: AppUser
}