import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() logout: () => void;
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;
  user?: User | null;
  isLoggedIn = () => this.user !== null;
  
  constructor(
    public dialog: MatDialog,
    private accountService: AccountService,
  ) {
    this.accountService.user.subscribe(x => this.user = x);
  }
}
