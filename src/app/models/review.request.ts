export interface ReviewRequest{
    authorId: string,
    authorName: string,
    recipeId: number,
    content: string,
    rate: number
}