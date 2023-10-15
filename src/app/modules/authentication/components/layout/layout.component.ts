import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/core/services/auth.service';

@Component({ templateUrl: 'layout.component.html' })
export class LayoutComponent {
    constructor(
        private router: Router,
        private accountService: AuthenticationService
    ) {
        // redirect to home if already logged in
        if (this.accountService.userValue) {
            this.router.navigate(['/']);
        }
    }
}