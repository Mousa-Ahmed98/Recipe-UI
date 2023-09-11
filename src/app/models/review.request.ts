export interface ReviewRequest{
    authorId: string,
    recipeId: number,
    content: string,
    rate: number
}