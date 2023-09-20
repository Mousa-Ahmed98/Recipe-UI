import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ConfirmEventType, ConfirmationService} from 'primeng/api';

import { Recipe } from 'src/app/models/recipe.model';
import { Review } from 'src/app/models/review.model';
import { ReviewRequest } from 'src/app/models/review.request';

import { RecipeService } from 'src/app/services/recipe.service';
import { PlansService } from 'src/app/services/plans.service';
import { ToastMessageService } from 'src/app/services/message.service';
import { LoaderService } from 'src/app/services/loading.service';

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
  rating: number = 0;
  comment: string;
  authorId: string;
  reviewRequest: ReviewRequest;
  private cdr: ChangeDetectorRef;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
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
    console.log("Hi mousa");
    const newReview: ReviewRequest = {
      authorId: "c47c056a-85db-469c-9d8b-162199c0b031", //Mousa id
      recipeId: this.recipeId,
      content: this.comment,
      rate: this.rating
    };
    this.recipeService.addReview(newReview).subscribe(res => {
      console.log(res);
      this.recipe.reviews.push(res);
      this.rating = 0;
      this.comment = "";
    });
  }

  editReview(id: number){

  }

  deleteReview(id: number){

  }

  editRecipe(){
    this.router.navigate(['/recipes', this.recipeId, 'edit']);
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
