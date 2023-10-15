import { Component } from '@angular/core';
import { AppUser } from 'src/app/modules/authentication/models/appUser.model';
import { AuthenticationService } from 'src/app/modules/core/services/auth.service';
import { UserService } from 'src/app/modules/users/services/user.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent {
  user: AppUser;

  constructor(
    private accountService: AuthenticationService,
    private userService: UserService,
  ) {
    const username = this.accountService.userValue?.userName;
    if(username !== undefined){
      this.userService.GetUser(username).subscribe(res => {
        this.user = res;
      })
    }
  }

}
