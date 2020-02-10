import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarPlugins = [dayGridPlugin]; // important!
  public rejectdata: any = [
    { title: 'event 1', date: '2020-02-08' },
    { title: 'event 2', date: '2020-02-09' },
  ];
  constructor() { }

  ngOnInit() {
  }

}
