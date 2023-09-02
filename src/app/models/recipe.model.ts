import { ingredient as Ingredient } from "./Ingredient.model";
import { Category } from "./category.model";
import { Step } from "./step.model";

export interface Recipe{
    id: number,
    name: string,
    imageURL: string,
    category: Category,
    ingredients: Ingredient[],
    steps: Step[],
}