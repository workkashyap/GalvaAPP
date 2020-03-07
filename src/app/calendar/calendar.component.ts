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
import { Itemwiserej } from '../shared/dailyProduction/itemwiserej.model';
import { Plant } from '../shared/plant/plant.model';
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
  cols: any[];
  editcols: any[];
  actions: any[];
  selectedItemrej: Itemwiserej;
  public selectedtype: string;
  typename: any;
  public selectedcode: string;
  public selected_plantname: string;
  public selected_eventdate: any;
  public rejectvsum: any;
  public inspectionvsum: any;
  calendarPlugins = [dayGridPlugin];
  @ViewChild('calendar', { static: false })
  calendarComponent: FullCalendarComponent;
  calendarApi: any;
  options: any;
  monthNames: any;
  public startdate: string;
  public rejectdata: any;
  public loading = false;
  public currentUser: User;
  constructor(
    public plantservice: PlantService,
    public dpservice: DailyproductionService,
    public datePipe: DatePipe,
    public lservice: LoginService,
  ) {
    this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
      'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];

    this.typename = "PLATING";
    this.lservice.currentUser.subscribe(x => this.currentUser = x);
  }
  ngOnInit() {
    const me = this;

    this.rejless15 = 0;
    this.rejgreater15 = 0;
    this.options = {
      editable: true,
      aspectRatio: 3.5,
      header: {
        left: '',
        center: 'title',
        right: ''//'dayGridMonth,dayGridWeek',
        
      },
      plugins: [dayGridPlugin],
    };
    this.cols = [
      //{ field: 'id', header: 'ID' },
      //{ field: 'pstngdate', header: 'Posting Date' },
      { field: 'item_type', header: 'Type' },
      { field: 'itemcode', header: 'Code' },
      { field: 'itemname', header: 'Name' },
      { field: 'reject_qty', header: 'Reject qty' },
      { field: 'rejper', header: 'Rej %' },
      { field: 'reject_value', header: 'Reject Value' },
      { field: 'inspection_value', header: 'Insp. Value' },

    ];
    this.startdate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.loading = true;
    this.plantservice
        .sgetPlantData(me.currentUser.id)
        .toPromise()
        .then(res => {
          me.plantservice.splantlist = res as Plant[];
          me.selectedcode = me.plantservice.splantlist[0].plantcode;
          me.selected_plantname = me.plantservice.splantlist[0].plantshortname;
          me.loading = false;
          if (res) {
            me.dpservice
              .getRejectcalendar(me.selectedcode, me.startdate)
              .toPromise()
              .then(res => {
                me.dpservice.dailyprodlist = res as Dailyproduction[];
                me.loading = false;
                me.loadchart1();
              });
          }
          //

          //
        });
    /*this.loading = true;
    this.dpservice
      .getRejectcalendar(this.selectedcode, this.startdate)
      .toPromise()
      .then(res => {
        this.dpservice.dailyprodlist = res as Dailyproduction[];
        this.loading = false;
        me.loadchart1();
      });*/
    // this.selectedcode = 1010;
    // this.plantservice.getPlantData(this.currentUser.id);
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

    $('#basicExampleModal').modal('show');
    this.selected_eventdate = this.datePipe.transform(model.event.start, 'yyyy-MM-dd');
    console.log(this.selected_eventdate);
    this.loading = true;
    this.selectedtype = 'NULL';
    this.dpservice.getRejectdetail(this.selectedcode, this.selectedtype, this.selected_eventdate, this.selected_eventdate)
      .toPromise()
      .then(res => {
        this.dpservice.itemwiserejlist = res as Itemwiserej[];
        this.loading = false;
      });
  }
  loaddata() {
    const me = this;
    this.dpservice
      .getRejectcalendar(this.selectedcode, this.startdate)
      .toPromise()
      .then(res => {
        this.dpservice.dailyprodlist = res as Dailyproduction[];
        this.countRejrecord();
        me.loadchart1();
        this.loading = false;
      });
  }
  loadchart1() {
    const month = new Date(this.startdate).getMonth();
    const monthName = this.monthNames[month];
    this.dpservice.getprochartsummary(this.selectedcode, "M", monthName);


  }

  selectedGrid(ev) {
    this.selectedcode = ev;
    const me = this;
    this.selectedPlanName();

    this.dpservice
      .getRejectcalendar(ev, this.startdate)
      .toPromise()
      .then(res => {
        this.dpservice.dailyprodlist = res as Dailyproduction[];
        this.countRejrecord();
        me.loadchart1();
        this.loading = false;
      });

  }
  countRejrecord() {
    // this.rejless15 = 0;
    // this.rejgreater15 = 0;
    // for (const item of  this.dpservice.dailyprodlist) {
    //   if (item.title >= 15) {
    //       this.rejgreater15 = this.rejgreater15 + 1;
    //   }
    //   else {
    //       this.rejless15 = this.rejless15 + 1;
    //   }
    // }
  }
  rejectvaluesum() {
    this.rejectvsum = 0;

    for (const rq of this.dpservice.itemwiserejlist) {
      this.rejectvsum += rq.reject_value;
    }
    return this.rejectvsum;
  }
  inspqtysum() {
    this.inspectionvsum = 0;

    for (const rq of this.dpservice.itemwiserejlist) {
      this.inspectionvsum += rq.inspection_value;
    }
    return this.inspectionvsum;
  }
  selectedPlanName() {
    const me = this;
    if (this.plantservice && this.plantservice.splantlist && me.selectedcode) {
      this.plantservice.splantlist.forEach(function (element, i) {
        if (element.plantcode == me.selectedcode) {
          me.selected_plantname = element.plantshortname;
        }
      });
    }
    // return this.selected_plantname;
  }
}
