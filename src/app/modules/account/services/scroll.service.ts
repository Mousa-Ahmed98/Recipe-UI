import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface scrollingEvent{
    directionX: number,
    directionY: number,
}

// basically the y direction -1 is for scrolling up and 1 for scrolling down
@Injectable({
    providedIn: 'root'
  })
export class ScrollingService  { 
  private scrolling = new BehaviorSubject<scrollingEvent>({directionX: 0, directionY: 0});
  $scrolling = this.scrolling.asObservable();
  
  setScrollEvent(x: number, y: number ){
    this.scrolling.next({directionX : x, directionY: y});
  }
}