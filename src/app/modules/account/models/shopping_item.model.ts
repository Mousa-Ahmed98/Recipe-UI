export interface ShoppingItem{
    Ingredient: string;
    UserId: string;
    Quantity: number;
    isPurchased: boolean;
}

export interface ResponseShoppingItem{
    id: number;
    ingredient: string;
    userId: string;
    quantity: number;
    isPurchased: boolean;
}