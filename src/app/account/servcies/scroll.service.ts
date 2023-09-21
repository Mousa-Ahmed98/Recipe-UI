import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface scrollingEvent{
    directionX: number,
    directionY: number,
}

@Injectable({
    providedIn: 'root'
  })
export class ScrollingService  { 
  private scrolling = new BehaviorSubject<scrollingEvent>({directionX:0, directionY: 0});
  $scrolling = this.scrolling.asObservable();
  
  setScrollEvent(x: number, y: number ){
    this.scrolling.next({directionX : x, directionY: y});
  }
}