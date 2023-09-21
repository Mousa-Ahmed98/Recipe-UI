import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient} from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Plan } from '../models/plan.model';


@Injectable({
  providedIn: 'root'
})
export class PlansService {

  private apiUrl = `${environment.apiUrl}/plans`;;

  constructor(private http: HttpClient) {}
  
  GetAllPlans(): Observable<Plan[]> {
    return this.http.get<Plan[]>(this.apiUrl);
  } 

  AddToPlans(day: string, recipeId: number): Observable<Plan> {
    return this.http.post<Plan>(this.apiUrl, null, {
      params: {day, recipeId }
    });
  } 
  
  changePlanDate(planId: number, newDate: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${planId}/change-date`, null, {
      params: { date: newDate },
    });
  }

  RemovePlan(planId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${planId}`, {
      params: {planId}
    },);
  } 
}