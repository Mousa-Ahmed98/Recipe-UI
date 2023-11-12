import { AppUser } from "../../authentication/models/appUser.model";
import { Reply } from "./reply.model";

export interface Comment{
    id: number,
    user: AppUser,
    content: string,
    createdAt: string,
    replies: Reply[],
}