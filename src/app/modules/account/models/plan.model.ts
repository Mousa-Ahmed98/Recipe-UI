import { RecipeSummary } from "../../shared/models/recipe.summary";

export interface Plan{
    id: number,
    day: string,
    recipe: RecipeSummary
}