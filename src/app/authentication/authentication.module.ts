import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

// Components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LayoutComponent } from './layout/layout.component';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationService } from '../services/auth.service';

// Prime ng
import { ToastModule } from 'primeng/toast';
import { MessageService, PrimeIcons } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import {MessageModule} from 'primeng/message';

// Material stuff
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 

import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LayoutComponent,
  ],
  imports: [
    ToastModule,
    CommonModule,
    AuthenticationRoutingModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule, 
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    BrowserAnimationsModule,
    BrowserModule,
    MessagesModule,
    MessageModule,
  ],
  providers: [
    AuthenticationService,
    MessageService
  ]
})
export class AuthenticationModule { }
