import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Rating } from '../models/review.model';
import { RatingRequest } from '../models/review.request';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private getApiUrl(recipeId: number) {
    return `${environment.apiUrl}/recipe/${recipeId}/rating`;
  }

  constructor(private http: HttpClient) {}

  // Ratings

  getReview(reviewRequest: RatingRequest): Observable<Rating> {
    return this.http.get<Rating>(this.getApiUrl(reviewRequest.recipeId));
  }

  addReview(reviewRequest: RatingRequest): Observable<Rating> {
    return this.http.post<Rating>(this.getApiUrl(reviewRequest.recipeId), reviewRequest);
  }

  updateReview(reviewRequest: RatingRequest): Observable<Rating> {
    return this.http.put<Rating>(this.getApiUrl(reviewRequest.recipeId), reviewRequest);
  }

  deleteReview(recipeId: number): Observable<Rating> {
    return this.http.delete<Rating>(this.getApiUrl(recipeId));
  }

  // Comments

  getComment(reviewRequest: RatingRequest): Observable<Rating> {
    return this.http.get<Rating>(this.getApiUrl(reviewRequest.recipeId));
  }

  addComment(reviewRequest: RatingRequest): Observable<Rating> {
    return this.http.post<Rating>(this.getApiUrl(reviewRequest.recipeId), reviewRequest);
  }

  updateComment(reviewRequest: RatingRequest): Observable<Rating> {
    return this.http.put<Rating>(this.getApiUrl(reviewRequest.recipeId), reviewRequest);
  }

  deleteComment(reviewRequest: RatingRequest): Observable<Rating> {
    return this.http.delete<Rating>(this.getApiUrl(reviewRequest.recipeId));
  }

}