import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { AuthenticationService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastMessageService } from '../services/message.service';
import { LoaderService } from '../services/loading.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  
  constructor(
    private accountService: AuthenticationService,
    private router: Router,
    private toastMessageService: ToastMessageService,
    private loadingService: LoaderService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        
        this.loadingService.stopLoading();
        
        console.error(err);

        if (err.status === 401 && this.accountService.userValue) {
          // auto logout if 401 response returned from api
          this.accountService.logout();
          this.router.navigate(['account/login']);
        }

        if (err.status === 403) {
          this.router.navigate(['account/access-denied']); // TODO: add "access-denied" page
        }

        if (err.status === 500) {
          this.toastMessageService.showErrorMessage("Server Error!");
        } else if (err.status === 400) { // for bad requests
          this.toastMessageService.showErrorMessage(err.error);
        } else if (err.status === 0) {
          this.toastMessageService.showErrorMessage('Server is unavailable or request timed out.');
        }

        return throwError(() => err);
      })
    );
  }
}