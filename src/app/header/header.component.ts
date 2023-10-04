import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../services/auth.service';
import { User } from '../models/user.model';
import { Notification, NotificationType } from '../models/notification.model';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './header.component.css'
  ]
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
  notifications: Notification[] = [];
  isLoggedIn = () => this.user !== null;
  notificationsOpen = false;
  notificationsPageNumber = 1;
  numOfNewNotifications = 0;
  totalCount = 0;

  constructor(
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private accountService: AccountService,
    private router: Router
  ) {
    
    this.authService.user.subscribe(x => this.user = x);
    if(this.isLoggedIn()){
      this.loadMoreNotifications();
    }

    // event listener to close the notification if user pressed anywhere on the screen
    document.addEventListener('click', (event) => {
      const btn = document.getElementById('notification-open-btn')!; 
      const notifications = document.getElementById('notifications')!; 
      // if the click not on the open button or the notifications itself
      if(!notifications) return;
      if(!btn.contains(event.target as Node) && !notifications.contains(event.target as Node) ){
        this.notificationsOpen = false;
      }
    });
  }

  loadMoreNotifications(){
    this.accountService.getNotifications(this.notificationsPageNumber, 9).subscribe(
      res => {
        this.notifications.push(...res.items);
        this.notificationsPageNumber++;
        this.totalCount = res.totalCount;
        this.numOfNewNotifications = this.notifications.filter(item => !item.read).length;
      }
    );
  }

  toggleNotification(){
    this.notificationsOpen = !this.notificationsOpen;
    if(this.numOfNewNotifications > 0){ // if notifications not read already
      this.accountService.readNotifications().subscribe(res =>{
        this.numOfNewNotifications = 0;
      })
    }
  }

  navigate(recipeId: number){
    this.notificationsOpen = !this.notificationsOpen;
    this.router.navigate(["/recipes", recipeId]);
  }

  getNotificationDescription(type: NotificationType): string {
    switch (type) {
      case NotificationType.Comment:
        return 'You have a new comment on your recipe';
      case NotificationType.Rating:
        return 'Congratulations! Your recipe has been rated';
      case NotificationType.PlanReminder:
        return "Don't forget to plan tomorrow's recipe";
      case NotificationType.NewPost:
        return "Check out new Recipe Post";
      default:
        return '';
    }
  }

  getNotificationTitle(type: NotificationType): string {
    switch (type) {
      case NotificationType.Comment:
        return 'New Recipe Comment';
      case NotificationType.Rating:
        return 'Recipe Rating Received';
      case NotificationType.PlanReminder:
        return "Tomorrow's Recipe Reminder";
      case NotificationType.NewPost:
        return "New Recipe Post";
      default:
        return '';
    }
  }

  getIconSrc(type: NotificationType): string {
    switch (type) {
      case NotificationType.Comment:
        return '/assets/images/icons/comment-icon.png';
      case NotificationType.Rating:
        return '/assets/images/icons/rating-icon.png';
      case NotificationType.PlanReminder:
        return '/assets/images/icons/plan-icon.png';
      case NotificationType.NewPost:
        return '/assets/images/profile/user-1.jpg';
      default:
        return '';
    }
  }
}
