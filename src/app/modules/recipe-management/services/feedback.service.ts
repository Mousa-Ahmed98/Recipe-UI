import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Rating } from '../models/review.model';
import { RatingRequest } from '../models/review.request';
import { CommentRequest } from '../models/comment.request';
import { ReplyRequest } from '../models/reply.request';
import { Reply } from '../models/reply.model';
import { Comment } from '../models/comment.model';
import { PaginatedResponse } from '../../core/models/paginated.response';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private getRatingApiUrl(recipeId: number) {
    return `${environment.apiUrl}/recipe/${recipeId}/rating`;
  }

  constructor(private http: HttpClient) {}

  // Ratings

  getReview(recipeId: number, pageNumber: number = 1 , pageSize: number = 10): Observable<PaginatedResponse<Rating>> {
    return this.http.get<PaginatedResponse<Rating>>(
      this.getRatingApiUrl(recipeId), 
      { params: {pageNumber, pageSize} }
    );
  }

  addReview(reviewRequest: RatingRequest): Observable<Rating> {
    return this.http.post<Rating>(
      this.getRatingApiUrl(reviewRequest.recipeId), reviewRequest
    );
  }

  updateReview(reviewRequest: RatingRequest): Observable<Rating> {
    return this.http.put<Rating>(
      this.getRatingApiUrl(reviewRequest.recipeId), 
      reviewRequest
    );
  }

  deleteReview(recipeId: number): Observable<Rating> {
    return this.http.delete<Rating>(this.getRatingApiUrl(recipeId));
  }

  // Comments

  getComments(recipeId: number, pageNumber: number = 1 , pageSize: number = 10): Observable<PaginatedResponse<Comment>> {
    return this.http.get<PaginatedResponse<Comment>>(
      `${environment.apiUrl}/comments`, 
      { params: {recipeId, pageNumber, pageSize} } 
    );
  }

  addComment(commentRequest: CommentRequest): Observable<Comment> {
    return this.http.post<Comment>(
      `${environment.apiUrl}/comments`, commentRequest
    );
  }

  updateComment(commentId: number, commentRequest: CommentRequest): Observable<Comment> {
    return this.http.put<Comment>(
      `${environment.apiUrl}/comments/${commentId}`, 
      commentRequest
    );
  }

  deleteComment(commentId: number): Observable<Comment> {
    return this.http.delete<Comment>(
      `${environment.apiUrl}/comments/${commentId}`
    );
  }

  // Replies

  addReply(commentId: number, replyRequest: ReplyRequest): Observable<Reply> {
    return this.http.post<Reply>(
      `${environment.apiUrl}/comments/${commentId}/replies`, 
      replyRequest
    );
  }

  updateReply(commentId: number, replyId: number, replyRequest: ReplyRequest): Observable<Reply> {
    return this.http.put<Reply>(
      `${environment.apiUrl}/comments/${commentId}/replies/${replyId}`, 
      replyRequest
    );
  }

  deleteRepy(commentId: number, replyId: number): Observable<Reply> {
    return this.http.delete<Reply>(
      `${environment.apiUrl}/comments/${commentId}/replies/${replyId}`
    );
  }

}