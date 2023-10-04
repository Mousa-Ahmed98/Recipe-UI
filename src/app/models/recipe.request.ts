import { Ingredient } from "./Ingredient.model";
import { Step } from "./step.model";

export type RecipeRequest = {
  Name: string;
  ImageData: string;
  CategoryId: number;
  Ingredients: Ingredient[];
  Steps: Step[];
}
