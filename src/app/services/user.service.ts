import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { PaginatedResponse } from '../models/paginated.response';
import { RecipeSummary } from '../models/recipe.summary';
import { Observable, catchError, map, of } from 'rxjs';
import { AppUser } from '../models/appUser.model';


@Injectable({ providedIn: 'root' })
export class UserService {
  
  private apiUrl = `${environment.apiUrl}/users`;;
  
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  GetUser(username: string): Observable<AppUser> {
    return this.http.get<AppUser>(`${this.apiUrl}/${username}`);
  }

  FollowUser(username: string): Observable<boolean | object>{
    return this.http.post(`${this.apiUrl}/${username}/follow`, null)
              .pipe(
                catchError(error => {
                  console.error(error);
                  return of(false);
                })
              );
  }
  
  UnfollowUser(username: string): Observable<boolean | object>{
    return this.http.post(`${this.apiUrl}/${username}/unfollow`, null)
              .pipe(
                catchError(error => {
                  console.error(error);
                  return of(false);
                })
              );
  }


  GetUserRecipes(username: string, CurrentPage: number , pageSize: number): Observable<PaginatedResponse<RecipeSummary>> {
    return this.http.get<PaginatedResponse<RecipeSummary>>(
      `${this.apiUrl}/${username}/recipes`, {params:{CurrentPage, pageSize}}
    )
  }
}