import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Components
import { LoginComponent } from './components/login/login.component'; 
import { RegisterComponent } from './components/register/register.component';
import { LayoutComponent } from './components/layout/layout.component';

import { AuthenticationRoutingModule } from './authentication-routing.module';

// Material stuff
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    SharedModule,
    AuthenticationRoutingModule,
    MatCheckboxModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
  ]
})
export class AuthenticationModule { }
