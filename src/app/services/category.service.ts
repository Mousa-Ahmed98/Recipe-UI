import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
    providedIn: 'root',
  })
  export class CategoriesService {
    private apiUrl = 'https://localhost:3000/api/Category/GetAllCategories';
  
    constructor(private http: HttpClient) {}
  
    // Add a method to send a POST request to the API
    getCategories(): Observable<Category[]> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
      return this.http.get<Category[]>(this.apiUrl);

    }
  }