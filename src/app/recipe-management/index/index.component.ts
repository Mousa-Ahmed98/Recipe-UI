import { Component } from '@angular/core';
import { RecipeService } from '../../services/recipe.service'
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  
  recipes: Recipe[] = [];
  
  constructor(
    private recipeService: RecipeService, 
    private router: Router,
    )
  {
    this.recipeService.GetAllRecipes().subscribe(res =>{
      this.recipes = res
    });
  }

  navigateToView(id: number){
    this.router.navigate(['/recipes', id]);  
  }
}
