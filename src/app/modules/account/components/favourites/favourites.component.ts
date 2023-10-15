import { Component, HostListener, OnInit } from '@angular/core';
import { RecipeSummary } from 'src/app/modules/shared/models/recipe.summary';
import { RecipeService } from 'src/app/modules/shared/services/recipe.service';
import { ScrollingService } from '../../services/scroll.service';
import { LoaderService } from 'src/app/modules/core/services/loading.service';
import { AccountService } from 'src/app/modules/account/services/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
  recipes: RecipeSummary[];
  first: number = 0;
  rows: number = 8;
  pageNumber: number = 1;
  totalRecords: number = 0;
  ImagesUrl = environment.ImagesUrl;
  
  constructor(
    private recipeService: RecipeService, 
    private accountService: AccountService, 
    private scrollingService: ScrollingService,
    private loadingService: LoaderService
  ) {
  }

  ngOnInit(): void {
    this.recipes = [];
    this.scrollingService.$scrolling.subscribe(e => {
      if(e.directionY == 1){
        if(this.totalRecords === this.recipes.length ) {// if already got all return
          return; 
        }
        this.getFavouriteRecipes();
      }
    });
    this.getFavouriteRecipes();
  }

  getFavouriteRecipes(){
    this.loadingService.startLoading(); 
    this.accountService.getFavourites(this.pageNumber, this.rows).subscribe(res => {
      this.recipes.push(...res.items);
      this.totalRecords = res.totalCount;
      this.rows = res.pageSize;
      this.pageNumber += 1;
      this.loadingService.stopLoading(); 
      
    });
  }

  removeFromFavs(idx: number ){
    let recipe = this.recipes[idx];
    this.recipeService.removeFromfavourites(recipe.id).subscribe(res => {
      if(res === true) recipe.inFavourites = false;
    })
  }
  
  undo(idx: number){
    let recipe = this.recipes[idx];
    this.recipeService.addToFavourites(recipe.id).subscribe(res => {
      if(res === true) recipe.inFavourites = true;
    })
  }
}

