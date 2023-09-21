import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecipeRequest } from '../models/recipe.request';
import { Review } from '../models/review.model';
import { ReviewRequest } from '../models/review.request';
import { ResponseShoppingItem, ShoppingItem } from '../models/shopping_item.model';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  apiUrl = `${environment.apiUrl}/recipe`;;
  apiShopUrl = `${environment.apiUrl}/shopping`;;

  constructor(private http: HttpClient) {}
  
  GetAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl)
  } 
  
  GetRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
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

  // Add a method to send a POST request to the API
  addRecipe(recipeRequest: RecipeRequest): Observable<Recipe> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<Recipe>(`${this.apiUrl}/add`, recipeRequest, httpOptions);
  }
  
  updateRecipe(id: number, recipe: RecipeRequest): Observable<Recipe> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    
    return this.http.put<Recipe>(`${this.apiUrl}/update/${id}`, recipe, httpOptions);
  }
  
  DeleteRecipe(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`)
  }

  addReview(reviewRequest: ReviewRequest): Observable<Review> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<Review>(`${this.apiUrl}/addreview`, reviewRequest, httpOptions);
  }


  addShoppingItem(shoppingItem: ShoppingItem){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<ShoppingItem>(`${this.apiShopUrl}/addShopItem`, shoppingItem, httpOptions);
  }


}