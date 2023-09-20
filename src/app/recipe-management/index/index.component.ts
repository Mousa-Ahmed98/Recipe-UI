import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';

import { RecipeService } from '../../services/recipe.service'
import { RecipeSummary } from 'src/app/models/recipe.summary';
import { PageEvent } from '../../models/page.event';

import { AccountService } from 'src/app/services/account.service';
import { ToastMessageService } from 'src/app/services/message.service';
import { LoaderService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  recipes: RecipeSummary[] = [];
  filterIngredients: string[] = [];
  first: number = 0;
  rows: number = 5;
  pageNumber: number = 1;
  totalRecords: number = 0;
  durationInSeconds: number = 5;
  
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  
  constructor(
    private recipeService: RecipeService, 
    private router: Router,
    private accountService: AccountService,
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
    this.loadingService.setLoading(true);
    this.recipeService.GetAllRecipes(this.pageNumber, this.rows).subscribe(res =>{
      this.recipes = res.items;
      // this.first = res.pageNumber - 1;
      this.totalRecords = res.totalCount;
      this.rows = res.pageSize;
      this.loadingService.setLoading(false);
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
