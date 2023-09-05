import { Injectable } from '@angular/core';
import { Recipe, Recipe2 } from '../models/add-recipe.module';
import { recipes } from './dummy.data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrlAdd = 'https://localhost:3000/api/Recipe/add';
  private apiUrlUpdate = 'https://localhost:3000/api/Recipe/update';
  private apiUrlGetById = 'https://localhost:3000/api/Recipe';
  
    constructor(private http: HttpClient) {}
  
    // Add a method to send a POST request to the API
    addRecipe(recipe: Recipe2): Observable<any> {
      console.log("finally");
      console.log(recipe.ImageUrl);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
  
      return this.http.post(this.apiUrlAdd, recipe, httpOptions);
    }


    updateRecipe(recipe: Recipe): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
  
      console.log(recipe);
      return this.http.put(this.apiUrlUpdate, recipe, httpOptions);
    }

  GetAllRecipes(): Recipe[] {
    return recipes;
  }

  GetRecipeById(): Observable<Recipe>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const url = `${this.apiUrlGetById}/${12}`;
    const res = this.http.get<Recipe>(url, httpOptions);
    console.log("res = ");
    console.log(res);
    return res;
  }
}