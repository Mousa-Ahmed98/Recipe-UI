import { Injectable } from '@angular/core';
import { HubConnectionBuilder, HubConnection, IHttpConnectionOptions, LogLevel } from '@aspnet/signalr';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notification } from 'src/app/models/notification.model';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HubService {

  private hubConnection: HubConnection;

  private notificationSubject: BehaviorSubject<Notification | null> 
    = new BehaviorSubject<Notification | null>(null) ;
  public notification: Observable<Notification | null> = this.notificationSubject.asObservable();

  constructor(
    private authService: AuthenticationService
    ) { 
      this.authService.user.subscribe(val => {
        if(val !== null){ // logged in 
          this.startConnection();
        }else{ // logged out
          this.stopConnection();
        }
      })
    }


  startConnection(){
    const token: string = this.authService.userValue?.token!;

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(environment.hubUrl, {
          accessTokenFactory: () => {
            return token;
          }
        }
      )
      .configureLogging(LogLevel.Information)
      .build();
      
      this.hubConnection.start()
      .then(() => {
        console.log('Connection started');
      })
      .catch(err => {
        console.error('Error while starting connection: ' + err);
      });

    this.hubConnection.on('getNotified', (notification: Notification)=>{
      this.notificationSubject.next(notification);
    });
  }

  stopConnection(){
    this.hubConnection.stop()
    .then(() => {
      console.log('Connection stopped');
    })
    .catch(err => {
      console.error('Error while stopping connection: ' + err);
    });
  }

}