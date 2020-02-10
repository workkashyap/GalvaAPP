import { Component, OnInit, ViewChild  } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  
  calendarPlugins = [dayGridPlugin];
  @ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent;
  calendarApi: any;
  options: any;
  public rejectdata: any = [
    { title: 'event 1', date: '2020-02-08' },
    { title: 'event 2', date: '2020-02-09' },
  ];
  constructor() { 
    this.options = {
      editable: true,
      header: {
        left:   'title',
        center: '',
        right:  'today'
    },
      plugins: [dayGridPlugin],
    };
  }

  ngOnInit() {
  }
  handleDateClick(arg) { // handler method
    alert(arg.dateStr);
  }
  Next() {
    this.calendarApi = this.calendarComponent.getApi();
    this.calendarApi.next();
  }
  Previous() {
    this.calendarApi = this.calendarComponent.getApi();
    this.calendarApi.prev();
  }
}
