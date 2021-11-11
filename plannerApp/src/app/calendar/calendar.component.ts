import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
  EventInput,
  EventContentArg,
  MountArg,
} from '@fullcalendar/angular';
import { Subscription, observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { CalendarService } from '../services/calendar.service';
import { ViewNoteComponent } from '../dialogs/view-note/view-note.component';
import { Note } from '../models/note';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  private currentEvents: EventApi[] = [];
  selectedDayEvents: EventApi[] = [];
  calendarVisible = true;
  private subscription?: Subscription;
  showWeekends  = true;

  // Calendar Options
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next,today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    weekends: this.showWeekends,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    timeZone: 'local',
    eventSources: [
      {
        events: this.calService.getNotesOfMonthAsEvents(11),
        color: 'yellow',
        textColor: 'black',
        borderColor: 'blue',
        // backgroundColor: 'yellow'
      },
      {
        events: [
          {
            title: '422 Meeting',
            start: '2021-11-06T21:26:48.703Z',
            end: '2021-11-06T08:00:00.000Z',
            id: '2',
            interactive: true,
          },
          {
            title: 'ASC',
            start: '2021-11-05T21:26:48.703Z',
            end: '2021-11-06T21:26:48.703Z',
            editable: true,
          },
        ],
        // backgroundColor: 'gray',
        color: 'lavendar',
        textColor: 'black',
        borderColor: 'green',
        editable: true,
      },
      {
        events: this.getEvents(),
        color: 'gray',
        textColor: 'white',
      },
      {
        events: this.calService.getToDosOfMonthAsEvents(11),
        color: 'green',
        borderColor: 'red',
      },
    ],
    select: this.handleDateSelect.bind(this),
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventDidMount: this.handleDidMountEvent.bind(this),
    eventDisplay: 'block',
    eventInteractive: true,
  };

  // Date Select
  handleDateSelect(selectInfo: DateSelectArg): void {
    const calendarApi = selectInfo.view.calendar;
    console.log(
      'Selected Date: All Day: ' +
        selectInfo.allDay +
        ' Start: ' +
        selectInfo.startStr +
        ' End: ' +
        selectInfo.endStr +
        ' View: ' +
        selectInfo.view.title +
        ', ' +
        selectInfo.view.type
    );
    calendarApi.unselect();
  }

  // Date Click
  handleDateClick(arg: any): void {
    alert('Date clicked: ' + arg.dateStr);
  }

  // Event Click
  handleEventClick(clickInfo: EventClickArg): void {
    const event = clickInfo.event;
    const extended = event.extendedProps.ofType;
    // console.log('Event clicked ID: ' + event.id + ' ofType: ' + extended);
    // alert('Event Clicked: ' + JSON.stringify(clickInfo.event.toJSON()));

    if (extended === this.calService.EVENT_TYPE_NOTE) {
      const fn = this.calService.getNote(event.id);
      if (fn.found && fn.note) {
        this.openDialog(fn.note);
      }
    } else if (extended === this.calService.EVENT_TYPE_TODO) {
      const ft = this.calService.getTodo(event.id);
      if (ft.found && ft.todo) {
        console.log('Todo to Display: ', ft.todo);
      }
    }
  }

  handleDidMountEvent(info: MountArg<EventContentArg>): void
  {
    // console.log('DisMount got FIRED...');
    /*var tooltip = new Tooltip(info.el, {
      title: info.event.extendedProps.description,
      placement: 'top',
      trigger: 'hover',
      container: 'body'
    });*/
  }

  handleWeekendsToggle(): void
  {
    this.showWeekends = !this.showWeekends;
    this.calendarOptions.weekends = this.showWeekends;

    return;
  }

  // EVENTS - handleEvents
  handleEvents(events: EventApi[]): void
  {
    // console.log('Handle EVENT Called');
    this.currentEvents = events;
    // console.log(this.currentEvents);

    this.getSelectedDaysEvents(new Date());

    // console.log(this.selectedDayEvents);
    this.cd.detectChanges();
  }

  // Gets/Sets events of specified date
  private getSelectedDaysEvents(date: Date): void {
    const dt = date.getDate();

    this.selectedDayEvents = [];

    this.currentEvents.forEach((event) => {
      if (event._instance) {
        if (event._instance?.range.start.getDate() === dt) {
          this.selectedDayEvents.push(event);
        } else if (
          event._instance.range.end.getDate() <= dt &&
          event._instance?.range.start.getDate() < dt
        ) {
          this.selectedDayEvents.push(event);
        }
      }
    });
  }

  openDialog(n: Note): void {
    const dlgConfig = new MatDialogConfig();
    dlgConfig.disableClose = true;
    dlgConfig.autoFocus = false;
    dlgConfig.role = 'dialog';
    dlgConfig.data = {
      note: n,
    };

    // Want to open from Top Left - Close Slide down
    // https://material.angularjs.org/1.1.2/demo/dialog

    const dlgRef = this.dialog.open(ViewNoteComponent, dlgConfig);
    dlgRef
      .afterClosed()
      .subscribe((data) => console.log('Dialog output: ', data));
  }

  constructor(private calService: CalendarService,
              private cd: ChangeDetectorRef,
              private dialog: MatDialog) { }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getEvents(): EventInput[] {
    const event: EventInput[] = [];
    event.push({
      title: 'Sp. Note 1',
      start: '2021-11-05T21:26:48.703Z',
      end: '2021-11-06T21:26:48.703Z',
    });
    event.push({
      title: 'Sp. Note 2',
      start: '2021-11-02T21:26:48.703Z',
      end: '2021-11-04T21:26:48.703Z',
      interactive: true,
    });
    event.push({
      title: 'Sp. Note 3',
      start: '2021-11-03T21:26:48.703Z',
      end: '2021-11-03T21:26:48.703Z',
    });

    return event;
  }
}
