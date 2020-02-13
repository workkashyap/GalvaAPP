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
  calendarPlugins = [dayGridPlugin];
  @ViewChild("calendar", { static: false })
  calendarComponent: FullCalendarComponent;
  calendarApi: any;
  options: any;

  public startdate: string;
  public rejectdata: any;
  constructor(
    public plantservice: PlantService,
    public dpservice: DailyproductionService,
    public datePipe: DatePipe
  ) {
    this.dpservice.getDailyPReject(1010);
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
    // this.rejectdata = [
    //   {
    //     title: val[0].title,
    //     date: "2020-02-08",
    //     backgroundColor: "#da532c",
    //     borderColor: "#da532c"
    //   }
    // ];
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
  }
}
