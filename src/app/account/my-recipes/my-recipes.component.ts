import { Component } from '@angular/core';
import { RecipeSummary } from 'src/app/models/recipe.summary';
import { RecipeService } from 'src/app/services/recipe.service';
import { ScrollingService } from '../servcies/scroll.service';
import { LoaderService } from 'src/app/services/loading.service';
import { Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { ToastMessageService } from 'src/app/services/message.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.scss']
})
export class MyRecipesComponent {
  recipes: RecipeSummary[] = [];
  first: number = 0;
  rows: number = 8;
  pageNumber: number = 1;
  totalRecords: number = 0;
  scrollingDown = false;
  
  constructor(
    private recipeService: RecipeService, 
    private accountService: AccountService,
    private scrollingService: ScrollingService,
    private loadingService: LoaderService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: ToastMessageService,
  ) {
    scrollingService.$scrolling.subscribe(e => {
      if(e.directionY == 1){
        if(this.totalRecords === this.recipes.length ) {// if already got all return
          return; 
        }
        this.getMyRecipes();
      }
    });
  }

  ngOnInit(): void {
    this.getMyRecipes();
  }

  getMyRecipes(){
    this.loadingService.startLoading(); 
    this.accountService.getMyRecipes(this.pageNumber, this.rows).subscribe(res => {
      this.recipes.push(...res.items);
      this.totalRecords = res.totalCount;
      this.rows = res.pageSize;
      this.pageNumber += 1;
      this.loadingService.stopLoading(); 
    });
  }
  
  editRecipe(idx: number){
    const recipe = this.recipes[idx];
    this.router.navigate(['/recipes', recipe.id, 'edit']);
  }

  deleteRecipe(idx: number) {
    this.confirmationService.confirm({
        message: 'Are you sure that you Delete this recipe?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const recipe = this.recipes[idx];
          this.recipeService.DeleteRecipe(recipe.id).subscribe(res => {
            this.recipes.splice(idx, 1);
            this.messageService.showInfoMessgae("Recipe Deleted Successfully");
          })
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
