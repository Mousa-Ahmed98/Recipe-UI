import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

import { Recipe } from '../models/recipe.model';
import { RecipeRequest } from '../models/recipe.request';
import { PaginatedResponse } from '../models/paginated.response';
import { RecipeSummary } from '../models/recipe.summary';
import { Review } from '../models/review.model';
import { ReviewRequest } from '../models/review.request';
import { ResponseShoppingItem, ShoppingItem } from '../models/shopping_item.model';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private apiUrl = `${environment.apiUrl}/recipe`;
  apiShopUrl = `${environment.apiUrl}/shopping`;

  constructor(private http: HttpClient) {}
  
  GetAllRecipes(CurrentPage:number , pageSize:number): Observable<PaginatedResponse<RecipeSummary>> {
    return this.http.get<PaginatedResponse<RecipeSummary>>(
      this.apiUrl, {params:{CurrentPage, pageSize}}
      )
  } 
  
  GetFilteredRecipes(filterIngredients: string[]):  Observable<PaginatedResponse<RecipeSummary>> {
    const params = new HttpParams().set('ingredients', filterIngredients.join(','));
    return this.http.get<PaginatedResponse<RecipeSummary>>(this.apiUrl + '/filter', {params})
  }

  SearchRecipes(query: string, CurrentPage: number = 1 , pageSize: number = 8): Observable<PaginatedResponse<RecipeSummary>> {
    return this.http.get<PaginatedResponse<RecipeSummary>>(this.apiUrl + '/search', 
      { params: {query, CurrentPage, pageSize} }
    )
  }
  
  GetRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  } 
  
  addRecipe(recipeRequest: RecipeRequest): Observable<Recipe> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<Recipe>(`${this.apiUrl}`, recipeRequest, httpOptions);
  }
  
  updateRecipe(id: number, recipe: RecipeRequest): Observable<Recipe> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    
    return this.http.put<Recipe>(`${this.apiUrl}/${id}`, recipe, httpOptions);
  }
  
  DeleteRecipe(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
  }

  addReview(reviewRequest: ReviewRequest): Observable<Review> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<Review>(`${this.apiUrl}/addreview`, reviewRequest, httpOptions);
  }
  
  addToFavourites(id: number): Observable<boolean> {
    return this.http.post(`${this.apiUrl}/${id}/favourites`, null, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => response.status === 204 || response.status === 201),
        catchError(() => of(false))
      );
  }
  
  removeFromfavourites(id: number): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/${id}/favourites`, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => response.status === 204 || response.status === 201),
        catchError(() => of(false))
      );
  }

  addShoppingItem(shoppingItem: ShoppingItem){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<ShoppingItem>(`${this.apiShopUrl}/addShopItem`, shoppingItem, httpOptions);
  }
  
  GetShoppingList(id:string): Observable<ResponseShoppingItem[]> {
    return this.http.get<ResponseShoppingItem[]>(this.apiShopUrl+"/GetAllItems/"+id);
  }
  
  toggleShopItem(item:ResponseShoppingItem): Observable<ResponseShoppingItem> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.put<ResponseShoppingItem>(`${this.apiShopUrl}/updateShopItem`, item, httpOptions);
  }

}