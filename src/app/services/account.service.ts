import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Notification } from '../models/notification.model';
import { PaginatedResponse } from '../models/paginated.response';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AccountService {

  private ApiUrl = `${environment.apiUrl}/account`;
  
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  getNotifications(CurrentPage: number, pageSize: number){ 
    return this.http.get<PaginatedResponse<Notification>>(
      this.ApiUrl + '/recent-notifications', {params:{CurrentPage, pageSize}}
    );
  }

  readNotifications(){ 
    return this.http.post<any>(environment.apiUrl + '/account/read-notifications', null);
  }
}