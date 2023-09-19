import { RecipeSummary } from "./recipe.summary";

export interface Plan{
    id: number,
    day: string,
    recipe: RecipeSummary
}