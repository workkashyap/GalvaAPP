import { Component, OnInit, ViewChild } from "@angular/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { PlantService } from "../shared/plant/plant.service";
import { DatePipe } from "@angular/common";
import { DailyproductionService } from "../shared/dailyProduction/dailyproduction.service";
import { Dailyproduction } from "../shared/dailyProduction/dailyproduction.model";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.css"],
  providers: [DatePipe]
})
export class CalendarComponent implements OnInit {
  public cDate: string;
  public sDate: Date;
  public dailyprodlist: Dailyproduction[] = [];
  public title: string;
  public selectedcode: number;
  calendarPlugins = [dayGridPlugin];
  @ViewChild("calendar", { static: false })
  calendarComponent: FullCalendarComponent;
  calendarApi: any;
  options: any;

  public startdate: string;
  public rejectdata: any;
  public loading = false;
  constructor(
    public plantservice: PlantService,
    public dpservice: DailyproductionService,
    public datePipe: DatePipe
  ) {
    this.options = {
      editable: true,
      header: {
        left: "",
        center: "title",
        right: ""
      },
      plugins: [dayGridPlugin]
    };
  }

  ngOnInit() {
   
    this.startdate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.loading = true;
    this.dpservice.getRejectcalendar(1010, this.startdate)
    .toPromise()
     .then(res => {
      this.dpservice.dailyprodlist = res as Dailyproduction[];
      this.loading = false;
    });
    this.selectedcode = 1010;
    this.plantservice.getPlantData();
  }

  Next() {
    this.calendarApi = this.calendarComponent.getApi();
    this.calendarApi.next();
    this.sDate = this.calendarApi.getDate();
    this.startdate = this.datePipe.transform(this.sDate, "yyyy-MM-dd");
  }
  Previous() {
    this.calendarApi = this.calendarComponent.getApi();
    this.calendarApi.prev();
    this.sDate = this.calendarApi.getDate();
    this.startdate = this.datePipe.transform(this.sDate, "yyyy-MM-dd");
  }

  loaddata() {
    this.dpservice.getRejectcalendar(this.selectedcode, this.startdate)
    .toPromise()
     .then(res => {
      this.dpservice.dailyprodlist = res as Dailyproduction[];
      this.loading = false;
    });
  }
  selectedGrid(ev) {
    this.selectedcode = ev;
    this.dpservice.getRejectcalendar(ev, this.startdate)
    .toPromise()
     .then(res => {
      this.dpservice.dailyprodlist = res as Dailyproduction[];
      this.loading = false;
    });
  }
}
