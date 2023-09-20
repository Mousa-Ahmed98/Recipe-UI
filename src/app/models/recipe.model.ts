import { Ingredient as Ingredient } from "./Ingredient.model";
import { Category } from "./category.model";
import { Plan } from "./plan.model";
import { Review } from "./review.model";
import { Step } from "./step.model";

export interface Recipe{
  id: number,
  name: string,
  imageUrl: string,
  category: Category,
  inFavourites: boolean,
  plan: Plan,
  ingredients: Ingredient[],
  steps: Step[],
  reviews: Review[]
}