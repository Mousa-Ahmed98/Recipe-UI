import { ChangeDetectorRef, Component,Injectable, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ConfirmEventType, ConfirmationService} from 'primeng/api';

import { Recipe } from 'src/app/models/recipe.model';
import { Review } from 'src/app/models/review.model';
import { ReviewRequest } from 'src/app/models/review.request';

import { RecipeService } from 'src/app/services/recipe.service';
import { PlansService } from 'src/app/services/plans.service';
import { ToastMessageService } from 'src/app/services/message.service';
import { LoaderService } from 'src/app/services/loading.service';

import { AccountService } from 'src/app/services/account.service';
import { ShoppingItem } from 'src/app/models/shopping_item.model';
import { DOCUMENT } from '@angular/common';
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
  planDate: Date = new Date();
  selectingDate = false;
  rating: any;
  comment: string;
  authorId: string;
  reviewRequest: ReviewRequest;
  private cdr: ChangeDetectorRef;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private accountService: AccountService,
    // private confirmationService: ConfirmationService,
    // private messageService: MessageService
    private confirmationService: ConfirmationService,
    private messageService: ToastMessageService,
    private planService: PlansService,
    private loadingService: LoaderService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.loadingService.startLoading();
      const id = params.get('recipeId') ?? '0' ; 
      this.recipeId = parseInt(id , 10);
      this.recipeService.GetRecipeById(this.recipeId)
      .subscribe(res =>{
        this.recipe = res
        console.log("reviews");
        console.log(this.recipe.reviews);
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
    // Define the URL you want to share
    const recipeUrl = 'https://localhost:3000/api/recipe/';

    // Create a share URL for a specific social media platform (e.g., Twitter)
    //const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${{recipeUrl}}`;
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(recipeUrl+this.recipeId)}`;
    //const shareUrl = `https://wa.me/?text=${encodeURIComponent(recipeUrl)}`;


    // Open a new window or tab with the share URL
    const newWindow = this.document.defaultView!.open(shareUrl, '_blank');
    
    if (newWindow) {
      // Window opened successfully, you can add additional logic here if needed
    } else {
      // Handle if the window was blocked by a popup blocker
      console.error('Popup blocked. Please allow popups for sharing.');
    }
  }

  swtichFav(){
    if(this.recipe.inFavourites === true){
      this.recipeService.removeFromfavourites(this.recipeId).subscribe(res =>{
        if(res === true) {
          this.recipe.inFavourites = false;
        }
      })
    }else{
      this.recipeService.addToFavourites(this.recipeId).subscribe(res =>{
        if(res === true) this.recipe.inFavourites = true;
      })
    }
  }

  reset(){
    this.rating = 0;
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  addReview(){
    if(this.rating == null || this.comment == null)
    return;
    console.log(this.accountService.userValue?.userId);
    console.log(this.accountService.userValue?.userName);
    try{
      const newReview: ReviewRequest = {
        authorId: this.accountService.userValue?.userId!, //Mousa id
        authorName: this.accountService.userValue?.userName!, //Mousa id
        recipeId: this.recipeId,
        content: this.comment,
        rate: this.rating,
      };
      this.recipeService.addReview(newReview).subscribe(res => {
        console.log(res);
        this.rating = null;
        this.comment = "";
        this.recipe.reviews.push(res); 
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
        UserId: this.accountService.userValue?.userId!,
        isPurchased: false,
        Quantity: 1,
      };
      console.log("newItem");
         console.log(newItem);
      this.recipeService.addShoppingItem(newItem).subscribe(res => {
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
            this.messageService.showInfoMessgae("You have accepted");
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
