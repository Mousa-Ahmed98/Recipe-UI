import { Injectable } from '@angular/core';
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

  getMyRecipes(pageNumber: number , pageSize: number): Observable<PaginatedResponse<RecipeSummary>> { 
    return this.http.get<PaginatedResponse<RecipeSummary>>( `${this.apiUrl}/my-recipes`, 
      {params : {pageNumber, pageSize}}
    );
  } 

  getFavourites(pageNumber: number , pageSize: number): Observable<PaginatedResponse<RecipeSummary>> {
    return this.http.get<PaginatedResponse<RecipeSummary>>
      (`${this.apiUrl}/favourites`, {params : {pageNumber, pageSize}});
  }

}