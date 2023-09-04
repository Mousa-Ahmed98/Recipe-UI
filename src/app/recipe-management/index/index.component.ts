import { Component } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from '../../services/recipe.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  
  recipes: Recipe[];
  
  constructor(
    private recipeService: RecipeService, 
    private router: Router,
    )
  {
    this.recipes = recipeService.GetAllRecipes();
  }

  navigateToView(id: number){
    this.router.navigate(['/recipes', id]);  
    //this.router.navigate(['/recipes/create']);
  }
}
