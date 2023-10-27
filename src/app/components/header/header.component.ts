import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';

import { Notification, NotificationType } from '../../models/notification.model';
import { AuthenticationService } from 'src/app/modules/core/services/auth.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './header.component.css'
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  notifications: Notification[] = [];
  notificationsOpen = false;
  notificationsPageNumber = 1;
  numOfNewNotifications = 0;
  totalNotificationCount = 0;
  searchQuery = '';
  showFiller = false;
  isLoggedIn: boolean = false;
  logout = ()=> this.authService.logout();

  constructor(
    private authService: AuthenticationService,
    private notificationsService: NotificationsService,
    private router: Router
  ) { }

  // event listener to close the notification if user pressed anywhere on the screen
  closeNotifications = (event: any) => {
    const btn = document.getElementById('notification-open-btn')!; 
    const notifications = document.getElementById('notifications')!; 
    // if the click not on the open button or the notifications itself
    if(!notifications) return;
    if(!btn.contains(event.target as Node) && !notifications.contains(event.target as Node) ){
      this.notificationsOpen = false;
    }
  }

  ngOnInit(): void {
    this.authService.user.subscribe(val => {
      this.isLoggedIn = val !== null;
    })

    if(this.isLoggedIn){
      this.loadMoreNotifications();
    }
    document.addEventListener('click', this.closeNotifications);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.closeNotifications);
  }
  
  goToSearch(){
    this.router.navigate(['recipes/search'],
      { queryParams: { q : this.searchQuery } }
    );
  }

  // soon :: realtime with signalR 
  loadMoreNotifications(){
    this.notificationsService.getNotifications(this.notificationsPageNumber, 9).subscribe(
      res => {
        this.notifications.push(...res.items);
        this.notificationsPageNumber++;
        this.totalNotificationCount = res.totalCount;
        this.numOfNewNotifications = this.notifications.filter(item => !item.read).length;
      }
    );
  }

  toggleNotification(){
    this.notificationsOpen = !this.notificationsOpen;
    if(this.numOfNewNotifications > 0){ // if notifications not read already
      this.notificationsService.readNotifications().subscribe(res =>{
        this.numOfNewNotifications = 0;
      })
    }
  }

  navigateToRecipe(recipeId: number){
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
      case NotificationType.NewPost: // TODO :: add real user avatar when its done
        return '/assets/images/profile/user-1.jpg';
      default:
        return '';
    }
  }
}
