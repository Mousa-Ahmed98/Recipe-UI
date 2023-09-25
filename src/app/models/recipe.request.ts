import { Ingredient } from "./Ingredient.model";
import { Step } from "./step.model";

export type RecipeRequest = {
  Name: string;
  ImageUrl: string;
  AuthorId: string;
  CategoryId: number;
  Ingredients: Ingredient[];
  Steps: Step[];
}
