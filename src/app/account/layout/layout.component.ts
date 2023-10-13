import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ScrollingService } from '../servcies/scroll.service';

const MOBILE_VIEW = 'screen and (max-width: 768px)';
const TABLET_VIEW = 'screen and (min-width: 769px) and (max-width: 1024px)';
const MONITOR_VIEW = 'screen and (min-width: 1024px)';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: [
    './layout.component.scss',

  ]
})
export class LayoutComponent {
  @ViewChild('leftsidenav')
  public sidenav: MatSidenav;
  previousScrollPosition = 0;

  //get options from service
  private layoutChangesSubscription = Subscription.EMPTY;
  isMobileScreen = false;
  private isContentWidthFixed = true;
  private isCollapsedWidthFixed = false;
  private htmlElement!: HTMLHtmlElement;
  
  get isOver(): boolean {
    return this.isMobileScreen;
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private scrollingService: ScrollingService
    ) { }

  ngOnInit(): void {
    this.htmlElement = document.querySelector('html')!;
    this.layoutChangesSubscription = this.breakpointObserver
      .observe([MOBILE_VIEW, TABLET_VIEW, MONITOR_VIEW])
      .subscribe((state) => {
        // SidenavOpened must be reset true when layout changes
        this.isMobileScreen = state.breakpoints[MOBILE_VIEW];
        this.isContentWidthFixed = state.breakpoints[MONITOR_VIEW];
      });
  }

  ngOnDestroy() {
    this.layoutChangesSubscription.unsubscribe();
  }

  toggleCollapsed() {
    this.isContentWidthFixed = false;
  }

  onSidenavClosedStart() {
    this.isContentWidthFixed = false;
  }

  onSidenavOpenedChange(isOpened: boolean) {
    this.isCollapsedWidthFixed = !this.isOver;
  }

  onScroll(event: any) {
    const currentScrollPosition = event.target.scrollTop;
    const maxScrollPosition = event.target.scrollHeight - event.target.clientHeight;
  
    if (currentScrollPosition >= maxScrollPosition) {
      this.scrollingService.setScrollEvent(0, 1);
    }
  
    this.previousScrollPosition = currentScrollPosition;    
  }
}
