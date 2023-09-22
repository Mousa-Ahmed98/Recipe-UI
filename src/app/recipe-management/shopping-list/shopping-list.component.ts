import { Component } from '@angular/core';
import { ResponseShoppingItem, ShoppingItem } from 'src/app/models/shopping_item.model';
import { AccountService } from 'src/app/services/account.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  shoppingItems: ResponseShoppingItem[];

  constructor(
    private recipeService: RecipeService,
    private accountService: AccountService,
  ) 
  {}

  ngOnInit(): void {
    this.recipeService.GetShoppingList(this.accountService.userValue?.userId!)
    .subscribe(res =>{
      this.shoppingItems = res
      console.log("After effects...");
      console.log(this.shoppingItems[0].ingredient);
    }
    );
  }
  toggleShoppingItem(item: ResponseShoppingItem){
    item.isPurchased = !item.isPurchased;
    this.recipeService.toggleShopItem(item).subscribe();
  }
}

