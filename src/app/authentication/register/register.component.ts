import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { 
  FormBuilder, 
  FormGroup, 
  Validators 
} from '@angular/forms';

import { AuthenticationService } from 'src/app/services/auth.service';
import { ToastMessageService } from 'src/app/services/message.service';


@Component({ 
  templateUrl: 'register.component.html' ,
  styleUrls: [
    "register.component.css"
  ]
})
export class RegisterComponent implements OnInit {
  
  form!: FormGroup;
  loading = false;
  submitted = false;
  passwordMatches = false;
  hidePassword = true;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private messageService: ToastMessageService,
    private router: Router,

    ) { }
    
  ngOnInit() {    
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName:  ['', Validators.required],
      userName:  ['', Validators.required],
      email:     ['', Validators.required],
      password:  ['', [Validators.required,]],
      confirm_password:  ['', [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get controls() { return this.form.controls; }

  passwordErrors: string[] = [];

  onSubmit() {
    
    this.submitted = true;
    
    if (this.form.invalid) {
      return;
    }
    
    if(!this.isFormValid()){
      return;
    }

    this.loading = true;
    console.log(this.form.value);
    this.authService.register(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.form.reset();
          this.loading = false;
          this.submitted = false;
          this.messageService.showSuccessMessage('You signed up successfully');
          this.router.navigate(['auth/login']);
        },
        error: error => {
          this.loading = false;
          this.submitted = false;
        }
      });
  }

  isFormValid(): boolean {
    
    const password = this.controls['password'].value;
    const confirmPassword = this.controls['confirm_password'].value;

    let message = '';

    const hasNumber = /\d/.test(password);
    if (!hasNumber) {
      message = "Password must have at least one number.";
      this.messageService.showErrorMessage(message);
    }
  
    const hasLetter = /[a-zA-Z]/.test(password);
    if (!hasLetter) {
      message = "Password must have at least one letter.";
      this.messageService.showErrorMessage(message);
    }
  
    if (password.length < 6) {
      message = "Password length can't be less than 6 characters.";
      this.messageService.showErrorMessage(message);
    }
  
    if (confirmPassword !== '' && password !== confirmPassword) {
      message = "Password does not match.";
      this.messageService.showErrorMessage(message);
    }

    const email = this.controls['email'].value;
    if(!this.isValidEmail(email)){
      message = "Input Email is not a valid eamil address.";
      this.messageService.showErrorMessage(message);
    }
    
    return message === '';

  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  }
}