import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PaginatedResponse } from '../../core/models/paginated.response';
import { environment } from 'src/environments/environment';
import { RecipeSummary } from '../../shared/models/recipe.summary';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccountService {

  private apiUrl = `${environment.apiUrl}/account`;
  
  constructor(
    private http: HttpClient
  ) {
  }

  getMyRecipes(CurrentPage: number , pageSize: number): Observable<PaginatedResponse<RecipeSummary>> { 
    return this.http.get<PaginatedResponse<RecipeSummary>>( `${this.apiUrl}/my-recipes`, 
      {params : {CurrentPage, pageSize}}
    );
  } 

  getFavourites(CurrentPage:number , pageSize:number): Observable<PaginatedResponse<RecipeSummary>> {
    return this.http.get<PaginatedResponse<RecipeSummary>>(`${this.apiUrl}/favourites`, {params : {CurrentPage, pageSize}});
  }

}