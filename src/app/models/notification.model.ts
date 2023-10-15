import { RecipeSummary } from "../modules/shared/models/recipe.summary";

export enum NotificationType{
  Comment = 0,
  Rating = 1,
  PlanReminder = 2,
  NewPost = 3,
}

export interface Notification{
  read: boolean,
  type: NotificationType,
  recipe: RecipeSummary,
  createdAt: string
}