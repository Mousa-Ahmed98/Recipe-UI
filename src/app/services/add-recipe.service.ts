import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../models/add-recipe.module';

@Injectable({
    providedIn: 'root',
  })
  export class AddRecipeService {
    private apiUrl = 'https://localhost:7031/api/Recipe/add';
  
    constructor(private http: HttpClient) {}
  
    // Add a method to send a POST request to the API
    addRecipe(recipe: Recipe): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
  
      return this.http.post(this.apiUrl, recipe, httpOptions);
    }
  }