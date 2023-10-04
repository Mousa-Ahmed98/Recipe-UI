import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { AuthenticationService } from './services/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  user?: User | null;
  title = 'recipe-app';

  constructor(
    private accountService: AuthenticationService,
    private router: Router
    ) {
    this.accountService.user.subscribe(x => this.user = x);
  }
  
  ngOnInit() {
    // just for now 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects;
        const isAccountModule = currentRoute.includes('account'); 

        if (isAccountModule) {
          document.body.classList.add('overflow-hidden');
        } else {
          document.body.classList.remove('overflow-hidden');
        }
      }
    });
  }

  logout: () => void = ()=> this.accountService.logout();
}
