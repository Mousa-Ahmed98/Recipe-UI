import { Category } from "./category.model";

export interface Recipe{
    id: number,
    name: string,
    image: string,
    category: Category,
    ingredients: string[],
    steps: string[],
}