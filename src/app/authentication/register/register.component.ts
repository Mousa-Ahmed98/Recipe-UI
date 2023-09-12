import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { 
  FormBuilder, 
  FormGroup, 
  Validators 
} from '@angular/forms';

import { AccountService } from 'src/app/services/account.service';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';


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
  messages: Message[];
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private messageService: MessageService
    ) { }
    
  ngOnInit() {    
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName:  ['', Validators.required],
      username:  ['', Validators.required],
      email:     ['', Validators.required],
      password:  ['', [Validators.required,]],
      confirm_password:  ['', [Validators.required]]
    });
    this.messages = [];
    
  }

  // convenience getter for easy access to form fields
  get controls() { return this.form.controls; }

  passwordErrors: string[] = [];

  onSubmit() {
    
    this.submitted = true;
    this.messages = [];
    this.messageService.clear();
    
    if (this.form.invalid) {
      return;
    }
    
    if(!this.IsPasswordValid()){
      return;
    }

    this.loading = true;

    this.accountService.register(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // this.router.navigate(['../login'], { relativeTo: this.route });
          this.messageService.add(
            { severity: 'success', summary: 'Success', detail: 'You signed up successfully',  sticky: true }
            );
            this.form.reset()
          },
        error: error => {
          this.messageService.add(
            { severity: 'error', summary: 'Error', detail: error },
          )
          this.loading = false;
        }
      });
      this.submitted = false;
  }

  IsPasswordValid(): boolean {
    
    const password = this.controls['password'].value;
    const confirmPassword = this.controls['confirm_password'].value;
  
    const hasNumber = /\d/.test(password);
    if (!hasNumber) {
      this.messages = [...this.messages, 
        { severity: 'error', summary: 'Error', detail: "Password must have at least one number." ,  sticky: true },
      ]
    }
  
    const hasLetter = /[a-zA-Z]/.test(password);
    if (!hasLetter) {
      this.messages = [...this.messages, 
        { severity: 'error', summary: 'Error', detail: "Password must have at least one letter.",  sticky: true },
      ]
    }
  
    if (password.length < 6) {
      this.messages = [...this.messages, 
        { severity: 'error', summary: 'Error', detail: "Password length can't be less than 6 characters.",  sticky: true },
      ]
    }
  
    if (confirmPassword !== '' && password !== confirmPassword) {
      this.messages = [...this.messages, 
        { severity: 'error', summary: 'Error', detail: "Password does not match.",  sticky: true },
      ]
    }
    
    this.messageService.addAll(this.messages);
    
    return this.messages.length === 0;
  }
      
}