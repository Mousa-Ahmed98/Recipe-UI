import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { Review } from 'src/app/models/review.model';
import { RecipeService } from 'src/app/services/recipe.service';
import {ConfirmationService} from 'primeng/api';
import {MessageService} from 'primeng/api';
import { ReviewRequest } from 'src/app/models/review.request';
import { AccountService } from 'src/app/services/account.service';
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
    private accountService: AccountService
    // private confirmationService: ConfirmationService,
    // private messageService: MessageService
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

  deleteRecipe(event: Event) {
    // this.confirmationService.confirm({
    //   target: event.target !== null ? event.target : undefined,
    //   message: 'Are you sure that you want to delete this recipe?',
    //   icon: 'pi pi-exclamation-triangle',
      
    //   accept: () => {
    //     this.recipeService.DeleteRecipe(this.recipeId).subscribe(res =>
    //       this.router.navigate(['recipes'])
    //       );
    //   },
      
    //   reject: () => {
    //   }
    // });
  }
}
