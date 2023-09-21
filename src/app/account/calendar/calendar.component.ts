import { Component, signal, ChangeDetectorRef } from '@angular/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { PlansService } from 'src/app/services/plans.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  calendarVisible = signal(true);
  calendarOptions: any;
  initialCalendarOptions = signal<any>({
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    initialEvents: [], // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    events: [],
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventChange: this.handleEventChange.bind(this),
    eventRemove: this.handleEventRemove.bind(this),
  });
  currentEvents = signal<any[]>([]);

  constructor(
    private changeDetector: ChangeDetectorRef,
    private planService: PlansService
  ) {
    planService.GetAllPlans().subscribe((res) => {
      res.forEach((plan) => {
        this.initialCalendarOptions.mutate((value) => {
          value.events.push({
            id: plan.id,
            title: plan.recipe.name,
            start: plan.day.split('T')[0],
          });
        });
      });
      this.calendarOptions = this.initialCalendarOptions;
    });
  }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.initialCalendarOptions.mutate((options) => {
      options.weekends = !options.weekends;
    });
  }

  handleDateSelect(selectInfo: any) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      const newEvent = {
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };

      calendarApi.addEvent(newEvent);

      // TODO :: Save the new event to the database
    }
  }

  handleEventClick(clickInfo: any) {
    if (confirm(`Are you sure you want to delete this plan? '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();

      this.planService.RemovePlan(clickInfo.event.id).subscribe((res) => {
      });
    }
  }

  handleEvents(events: any[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges();
  }

  handleEventChange(changeInfo: any) {
    const updatedEvent = {
      id: changeInfo.event.id,
      title: changeInfo.event.title,
      start: changeInfo.event.startStr,
      end: changeInfo.event.endStr,
    };
    this.planService.changePlanDate(updatedEvent.id, updatedEvent.start)
    .subscribe((res) => { 
      // show message .. 
    });
  }

  handleEventRemove(removeInfo: any) {
    this.planService.RemovePlan(removeInfo.event.id).subscribe((res) => {
    });
  }
}