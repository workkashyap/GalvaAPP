import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { PlantService } from '../shared/plant/plant.service';
import { DatePipe } from '@angular/common';
import { DailyproductionService } from '../shared/dailyProduction/dailyproduction.service';
import { Dailyproduction } from '../shared/dailyProduction/dailyproduction.model';
import * as bootstrap from 'bootstrap';
import * as $AB from 'jquery';
import { LoginService } from '../shared/login/login.service';
import { User } from '../shared/login/User.model';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [DatePipe]
})
export class CalendarComponent implements OnInit {
  public cDate: string;
  public sDate: Date;
  public dailyprodlist: Dailyproduction[] = [];
  public title: string;
  public rejless15: number;
  public rejgreater15: number;
  
  public selectedcode: number;
  calendarPlugins = [dayGridPlugin];
  @ViewChild('calendar', { static: false })
  calendarComponent: FullCalendarComponent;
  calendarApi: any;
  options: any;

  public startdate: string;
  public rejectdata: any;
  public loading = false;
  public currentUser: User;
  constructor(
    public plantservice: PlantService,
    public dpservice: DailyproductionService,
    public datePipe: DatePipe,
    public lservice: LoginService
  ) {
    this.lservice.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.rejless15 = 0;
    this.rejgreater15 = 0;
    this.options = {
      editable: true,
      header: {
        left: '',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek'
      },
      
      plugins: [dayGridPlugin],
      
    };
    this.startdate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.loading = true;
    this.dpservice
      .getRejectcalendar(1010, this.startdate)
      .toPromise()
      .then(res => {
        this.dpservice.dailyprodlist = res as Dailyproduction[];
        this.loading = false;
      });
    this.selectedcode = 1010;
    this.plantservice.getPlantData(this.currentUser.id);
    this.countRejrecord();
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
    this.sDate = this.calendarApi.getDate();
    this.startdate = this.datePipe.transform(this.sDate, 'yyyy-MM-dd');
  }
  dateClick(model) {
    console.log(model.date);
  }
  eventClick(model) {
    // console.log(model);
    $('#basicExampleModal').modal('show');
    alert(model.event.title);
    const eventdate = this.datePipe.transform(model.event.start, 'dd/MM/yyyy');
    alert(eventdate);
  }
  loaddata() {
    this.dpservice
      .getRejectcalendar(this.selectedcode, this.startdate)
      .toPromise()
      .then(res => {
        this.dpservice.dailyprodlist = res as Dailyproduction[];
        this.countRejrecord();
        this.loading = false;
      });
  }
  selectedGrid(ev) {
    this.selectedcode = ev;
    this.dpservice
      .getRejectcalendar(ev, this.startdate)
      .toPromise()
      .then(res => {
        this.dpservice.dailyprodlist = res as Dailyproduction[];
        this.countRejrecord();
        this.loading = false;
      });
      
  }
  countRejrecord() {
    this.rejless15 = 0;
    this.rejgreater15 = 0;
    for (const item of  this.dpservice.dailyprodlist) {
      if (item.title >= 15) {
          this.rejgreater15 = this.rejgreater15 + 1;
      }
      else {
          this.rejless15 = this.rejless15 + 1;
      }
    }
  }
}
