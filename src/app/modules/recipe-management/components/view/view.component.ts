import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ConfirmEventType, ConfirmationService} from 'primeng/api';

import { Recipe } from 'src/app/modules/recipe-management/models/recipe.model';
import { Rating } from 'src/app/modules/recipe-management/models/review.model';

import { RecipeService } from 'src/app/modules/shared/services/recipe.service';
import { PlansService } from 'src/app/modules/account/services/plans.service';
import { ToastMessageService } from 'src/app/modules/core/services/toast.message.service';
import { LoaderService } from 'src/app/modules/core/services/loading.service';

import { AuthenticationService } from 'src/app/modules/core/services/auth.service';
import { ShoppingItem } from 'src/app/modules/account/models/shopping_item.model';

import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { ShoppingService } from 'src/app/modules/shared/services/shopping.service';
import { AppUser } from 'src/app/modules/authentication/models/appUser.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  recipe: Recipe;
  recipeId: number;
  planDate: Date = new Date();
  selectingDate = false;
  comment: string;
  authorId: string;
  ImagesUrl = environment.ImagesUrl;
  
  loggedIn = (): boolean => this.authService.userValue !== null;
  
  get isRecipeOwner(): boolean {
    return this.loggedIn() && this.recipe.author.userName === this.authService.userValue?.userName;
  }
  
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private shoppingService: ShoppingService,
    private authService: AuthenticationService,
    private confirmationService: ConfirmationService,
    private messageService: ToastMessageService,
    private planService: PlansService,
    private loadingService: LoaderService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.loadingService.startLoading();
      const id = params.get('recipeId') ?? '0' ; 
      this.recipeId = parseInt(id , 10);
      this.recipeService.GetRecipeById(this.recipeId)
      .subscribe(res =>{
        this.recipe = res
        this.loadingService.stopLoading();
      });
    });
  }

  toggleCalendar(){
    this.selectingDate = !this.selectingDate;
  }

  addToPlan(){
    this.selectingDate = false;
    
    const day = String(this.planDate.getDate()).padStart(2, '0');
    const month = String(this.planDate.getMonth() + 1).padStart(2, '0');
    const year = this.planDate.getFullYear();
    
    const formattedDate = `${year}-${month}-${day}`;

    if(this.recipe.plan !== null){
      this.planService.changePlanDate(this.recipe.plan.id, formattedDate).subscribe(res => {
        this.messageService.showSuccessMessage("Date changed successfully.")
      })
    }else{
      this.planService.AddToPlans(formattedDate, this.recipeId).subscribe(res => {
        this.recipe.plan = res;
        this.messageService.showSuccessMessage("Recipe added to plans successfully.")
      });
    }
  }

  shareRecipe() {
    const recipeUrl = `${environment.apiUrl}/recipe/${this.recipeId}`;
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(recipeUrl)}`;
    const newWindow = this.document.defaultView!.open(shareUrl, '_blank');
    if (newWindow) {
    } else {
      console.error('Popup blocked. Please allow popups for sharing.');
    }
  }

  swtichFav(){
    if(this.recipe.inFavourites === true){
      this.recipeService.removeFromfavourites(this.recipeId).subscribe(res =>{
        if(res === true) {
          this.recipe.inFavourites = false;
          this.messageService.showSuccessMessage("Removed From Favourites Successfully.")
        }
      })
    }else{
      this.recipeService.addToFavourites(this.recipeId).subscribe(res =>{
        if(res === true) {
          this.recipe.inFavourites = true;
          this.messageService.showSuccessMessage("Added To Favourites Successfully.")
        }
      })
    }
  }

  editRecipe(){
    this.router.navigate(['/recipes', this.recipeId, 'edit']);
  }

  addToShoppingList(){
    this.recipe.ingredients.forEach(element =>{
      var newItem: ShoppingItem = {
        Ingredient: element.description,
        UserId: this.authService.userValue?.userId!,
        isPurchased: false,
        Quantity: 1,
      };
      console.log("newItem");
         console.log(newItem);
      this.shoppingService.addShoppingItem(newItem).subscribe(res => {
         console.log("res");
         console.log(res);
      });
    })
  }

  deleteRecipe() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.recipeService.DeleteRecipe(this.recipeId).subscribe(res =>{
            this.messageService.showSuccessMessage('Recipe deleted successfully');
            this.router.navigate(['recipes']);
          });
        },
        reject: (type: ConfirmEventType) => {
          switch (type) {
            case ConfirmEventType.REJECT:
                this.messageService.showInfoMessgae('You have rejected');
                break;
            case ConfirmEventType.CANCEL:
                this.messageService.showInfoMessgae('You have cancelled');
                break;
            }
          }
      });
  }
}
