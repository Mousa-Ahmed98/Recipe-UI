import { Ingredient as Ingredient } from "./Ingredient.model";
import { Category } from "./category.model";
import { Step } from "./step.model";

export interface Recipe{
    id: number,
    name: string,
    imageUrl: string,
    category: Category,
    ingredients: Ingredient[],
    steps: Step[],
}