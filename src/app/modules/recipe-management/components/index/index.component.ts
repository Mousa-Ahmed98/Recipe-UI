import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';

import { RecipeService } from 'src/app/modules/shared/services/recipe.service'; 
import { RecipeSummary } from 'src/app/modules/shared/models/recipe.summary'; 
import { PageEvent } from '../../../core/models/page.event'; 

import { AuthenticationService } from 'src/app/modules/core/services/auth.service';
import { ToastMessageService } from 'src/app/modules/core/services/toast.message.service';
import { LoaderService } from 'src/app/modules/core/services/loading.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  recipes: RecipeSummary[] = [];
  filterIngredients: string[] = [];
  first: number = 0;
  rows: number = 8;
  pageNumber: number = 1;
  totalRecords: number = 0;
  durationInSeconds: number = 5;
  imagesUrl = environment.ImagesUrl;
  
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  
  constructor(
    private recipeService: RecipeService, 
    private router: Router,
    private accountService: AuthenticationService,
    private toastMessageService: ToastMessageService,
    private loadingService: LoaderService
    ) { }

  ngOnInit(): void {
    this.getRecipes();
  }

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
    this.pageNumber = Math.ceil(this.first / this.rows) + 1;
    this.getRecipes();
  }

  navigateToView(id: number){
    this.router.navigate(['/recipes', id]);
  }

  remove(ing: string): void {
    const index = this.filterIngredients.indexOf(ing);

    if (index >= 0) {
      this.filterIngredients.splice(index, 1);
    }
    
    this.FilterRecipes();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our ingredient
    if (value) {
      this.filterIngredients.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
    
    this.FilterRecipes();
  }

  edit(ing: string, event: MatChipEditedEvent) {
    const value = event.value.trim();
    // Remove ingredient if it no longer has a name
    if (!value) {
      this.remove(ing);
      return;
    }
    // Edit existing ingredient
    const index = this.filterIngredients.indexOf(ing);
    if (index >= 0) {
      this.filterIngredients[index] = value;
    }
    this.FilterRecipes();
  }

  FilterRecipes(){
    if(this.filterIngredients.length === 0) {
      this.getRecipes();
    }else{
      this.recipeService.GetFilteredRecipes(this.filterIngredients).subscribe(res =>{
        this.recipes = res.items
      });
    }
  }

  getRecipes(){
    this.loadingService.startLoading();
    this.recipeService.GetAllRecipes(this.pageNumber, this.rows).subscribe(res =>{
      this.recipes = res.items;
      this.totalRecords = res.totalCount;
      this.loadingService.stopLoading();
    });
  }
  
  toggleFav(idx: number){
    let recipe = this.recipes[idx];
    
    if(recipe.inFavourites === true){
      this.recipeService.removeFromfavourites(recipe.id).subscribe(res => {
        if(res === true) {
          this.toastMessageService.showSuccessMessage("Removed from favourites");
        }
      });
    }else{
      this.recipeService.addToFavourites(recipe.id).subscribe(res => {
        if(res === true){
          this.toastMessageService.showSuccessMessage("Added to favourites");
        }
      });
    }
    recipe.inFavourites = !recipe.inFavourites;
  }

  isLoggedIn(){
    return this.accountService.userValue !== null;
  }
}
