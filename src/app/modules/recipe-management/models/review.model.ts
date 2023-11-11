import { AppUser } from "../../authentication/models/appUser.model"

export interface Rating{
    id: number,
    user: AppUser,
    recipeId: number,
    content: string,
    numberOfStars: number,
    createdAt: string
}
