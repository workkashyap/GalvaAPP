import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { PlantService } from '../shared/plant/plant.service';
import { DatePipe } from '@angular/common';
import { DailyproductionService } from '../shared/dailyProduction/dailyproduction.service';
import { Dailyproduction } from '../shared/dailyProduction/dailyproduction.model';
import { CreateactionplanService } from "../shared/createactionplan/createactionplan.service";
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../shared/login/login.service';
import { User } from '../shared/login/User.model';
import { Salesdetail } from '../shared/dailyProduction/salesdetail.model';
import { Purchasesummary } from '../shared/purchase/purchasesummary.model';

import { Plant } from '../shared/plant/plant.model';
import { Salessummary } from '../shared/dailyProduction/salessummary.model';
import { Ppc } from '../shared/ppc/ppc.model';
import { PpcService } from '../shared/ppc/ppc.service';
@Component({
  selector: 'app-ppccalendar',
  templateUrl: './ppccalendar.component.html',
  styleUrls: ['./ppccalendar.component.css'],
  providers: [DatePipe]
})
export class PpccalendarComponent implements OnInit {

  public sDate: Date;
  public lDate: Date;
  public date: any;

  public startdate: any;

  public selectedcode: string;
  public selected_plantname: string;

  monthname: any;
  monthNames: any;
  lastDate: any;

  public loading = false;
  public currentUser: User;
  compliancePer: number = 0;

  firstcolumn: any;
  secondcolumn: any;
  thirdcolumn: any;

  allrecord: number = 0;


  length1: number = 0;
  length2: number = 0;
  length3: number = 0;

  length4: number = 0;
  length5: number = 0;
  length6: number = 0;

  length7: number = 0;
  length8: number = 0;
  length9: number = 0;

  summaryModalData: any;
  cols: any;
  modaltype: number = 1;
  red: number = 0;
  orange: number = 0;
  green: number = 0;
  bgClass: any = '';
  galvaGroupid: any = 'ppcsummary';

  constructor(
    public plantservice: PlantService,
    public toastr: ToastrService,
    public datePipe: DatePipe,
    public lservice: LoginService,
    public ppcService: PpcService,
  ) {
    this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
      'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];
    this.lservice.currentUser.subscribe(x => this.currentUser = x);
  }
  ngOnInit() {
    const me = this;
    this.date = new Date();

    this.startdate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    var date = new Date();
    this.monthname = this.monthNames[this.date.getMonth()];

    this.sDate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.lDate = new Date(me.sDate.getFullYear(), me.sDate.getMonth() + 1, 0);


    var d = new Date();
    const m = this.monthNames.indexOf(me.monthname, 0) //d.getMonth(); //current month
    console.log(m + 1);
    const y = d.getFullYear(); //current year
    console.log(new Date(y, m + 1, 0));
    this.lastDate = this.datePipe.transform(new Date(y, m + 1, 0), 'dd');


    //this.loading = true;
    //get plant
    /* this.plantservice
       .sgetPlantData(me.currentUser.id)
       .toPromise()
       .then(res => {
         me.plantservice.splantlist = res as Plant[];
         console.log("splantlist", me.plantservice.splantlist);
         me.selectedcode = me.plantservice.splantlist[0].plantcode;
         me.selected_plantname = me.plantservice.splantlist[0].plantshortname;
         me.loading = false;
 
         if (res) {
           //call function ;
           this.loaddata();
         }
       });
 
 */
    me.selectedcode = '1010';
    me.selected_plantname = 'Gdpl Vapi';
    this.loaddata();


  }
  selectedGalvaGroup(val: any) {
    this.galvaGroupid = val;
    this.getData();
  }
  getData() {
    const me = this;
    this.cols = [
      { field: 'name', header: 'Customer Name' },
      { field: 'itemcode', header: 'Item Code' },
      { field: 'itemname', header: 'Material' },
      { field: 'schqty', header: 'Schedule Current' },
      { field: 'schvalue', header: 'Schedule Value' },
      { field: 'dispatchqty', header: 'Dispatch' },
      { field: 'balance', header: 'Balance' },
      { field: 'fgVZ', header: 'FG  Vapi/Zaroli' },
      { field: 'totaltransit', header: 'Transit' },
      { field: 'fgother', header: 'FG at chennai / ap / pune' },
      { field: 'fgmouldstock', header: 'Moulded stock' },
      { field: 'mouldpartreq', header: 'Moud Parts Req.' },
      { field: 'platingpartreq', header: 'Plat. Parts Req.' },
    ];

    this.loading = true;
    this.summaryModalData = [];
    this.ppcService
      .getPPCCalsummary(this.startdate, this.galvaGroupid)
      .toPromise()
      .then(res => {
        this.summaryModalData = res as Ppc[];

        this.loading = false;
      });
  }
  summary2() {
    this.summaryModalData = [];
    this.modaltype = 2;
    this.bgClass = '';
    this.galvaGroupid = 'ppcsummary';
    $('#summaryModal').modal('show');
    this.getData();
  }
  customNumber(value) {
    return parseInt(value, 10) //convert to int
  }
  summary(data, val1, val2, val3) {
    this.modaltype = 1;
    this.red = val1;
    this.orange = val2;
    this.green = val3;
    this.bgClass = 'removepd';
    this.summaryModalData = [];
    this.cols = [
      { field: 'name', header: 'Customer Name' },
      { field: 'itemname', header: 'Material' },
      { field: 'schqty', header: 'Schedule Current' },
      { field: 'dispatchqty', header: 'Dispatch' },
      { field: 'balance', header: 'Balance' },
      { field: 'fgVZ', header: 'FG  Vapi/Zaroli' },
      { field: 'totaltransit', header: 'Transit' },
      { field: 'fgother', header: 'FG at chennai / ap / pune' },
      { field: 'fgmouldstock', header: 'Moulded stock' },
      { field: 'mouldpartreq', header: 'Moud Parts Req.' },
      { field: 'platingpartreq', header: 'Plat. Parts Req.' },
      { field: 'comp', header: 'Complience %' },

    ];

    this.summaryModalData = data;
    $('#summaryModal').modal('show');
  }

  calPer(val1, val2) {
    const val3 = 0;
    //console.log("val1:", val1);
    //console.log("val2:", val2);
    if (val1 > 0 && val2 > 0) {
      return (val1 * 100) / val2;
    }
    return val3;
  }
  //on refres button click event
  loaddata() {
    const me = this;
    this.loading = true;

    this.ppcService
      .getCompliancePer(this.selectedcode, this.startdate)
      .toPromise()
      .then(res => {
        const data = res as Ppc[];
        data.forEach(row => {
          this.compliancePer = row.comp;
        });
        this.loading = false;
      });

    me.allrecord = 0
    this.ppcService
      .ppctotalrec(this.selectedcode, this.startdate)
      .toPromise()
      .then(res => {
        const data = res as Ppc[];
        me.allrecord = data.length;
        console.log("allrecord : ", me.allrecord)
      });

    me.firstcolumn = [];
    this.ppcService
      .getColumn1(this.selectedcode, this.startdate)
      .toPromise()
      .then(res => {
        me.firstcolumn = [];
        me.firstcolumn[0] = res as Ppc[];
        me.length1 = me.firstcolumn[0].length;
        this.ppcService
          .getColumn2(this.selectedcode, this.startdate)
          .toPromise()
          .then(res => {
            me.firstcolumn[1] = res as Ppc[];
            me.length2 = me.firstcolumn[1].length;

          });
        this.ppcService
          .getColumn3(this.selectedcode, this.startdate)
          .toPromise()
          .then(res => {
            me.firstcolumn[2] = res as Ppc[];
            me.length3 = me.firstcolumn[2].length;

          });
      });

    me.secondcolumn = [];
    this.ppcService
      .getColumn4(this.selectedcode, this.startdate)
      .toPromise()
      .then(res => {
        me.secondcolumn = [];
        me.secondcolumn[0] = res as Ppc[];
        me.length4 = me.secondcolumn[0].length;
        this.ppcService
          .getColumn5(this.selectedcode, this.startdate)
          .toPromise()
          .then(res => {
            me.secondcolumn[1] = res as Ppc[];
            me.length5 = me.secondcolumn[1].length;

          });
        this.ppcService
          .getColumn6(this.selectedcode, this.startdate)
          .toPromise()
          .then(res => {
            me.secondcolumn[2] = res as Ppc[];
            me.length6 = me.secondcolumn[2].length;

          });
      });


    me.thirdcolumn = [];
    this.ppcService
      .getColumn7(this.selectedcode, this.startdate)
      .toPromise()
      .then(res => {
        me.thirdcolumn = [];
        me.thirdcolumn[0] = res as Ppc[];
        me.length7 = me.thirdcolumn[0].length;
        this.ppcService
          .getColumn8(this.selectedcode, this.startdate)
          .toPromise()
          .then(res => {
            me.thirdcolumn[1] = res as Ppc[];
            me.length8 = me.thirdcolumn[1].length;

          });
        this.ppcService
          .getColumn9(this.selectedcode, this.startdate)
          .toPromise()
          .then(res => {
            me.thirdcolumn[2] = res as Ppc[];
            me.length9 = me.thirdcolumn[2].length;

          });
      });


  }
  //on change option value
  selectedGrid(ev) {
    this.selectedcode = ev;
    console.log("company : ", ev);
    this.loaddata();
  }
  selectedMonth(ev) {
    console.log("month : ", ev)

    this.lastDate = '';
    // co a = fruits.indexOf("Apple", 4);
    var d = new Date();
    const m = this.monthNames.indexOf(ev, 0) //d.getMonth(); //current month
    console.log(m + 1);
    const y = d.getFullYear(); //current year
    console.log(new Date(y, m + 1, 0));
    this.lastDate = this.datePipe.transform(new Date(y, m + 1, 0), 'dd');

    this.startdate = this.datePipe.transform(new Date(y, m, 1), 'yyyy-MM-dd');
    console.log("startdate : ", this.startdate);


    this.loaddata();

  }
  //selected plant 
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
