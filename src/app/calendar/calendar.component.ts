import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { PlantService } from '../shared/plant/plant.service';
import { DatePipe } from '@angular/common';
import { DailyproductionService } from '../shared/dailyProduction/dailyproduction.service';
import { Dailyproduction } from '../shared/dailyProduction/dailyproduction.model';
import { CreateactionplanService } from "../shared/createactionplan/createactionplan.service";
import { Createactionplan } from "../shared/createactionplan/createactionplan.model";
import * as bootstrap from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
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
  noRecord: any;
  public rejectvsum: any;
  public rejectQtysum: any;

  buffingvalueSum: any;
  buffingQtySum: any;
  colspanAmount: any = 2;
  holdvalueSum: any;
  holdQtySum: any;

  okvalueSum: any;
  okQtySum: any;
  okperSum: any;

  rejperPerSum: any;
  rejperPerSum2: any;
  filterenable: boolean = false;

  selectedItemrejarray: Itemwiserej[] = [];
  filterItemrejarray: Itemwiserej[] = [];
  iv: number;
  rejper: number = 0;

  public inspectionvsum: any;
  public inspectionQtysum: any;
  allActionPlan: any;
  allActionPlanCol: any;
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
    public toastr: ToastrService,
    public datePipe: DatePipe, public apservice: CreateactionplanService,
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
      //{ field: 'item_type', header: 'Type' },
      { field: 'itemcode', header: 'Code' },
      { field: 'itemname', header: 'Name' },
      { field: 'reject_qty', header: 'Reject qty' },
      { field: 'rejper', header: 'Rej %' },
      { field: 'reject_value', header: 'Reject Value' },
      { field: 'inspection_value', header: 'Insp. Value' },
      { field: 'holdvalue', header: 'Hold Value' },
      { field: 'buffingvalue', header: 'Buff. Value' }
    ];
    this.allActionPlanCol = [];
    if (this.currentUser && this.currentUser.id == 14) {
      this.allActionPlanCol.push(
        { field: "edit", header: "Action", width: "100px" },
        { field: "edit_status", header: "Change Status", width: "200px" }
      );
    }

    this.allActionPlanCol.push(
      // { field: "id", header: "ID" },
      //  { field: "sHash", header: "S#", width: "50px" },
      { field: "department", header: "Department", width: "160px" },
      { field: "materialCode", header: "Material Code", width: "120px" },
      { field: "materialDescription", header: "Material Description", width: "160px" },
      { field: "project", header: "Project", width: "120px" },
      //{ field: "responsibility", header: "Responsibility", width: "90px" },
      { field: "targetdateofcompletion", header: "Target date of completion", width: "140px" },
      { field: "actualdateofcompletion", header: "Actual date of completion", width: "140px" },
      { field: "correctiveactiontaken", header: "Corrective action taken", width: "140px" },
      { field: "result", header: "Result", width: "200px" },
      { field: "progresspercent", header: "Progress", width: "120px" },
      { field: "approvedstatus", header: "Approved status", width: "100px" },
      { field: "responsibility", header: "Responsibility", width: "100px" },
      { field: "remarks2", header: " Remark 2", width: "140px" },
      { field: "attachment", header: "Attachment", width: "140px" }
    );

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
        console.log("splantlist", me.plantservice.splantlist);
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

  actionPlanReport(model) {
    const me = this;

    $('#actionPlanModal').modal('show');
    $('#actionPlanModal').css('padding', 'unset');
    this.loading = true;
    this.noRecord = '';
    this.monthName = this.datePipe.transform(this.sDate, 'yyyy-MM-d');
    const monthName = this.datePipe.transform(this.monthName, 'MMMM');
    this.apservice
      .getActionPlanReport(monthName, this.selectedcode)
      .toPromise()
      .then(res => {
        if (res && !res.length) {
          this.noRecord = "No record found";
        }
        me.allActionPlan = res as Createactionplan[];
        me.loading = false;
      });
  }
  dateClick(model) {
    console.log(model.date);
  }

  refreshList() {
    let me = this;
    this.monthName = this.datePipe.transform(this.sDate, 'yyyy-MM-d');
    this.noRecord = '';
    const monthName = this.datePipe.transform(this.monthName, 'MMMM');

    this.apservice
      .getActionPlanReport(monthName, this.selectedcode)
      .toPromise()
      .then(res => {
        me.allActionPlan = res as Createactionplan[];
      });
  }
  onRowEditSave(row: any, approvedstatus: any) {
    const me = this;
    row.currentDate = new Date();
    if (row.id) {
      if (approvedstatus) {
        row.approvedstatus = approvedstatus;
      }
      this.apservice.updateCreateactionplan(row).subscribe(
        res => {
          me.toastr.success('Updated Successfully', 'Save ActionPlan');
          me.refreshList();
        },
        err => {
          console.log(err);
        });
    } else {
      this.apservice.insertCreateactionplan(row).subscribe(
        res => {
          this.toastr.success('Submitted Successfully', 'Save ActionPlan');
          console.log('Saved successfully');
          this.refreshList();
        },
        err => {
          console.log(err);
        });
    }
  }
  onRowDelete(row: any) {

    this.apservice.deleteCreateactionplan(row).subscribe(
      res => {
        this.toastr.success('Deleted Successfully', 'Save ActionPlan');
        this.refreshList();
      },
      err => {
        console.log(err);
      });
  }
  eventClick(model) {
    this.dpservice.itemwiserejlist = []; this.filterItemrejarray = [];
    this.colspanAmount = 2;
    this.cols = [
      //{ field: 'item_type', header: 'Type' },
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
    this.rejper = 0;
    const month = new Date(this.startdate).getMonth();
    const monthName = this.monthNames[month];
    this.dpservice.dailyreportsummary = [];
    this.dpservice.getprochartsummary(this.selectedcode, "M", monthName, this.startdate).then((res: any) => {
      this.dpservice.dailyreportsummary.forEach(drsummary => {
        if (drsummary.itemtype == this.typename) {
          this.rejper = drsummary.rejper;
        }
      });
    });
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
  loadper(ev, dt) {
    this.filterenable = true;
    this.selectedItemrejarray = dt.value;
    this.iv = 0;
    this.filterItemrejarray = [];
    // console.log(this.selectedItemrejarray[0].id);
    for (const c of this.selectedItemrejarray) {
      if (c.item_type.toString().includes(ev.toString()) || c.itemcode.toString().includes(ev.toString())
        || c.itemname.toString().includes(ev.toString()) || c.inspection_qty.toString().includes(ev.toString()
          || c.plant.toString().includes(ev.toString()) || c.id.toString().includes(ev.toString()))) {
        this.filterItemrejarray.push(this.selectedItemrejarray[this.iv]);
        this.iv += 1;
      }
      else {
        this.iv += 1;
      }
    }
    this.sumAllData();
  }
  extraVal(val) {
    this.colspanAmount = 2;
    this.dpservice.itemwiserejlist = [];
    this.filterItemrejarray = [];
    this.cols = [
      //{ field: 'item_type', header: 'Type' },
      { field: 'itemcode', header: 'Code' },
      { field: 'itemname', header: 'Name' },
      /*{ field: 'reject_qty', header: 'Reject qty' },
      { field: 'rejper', header: 'Rej %' },
      { field: 'reject_value', header: 'Reject Value' },
      { field: 'inspection_value', header: 'Insp. Value' },*/
    ];
    if (val == 7) {
      this.cols.push({ field: 'inspection_value', header: 'Insp. Value' },
        { field: 'okvalue', header: 'Ok Value' },
        { field: 'okper', header: 'Ok Value %' },
        { field: 'reject_value', header: 'Rej. Value' },
        { field: 'rejper', header: 'Reject %' },
      );
      this.colspanAmount = 3;
    } else if (val == 1) {
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
    console.log('hie');
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
    this.okperSum = 0;

    this.rejperPerSum = 0;
    this.rejperPerSum2 = 0;
    if (this.filterenable == true) {
      for (const rq of this.filterItemrejarray) {
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
        this.okperSum += rq.okper;

        this.rejperPerSum += rq.rejper;
      }
      this.okperSum = (this.okperSum / this.dpservice.itemwiserejlist.length);
      this.rejperPerSum2 = this.rejper;//(this.rejperPerSum / this.dpservice.itemwiserejlist.length)
      return;
    }

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
      this.okperSum += rq.okper;

      this.rejperPerSum += rq.rejper;
    }
    this.okperSum = (this.okperSum / this.dpservice.itemwiserejlist.length);
    this.rejperPerSum2 = this.rejper; //(this.rejperPerSum / this.dpservice.itemwiserejlist.length)
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
