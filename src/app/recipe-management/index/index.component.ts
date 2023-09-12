import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service'
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { RecipeSummary } from 'src/app/models/recipe.summary';
import { PageEvent } from '../../models/page.event';

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
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  
  constructor(
    private recipeService: RecipeService, 
    private router: Router,
    )
  {
  }

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
    this.recipeService.GetAllRecipes(this.pageNumber, this.rows).subscribe(res =>{
      this.recipes = res.items;
      // this.first = res.pageNumber - 1;
      this.totalRecords = res.totalCount;
      this.rows = res.pageSize;
    });
  }

}
