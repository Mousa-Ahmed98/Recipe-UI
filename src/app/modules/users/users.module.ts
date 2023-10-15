import { NgModule } from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    SharedModule,
    UserRoutingModule,
  ],
  exports:[
  ]
})
export class UsersModule { }
