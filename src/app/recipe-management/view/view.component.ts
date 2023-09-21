import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { Review } from 'src/app/models/review.model';
import { RecipeService } from 'src/app/services/recipe.service';
import {ConfirmEventType, ConfirmationService} from 'primeng/api';
import {MessageService} from 'primeng/api';
import { ReviewRequest } from 'src/app/models/review.request';
import { AccountService } from 'src/app/services/account.service';
import { ShoppingItem } from 'src/app/models/shopping_item.model';
// import {ConfirmationService} from 'primeng/api';
// import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  recipeId: number;
  recipe: Recipe;
  reviewRequest: ReviewRequest;
  comment: string;
  rating: any;
  authorId: string;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private accountService: AccountService,
    // private confirmationService: ConfirmationService,
    // private messageService: MessageService
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('recipeId') ?? '0' ; 
      this.recipeId = parseInt(id , 10);
      this.recipeService.GetRecipeById(this.recipeId)
      .subscribe(res =>{
        this.recipe = res
        console.log(res);
      }
      );
    });
  }

  reset(){
    this.rating = null;
  }
  addReview(){
    if(this.rating == null || this.comment == null)
    return;
    console.log("Hi mousa");
    console.log(this.accountService.userValue?.id);
    console.log(this.accountService.userValue?.userName);
    try{
      const newReview: ReviewRequest = {
        authorId: this.accountService.userValue?.id!, //Mousa id
        authorName: this.accountService.userValue?.userName!, //Mousa id
        recipeId: this.recipeId,
        content: this.comment,
        rate: this.rating,
      };
      this.recipeService.addReview(newReview).subscribe(res => {
        console.log(res);
        this.recipe.reviews.push(res);
        this.rating = null;
        this.comment = ""; 
      });
    }
    catch(e){

    }
  }

  editReview(id: number){

  }

  deleteReview(id: number){

  }

  editRecipe(){
    this.router.navigate(['/recipes', this.recipeId, 'edit']);
  }

  addToShoppingList(){
    
    this.recipe.ingredients.forEach(element =>{
      var newItem: ShoppingItem = {
        Ingredient: element.description,
        UserId: this.accountService.userValue?.id!,
        isPurchased: false,
        Quantity: 1,
      };
      this.recipeService.addShoppingItem(newItem).subscribe(res => {
         
      });
    })
  }

  
  deleteRecipe() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
        },
        reject: (type: ConfirmEventType) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                    break;
                  }
                }
    });

  }
}
