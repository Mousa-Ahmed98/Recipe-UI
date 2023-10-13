import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Plan } from 'src/app/models/plan.model';

@Injectable({
  providedIn: 'root'
})
export class PlansSharedService {
  private eventsSubject: BehaviorSubject<Plan[]> = new BehaviorSubject<Plan[]>([]);
  public plans$ = this.eventsSubject.asObservable();

  constructor() { }

  updatePlans(events: Plan[]): void {
    this.eventsSubject.next(events);
  }
}