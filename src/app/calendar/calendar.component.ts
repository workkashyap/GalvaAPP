import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { PlantService } from '../shared/plant/plant.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [DatePipe]
})
export class CalendarComponent implements OnInit {
  public cDate: string;
  public sDate: Date;
  
  calendarPlugins = [dayGridPlugin];
  @ViewChild('calendar', { static: false })
  calendarComponent: FullCalendarComponent;
  calendarApi: any;
  options: any;
 
  public startdate: string;
  public rejectdata: any = [
    { title: 'event 1', date: '2020-02-08', backgroundColor: '#da532c', borderColor: '#da532c'},
    { title: 'event 2', date: '2020-02-09' },
  ];
  constructor(public plantservice: PlantService,  public datePipe: DatePipe) {
    this.options = {
      editable: true,
      header: {
        left:   'title',
        center: '',
        right:  ''
    },
      plugins: [dayGridPlugin],
    };
  }

  ngOnInit() {
   }
  
  Next() {
    this.calendarApi = this.calendarComponent.getApi();
    this.calendarApi.next();
    this.sDate = this.calendarApi.getDate();
    this.startdate = this.datePipe.transform(this.sDate, 'yyyy-MM-dd');
    
   }
  Previous() {
    this.calendarApi = this.calendarComponent.getApi();
    this.calendarApi.prev();
  }
}
