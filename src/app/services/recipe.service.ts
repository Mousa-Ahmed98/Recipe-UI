import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Recipe } from '../models/recipe.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  DeleteRecipe(id: number) {
    return this.http.delete<any>(`${environment.apiUrl}/recipe/delete/${id}`)
  }

  constructor(private http:HttpClient) { }

  GetAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${environment.apiUrl}/recipe`)
  }
  
  GetRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${environment.apiUrl}/recipe/${id}`);
  }
  
}