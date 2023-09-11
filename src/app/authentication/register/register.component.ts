import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { 
  AbstractControl, 
  ValidationErrors, 
  FormBuilder, 
  FormGroup, 
  Validators 
} from '@angular/forms';

import { AccountService } from 'src/app/services/account.service';


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
  passwordMatches: false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
  ) { }

  ngOnInit() {    
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName:  ['', Validators.required],
      username:  ['', Validators.required],
      email:     ['', Validators.required],
      password:  ['', [Validators.required,]],
      // confirm_password:  ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get controls() { return this.form.controls; }

  passwordErrors: string[] = [];

  onSubmit() {
    this.submitted = true;
    console.log(this.controls['email'].value)

    // if(!this.IsPasswordValid()){
    //     console.log(this.passwordErrors)
    //     return;
    // }

    if (this.form.invalid) {
      // TODO: show error message
      return;
    }

    this.loading = true;
    this.accountService.register(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // TODO: show success message

          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: error => {
          // TODO: show error message

          this.loading = false;
        }
      });
  }

  IsPasswordValid(): boolean {
    const password = this.controls['password'].value;
    const confirmPassword = this.controls['confirm_password'].value;
  
    const errors: string[] = [];
  
    const hasNumber = /\d/.test(password);
    if (!hasNumber) {
      errors.push("Must have at least one number.");
    }
  
    const hasLetter = /[a-zA-Z]/.test(password);
    if (!hasLetter) {
      errors.push("Must have at least one letter.");
    }
  
    if (password.length < 12) {
      errors.push("Password length can't be less than 12 characters.");
    }
  
    if (confirmPassword !== '' && password !== confirmPassword) {
      this.passwordMatches = false;
    }
  
    this.passwordErrors = [...errors];
    console.log(this.passwordErrors);
  
    return this.passwordErrors.length === 0;
  }
      
}