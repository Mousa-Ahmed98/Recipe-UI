import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LayoutComponent } from './layout/layout.component';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AccountService } from '../services/account.service';

// prime ng
// import { CardModule } from 'primeng/card';
// import {InputTextModule} from 'primeng/inputtext';
// import { ButtonModule } from 'primeng/button';

import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LayoutComponent,
  ],
  imports: [
    // CardModule,
    // InputTextModule,
    // ButtonModule,
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,

    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),

  ],
  providers: [
    AccountService,
  ]
})
export class AuthenticationModule { }
