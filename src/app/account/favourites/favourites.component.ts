import { Component, HostListener, OnInit } from '@angular/core';
import { RecipeSummary } from 'src/app/models/recipe.summary';
import { RecipeService } from 'src/app/services/recipe.service';
import { ScrollingService } from '../servcies/scroll.service';
import { LoaderService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
  recipes: RecipeSummary[] = [];
  first: number = 0;
  rows: number = 8;
  pageNumber: number = 1;
  totalRecords: number = 0;
  scrollingDown = false;
  
  constructor(
    private recipeService: RecipeService, 
    private scrollingService: ScrollingService,
    private loadingService: LoaderService

  ) {
    scrollingService.$scrolling.subscribe(e => {
      if(e.directionY == 1){
        if(this.totalRecords === this.recipes.length ) {// if already got all return
          return; 
        }
        this.getFavouriteRecipes();
      }
    });
  }

  ngOnInit(): void {
    this.getFavouriteRecipes();
  }

  getFavouriteRecipes(){
    this.loadingService.startLoading(); 
    this.recipeService.getFavourites(this.pageNumber, this.rows).subscribe(res => {
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

