import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { PaginatedResponse } from '../../core/models/paginated.response';
import { RecipeSummary } from '../../shared/models/recipe.summary';
import { Observable, catchError, map, of } from 'rxjs';
import { AppUser } from '../../authentication/models/appUser.model';


@Injectable({ providedIn: 'root' })
export class UserService {
  
  private apiUrl = `${environment.apiUrl}/users`;;
  
  constructor(
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

  GetUserRecipes(username: string, pageNumber: number , pageSize: number): Observable<PaginatedResponse<RecipeSummary>> {
    return this.http.get<PaginatedResponse<RecipeSummary>>(
      `${this.apiUrl}/${username}/recipes`, {params:{pageNumber, pageSize}}
    )
  }
}