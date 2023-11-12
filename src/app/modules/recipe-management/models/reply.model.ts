import { AppUser } from "../../authentication/models/appUser.model";

export interface Reply{
    id: number,
    commentId: number,
    content: string,
    user: AppUser,
    createdAt: string,
}