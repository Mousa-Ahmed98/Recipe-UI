import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notification } from '../models/notification.model';
import { PaginatedResponse } from '../modules/core/models/paginated.response';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class NotificationsService {

  private apiUrl = `${environment.apiUrl}/account`;
  
  constructor(
    private http: HttpClient
  ) {
  }

  getNotifications(CurrentPage: number, pageSize: number){ 
    return this.http.get<PaginatedResponse<Notification>>(
      this.apiUrl + '/recent-notifications', {params:{CurrentPage, pageSize}}
    );
  }

  readNotifications(){ 
    return this.http.post<any>(this.apiUrl + '/read-notifications', null);
  }

}