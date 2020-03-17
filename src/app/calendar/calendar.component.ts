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
  public lDate: Date;
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
  company_per: any;
  public selected_eventdate: any;

  public rejectvsum: any;
  public rejectQtysum: any;

  buffingvalueSum: any;
  buffingQtySum: any;

  holdvalueSum: any;
  holdQtySum: any;

  okvalueSum: any;
  okQtySum: any;

  rejperPerSum: any;

  public inspectionvsum: any;
  public inspectionQtysum: any;

  btnLabel: any;
  monthName: any;
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
      contentHeight: '500px',

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
      { field: 'holdvalue', header: 'Hold Value' },
      { field: 'buffingvalue', header: 'Buff. Value' }
    ];
    this.startdate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    var date = new Date();

    this.sDate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.lDate = new Date(me.sDate.getFullYear(), me.sDate.getMonth() + 1, 0);
    this.loading = true;
    this.plantservice
      .sgetPlantData(me.currentUser.id)
      .toPromise()
      .then(res => {
        me.plantservice.splantlist = res as Plant[];
        me.selectedcode = me.plantservice.splantlist[0].plantcode;
        if (me.selectedcode == "1010") {
          me.company_per = "85%";
        } else {
          me.company_per = "87%";
        }
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
    this.lDate = new Date(this.sDate.getFullYear(), this.sDate.getMonth() + 1, 0);
  }
  Previous() {
    this.calendarApi = this.calendarComponent.getApi();
    this.calendarApi.prev();
    this.sDate = this.calendarApi.getDate();
    this.startdate = this.datePipe.transform(this.sDate, 'yyyy-MM-dd');
    this.lDate = new Date(this.sDate.getFullYear(), this.sDate.getMonth() + 1, 0);
  }
  dateClick(model) {
    console.log(model.date);
  }
  eventClick(model) {
    this.cols = [
      { field: 'item_type', header: 'Type' },
      { field: 'itemcode', header: 'Code' },
      { field: 'itemname', header: 'Name' },
      { field: 'reject_qty', header: 'Reject qty' },
      { field: 'rejper', header: 'Rej %' },
      { field: 'reject_value', header: 'Reject Value' },
      { field: 'inspection_value', header: 'Insp. Value' },
      { field: 'holdvalue', header: 'Hold Value' },
      { field: 'buffingvalue', header: 'Buff. Value' }
    ];
    this.btnLabel = ''; this.monthName = '';
    $('#basicExampleModal').modal('show');
    this.selected_eventdate = this.datePipe.transform(model.event.start, 'yyyy-MM-dd');
    this.loading = true;
    this.selectedtype = 'NULL';
    this.dpservice.getRejectdetail(this.selectedcode, 'NULL', this.selected_eventdate, this.selected_eventdate)
      .toPromise()
      .then(res => {
        this.dpservice.itemwiserejlist = res as Itemwiserej[];
        this.sumAllData();
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
    if (me.selectedcode == "1010") {
      me.company_per = "85%";
    } else {
      me.company_per = "87%";
    }
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
  extraVal(val) {
    this.cols = [
      { field: 'item_type', header: 'Type' },
      { field: 'itemcode', header: 'Code' },
      { field: 'itemname', header: 'Name' },
      /*{ field: 'reject_qty', header: 'Reject qty' },
      { field: 'rejper', header: 'Rej %' },
      { field: 'reject_value', header: 'Reject Value' },
      { field: 'inspection_value', header: 'Insp. Value' },*/
    ];
    if (val == 1) {
      this.cols.push({ field: 'inspection_qty', header: 'Insp. Qty' });
      this.cols.push({ field: 'inspection_value', header: 'Insp. Value' });
    } else if (val == 2) {
      this.cols.push({ field: 'okqty', header: 'Ok Qty' });
      this.cols.push({ field: 'okvalue', header: 'Ok Value' });
    } else if (val == 3) {
      this.cols.push({ field: 'holdqty', header: 'Hold Qty' });
      this.cols.push({ field: 'holdvalue', header: 'Hold Value' })
    } else if (val == 4) {
      this.cols.push({ field: 'buffingqty', header: 'Buff. Qty' });
      this.cols.push({ field: 'buffingvalue', header: 'Buff. Value' })
    } else if (val == 5) {
      this.cols.push({ field: 'reject_qty', header: 'Rej. Qty' })
      this.cols.push({ field: 'reject_value', header: 'Rej. Value' });
    } else if (val == 6) {
      this.cols.push({ field: 'rejper', header: 'Rej. %' })
    } else {
      return;
    }
    this.btnLabel = val;
    this.monthName = this.datePipe.transform(this.sDate, 'yyyy-MM-d');
    $('#basicExampleModal').modal('show');
    const firstDate = this.datePipe.transform(this.sDate, 'yyyy-MM-dd');
    const endDate = this.datePipe.transform(this.lDate, 'yyyy-MM-dd');
    this.loading = true;
    this.selectedtype = 'NULL';
    this.dpservice.getRejectdetail(this.selectedcode, 'NULL', firstDate, endDate)
      .toPromise()
      .then(res => {
        this.dpservice.itemwiserejlist = res as Itemwiserej[];
        this.sumAllData();
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
  sumAllData() {
    this.rejectvsum = 0;
    this.rejectQtysum = 0;

    this.inspectionvsum = 0;
    this.inspectionQtysum = 0;

    this.holdvalueSum = 0;
    this.holdQtySum = 0;

    this.buffingvalueSum = 0;
    this.buffingQtySum = 0;

    this.okvalueSum = 0;
    this.okQtySum = 0;

    this.rejperPerSum = 0;

    for (const rq of this.dpservice.itemwiserejlist) {
      this.rejectvsum += rq.reject_value;
      this.rejectQtysum += rq.reject_qty;

      this.inspectionvsum += rq.inspection_value;
      this.inspectionQtysum += rq.inspection_qty;

      this.holdvalueSum += rq.holdvalue;
      this.holdQtySum += rq.holdqty;

      this.buffingvalueSum += rq.buffingvalue;
      this.buffingQtySum += rq.buffingqty;

      this.okvalueSum += rq.okvalue;
      this.okQtySum += rq.okqty;

      this.rejperPerSum += rq.rejper;
    }
  }
  /*rejectvaluesum() {
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
  holdVsum() {
    this.holdvalueSum = 0;

    for (const rq of this.dpservice.itemwiserejlist) {
      this.holdvalueSum += rq.holdvalue;
    }
    return this.holdvalueSum;
  }
  buffVsum() {
    this.buffingvalueSum = 0;

    for (const rq of this.dpservice.itemwiserejlist) {
      this.buffingvalueSum += rq.buffingvalue;
    }
    return this.buffingvalueSum;
  }

  okVsum() {
    this.okvalueSum = 0;

    for (const rq of this.dpservice.itemwiserejlist) {
      this.okvalueSum += rq.okvalue;
    }
    return this.okvalueSum;
  }
  rejperVsum() {
    this.rejperPerSum = 0;

    for (const rq of this.dpservice.itemwiserejlist) {
      this.rejperPerSum += rq.rejper;
    }
    return this.rejperPerSum;
  }*/
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
