import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/modules/core/services/auth.service';
import { ToastMessageService } from 'src/app/modules/core/services/toast.message.service';


@Component({ 
  templateUrl: 'login.component.html',  
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  hidePassword = true;
  invalid = false;
  rememberMe = true;
  toggleRememberMe = () => this.rememberMe = !this.rememberMe;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private messageService: ToastMessageService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get controls() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.authService.login(this.controls['email'].value, this.controls['password'].value, this.rememberMe)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
          this.messageService.showSuccessMessage("Logged In Successfully!");
        },
        error: error => {
          this.submitted = false;
          this.invalid = true;
          this.loading = false;
          this.form.reset();
          console.error(error);
        }
      });
  }
}