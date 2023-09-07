import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
  })
  export class CategoriesService {
    apiUrl = `${environment.apiUrl}/Category`;

    constructor(private http: HttpClient) {}
  
    getCategories(): Observable<Category[]> {
      return this.http.get<Category[]>(`${this.apiUrl}/GetAllCategories`);
    }
  }