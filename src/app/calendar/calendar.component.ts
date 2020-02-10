<<<<<<< HEAD
import { Component, OnInit, ViewChild  } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [DatePipe]
=======
import { Component, OnInit, ViewChild } from "@angular/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { PlantService } from "../shared/plant/plant.service";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.css"]
>>>>>>> 137d00bd2a404879be33f5e60e11f8f50aa55d22
})
export class CalendarComponent implements OnInit {
  calendarPlugins = [dayGridPlugin];
  @ViewChild("calendar", { static: false })
  calendarComponent: FullCalendarComponent;
  calendarApi: any;
  options: any;
  cdate: Date;
  public startdate: string;
  public datePipe: DatePipe;
  public rejectdata: any = [
    { title: 'event 1', date: '2020-02-08', backgroundColor: '#da532c', borderColor: '#da532c'},
    { title: 'event 2', date: '2020-02-09' },
  ];
  constructor(public plantservice: PlantService) {
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
    // this.startdate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }
  
  Next() {
    this.calendarApi = this.calendarComponent.getApi();
    this.calendarApi.next();
    this.cdate = this.calendarApi.getDate();
    // this.startdate = this.datePipe.transform(this.cdate, 'yyyy-MM-dd');
    console.log(this.startdate);
  }
  Previous() {
    this.calendarApi = this.calendarComponent.getApi();
    this.calendarApi.prev();
  }
}
