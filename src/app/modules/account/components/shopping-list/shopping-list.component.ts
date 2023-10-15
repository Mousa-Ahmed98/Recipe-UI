import { Component } from '@angular/core';
import { ResponseShoppingItem, ShoppingItem } from 'src/app/modules/account/models/shopping_item.model';
import { AuthenticationService } from 'src/app/modules/core/services/auth.service';
import { ShoppingService } from 'src/app/modules/shared/services/shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  shoppingItems: ResponseShoppingItem[];

  constructor(
    private shoppingService: ShoppingService,
    private accountService: AuthenticationService,
  ) 
  {}

  ngOnInit(): void {
    this.shoppingService.GetShoppingList(this.accountService.userValue?.userId!)
    .subscribe(res =>{
      this.shoppingItems = res
      console.log("After effects...");
      console.log(this.shoppingItems[0].ingredient);
    }
    );
  }
  toggleShoppingItem(item: ResponseShoppingItem){
    item.isPurchased = !item.isPurchased;
    this.shoppingService.toggleShopItem(item).subscribe();
  }
}

