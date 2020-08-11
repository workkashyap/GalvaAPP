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
  providers: [DatePipe],
  styles: [
    `
     
      :host ::ng-deep ::-webkit-scrollbar {
        width: 10px;
      }
      /* Track */
      :host ::ng-deep ::-webkit-scrollbar-track {
        background: #f1f1f1; 
      }
       
      /* Handle */
      :host ::ng-deep ::-webkit-scrollbar-thumb {
        background: #c1c1c1; 
      }
      
      /* Handle on hover */
      :host ::ng-deep ::-webkit-scrollbar-thumb:hover {
        background: #c1c1c1; 
      }
    `
  ]
})
export class PpccalendarComponent implements OnInit {
  filterenable: boolean = false;
  selectedItemrejarray: any[];
  iv: number = 0;
  filterItemrejarray: any[];

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

  schedulevalue: number = 0;

  summaryModalData: any;
  cols: any;
  modaltype: number = 1;
  red: number = 0;
  orange: number = 0;
  green: number = 0;
  bgClass: any = '';
  galvaGroupid: any = 'ppcsummary';
  schedulevalueHome: number = 0;
  viewModalData: any = [];
  clonedData: { [s: string]: any; } = {};

  viewModalLoader: boolean = false;

  ppcsummarycloneData: any = [];
  ppcsummarycloneLoader: boolean = false;

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
    this.getData();

  }
  selectedGalvaGroup(val: any) {
    this.galvaGroupid = val;
    this.getData();
  }


  loadmdata(ev, dt) {
    const me = this;
    me.schedulevalue = 0;
    this.filterenable = true;
    this.selectedItemrejarray = dt.value;
    this.iv = 0;
    this.filterItemrejarray = [];
    // console.log(this.selectedItemrejarray[0].id);
    for (const c of this.selectedItemrejarray) {
      if (
        c.name.toString().includes(ev.toString()) ||
        c.itemcode.toString().includes(ev.toString()) ||
        c.itemname.toString().includes(ev.toString()) ||
        c.schqty.toString().includes(ev.toString()) ||
        c.schvalue.toString().includes(ev.toString()) ||
        c.balance.toString().includes(ev.toString()) ||
        c.platingpartreq.toString().includes(ev.toString()) ||
        c.mouldpartreq.toString().includes(ev.toString()) ||
        c.fgVZ.toString().includes(ev.toString()) ||
        c.dispatchqty.toString().includes(ev.toString())
      ) {
        this.filterItemrejarray.push(this.selectedItemrejarray[this.iv]);
        this.iv += 1;
      } else {
        this.iv += 1;
      }
    }
    me.filterItemrejarray.forEach(smd => {
      if (smd.schvalue != null) {
        me.schedulevalue = me.schedulevalue + smd.schvalue;
      }
    });
    me.schedulevalue = me.schedulevalue / 100000;
  }
  getData() {
    const me = this;
    this.schedulevalue = 0;
    me.schedulevalueHome = 0;
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
      .toPromise().then(res => {
        me.summaryModalData = res as Ppc[];
        me.summaryModalData.forEach(smd => {
          if (smd.schvalue != null) {
            me.schedulevalue = me.schedulevalue + smd.schvalue;
            if (me.galvaGroupid == "ppcsummary") {

            }
            me.schedulevalueHome = me.schedulevalueHome + smd.schvalue;

          }

        });
        me.schedulevalueHome = me.schedulevalueHome / 100000;
        me.schedulevalue = me.schedulevalue / 100000;
        me.loading = false;
      });
  }
  summary2() {
    this.schedulevalue = 0;
    this.summaryModalData = [];
    this.modaltype = 2;
    this.bgClass = 'removepd2';
    this.galvaGroupid = 'ppcsummary';
    $('#summaryModal').modal('show');
    this.getData();
  }
  customNumber(value) {
    return parseInt(value, 10) //convert to int
  }
  //for delete
  onRowDelete(row: any) {

    this.ppcService
      .ppcdelete(row).subscribe(
        res => {
          this.toastr.success('Deleted Successfully', 'Save ActionPlan');
          this.refreshList();
        },
        err => {
          console.log(err);
        });
  }

  refreshList() {
    let me = this;
    this.ppcService
      .ppcimportclones()
      .toPromise().then(res => {
        me.viewModalData = res as Ppc[];
      }, error => {
      });
  }
  editing: boolean = false;

  onRowEditSave(row: any) {
    const me = this;
    //row.id = 0;
    row.budat = this.datePipe.transform(new Date(row.budat), 'yyyy-MM-dd');
    row.dispatchDate = this.datePipe.transform(new Date(row.dispatchDate), 'yyyy-MM-dd');

    if (row.id) {
      console.log("Update", row);
      this.ppcService.updatePpcimportclones(row).subscribe(
        res => {
          me.toastr.success('Updated Successfully', 'Save ActionPlan');
          me.refreshList();
          me.resetColumnWidth();
        },
        err => {
          console.log(err);
        });
    }
  }


  getView() {
    const me = this;
    this.viewModalLoader = true;
    this.viewModalData = [];
    this.cols = [
      { field: "edit", header: "Action", width: "100px" },
      { field: 'custno', header: 'Cust No.', width: "100px" },
      { field: 'itemcode', header: 'Item code', width: "130px" },
      { field: 'itemname', header: 'Item Name', width: "150px" },
      { field: 'schqty', header: 'Sch Qty', width: "80px" },
      { field: 'dispatchqty', header: 'Sispatch Qty', width: "80px" },
      { field: 'balance', header: 'Balance', width: "80px" },
      { field: 'totaltransit', header: 'Total Transit', width: "80px" },
      { field: 'fgVZ', header: 'fgVZ', width: "80px" },
      { field: 'fgother', header: 'fgother', width: "80px" },
      { field: 'platingpartreq', header: 'Plating part req.', width: "80px" },
      { field: 'mouldpartreq', header: 'Mould part req', width: "80px" },
      { field: 'fgmouldstock', header: 'Fgmould Stock', width: "80px" },
      { field: 'comp', header: 'Comp', width: "80px" },
      { field: 'dispatchDate', header: 'Dispatch Date', width: "130px" },
      /// { field: 'price', header: 'Price', width: "80px" },
      // { field: 'dispatchval', header: 'Dispatch Val', width: "80px" },
      //   { field: 'stock', header: 'Stock', width: "80px" },
      // { field: 'plant', header: 'Plant', width: "100px" },
      //{ field: 'schvalue', header: 'Sch Value', width: "80px" },
      //  { field: 'budat', header: 'Budat', width: "130px" },
      // { field: 'totalstock', header: 'Total Stock', width: "80px" },
      // { field: 'orderno', header: 'Order No.', width: "100px" },
      // { field: 'transit', header: 'Transit', width: "80px" },F
      // { field: 'linenum', header: 'Linenum', width: "80px" },
    ];


    $('#viewModal').modal('show');
    this.ppcService
      .ppcimportclones()
      .toPromise().then(res => {
        me.viewModalData = res as Ppc[];
        me.viewModalLoader = false;
      }, error => {
        me.viewModalLoader = false;
      });
  }
  onRowEditInit(row: any) {

    this.cols = [
      { field: "edit", header: "Action", width: "100px" },
      { field: 'custno', header: 'Cust No.', width: "100px" },
      { field: 'itemcode', header: 'Item code', width: "130px" },
      { field: 'itemname', header: 'Item Name', width: "150px" },
      { field: 'schqty', header: 'Sch Qty', width: "80px" },
      { field: 'dispatchqty', header: 'Sispatch Qty', width: "80px" },
      { field: 'balance', header: 'Balance', width: "80px" },
      { field: 'totaltransit', header: 'Total Transit', width: "80px" },
      { field: 'fgVZ', header: 'fgVZ', width: "80px" },
      { field: 'fgother', header: 'fgother', width: "80px" },
      { field: 'platingpartreq', header: 'Plating part req.', width: "80px" },
      { field: 'mouldpartreq', header: 'Mould part req', width: "80px" },
      { field: 'fgmouldstock', header: 'Fgmould Stock', width: "80px" },
      { field: 'comp', header: 'Comp', width: "80px" },
      { field: 'dispatchDate', header: 'Dispatch Date', width: "130px" },
      /// { field: 'price', header: 'Price', width: "80px" },
      // { field: 'dispatchval', header: 'Dispatch Val', width: "80px" },
      //   { field: 'stock', header: 'Stock', width: "80px" },
      // { field: 'plant', header: 'Plant', width: "100px" },
      //{ field: 'schvalue', header: 'Sch Value', width: "80px" },
      //  { field: 'budat', header: 'Budat', width: "130px" },
      // { field: 'totalstock', header: 'Total Stock', width: "80px" },
      // { field: 'orderno', header: 'Order No.', width: "100px" },
      // { field: 'transit', header: 'Transit', width: "80px" },F
      // { field: 'linenum', header: 'Linenum', width: "80px" },
    ];

    row.dispatchDate = this.formatDate(new Date(row.dispatchDate));
    row.budat = this.formatDate(new Date(row.budat));
    console.log(row);

    this.clonedData[row.id] = { row };
  }

  onRowEditCancel(row: any, index: number) {
    // this.allActionPlan[index] = this.clonedData[row.id];
    if (!row.id) {
      this.viewModalData.splice(index, 1);
    }
    delete this.clonedData[row.id];
    this.resetColumnWidth();
  }

  formatDate(date) {
    var day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    var month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    var year = date.getFullYear();
    return year + '-' + month + '-' + day; //day + "-" + month + "-" + year;
  }

  resetColumnWidth() {

    this.cols = [
      { field: "edit", header: "Action", width: "100px" },
      { field: 'custno', header: 'Cust No.', width: "100px" },
      { field: 'itemcode', header: 'Item code', width: "130px" },
      { field: 'itemname', header: 'Item Name', width: "150px" },
      { field: 'schqty', header: 'Sch Qty', width: "80px" },
      { field: 'dispatchqty', header: 'Sispatch Qty', width: "80px" },
      { field: 'balance', header: 'Balance', width: "80px" },
      { field: 'totaltransit', header: 'Total Transit', width: "80px" },
      { field: 'fgVZ', header: 'fgVZ', width: "80px" },
      { field: 'fgother', header: 'fgother', width: "80px" },
      { field: 'platingpartreq', header: 'Plating part req.', width: "80px" },
      { field: 'mouldpartreq', header: 'Mould part req', width: "80px" },
      { field: 'fgmouldstock', header: 'Fgmould Stock', width: "80px" },
      { field: 'comp', header: 'Comp', width: "80px" },
      { field: 'dispatchDate', header: 'Dispatch Date', width: "130px" },
      /// { field: 'price', header: 'Price', width: "80px" },
      // { field: 'dispatchval', header: 'Dispatch Val', width: "80px" },
      //   { field: 'stock', header: 'Stock', width: "80px" },
      // { field: 'plant', header: 'Plant', width: "100px" },
      //{ field: 'schvalue', header: 'Sch Value', width: "80px" },
      //  { field: 'budat', header: 'Budat', width: "130px" },
      // { field: 'totalstock', header: 'Total Stock', width: "80px" },
      // { field: 'orderno', header: 'Order No.', width: "100px" },
      // { field: 'transit', header: 'Transit', width: "80px" },F
      // { field: 'linenum', header: 'Linenum', width: "80px" },
    ];
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
    this.getData();


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
  //ppcsummaryclone
  ppcsummaryclone() {
    const me = this;
    this.ppcsummarycloneLoader = true;
    this.ppcsummarycloneData = [];
    me.schedulevalue = 0;
    this.bgClass = 'removepd2';
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
    $('#ppcsummaryclone').modal('show');
    this.ppcService
      .ppcsummaryclone(this.startdate)
      .toPromise().then(res => {
        me.ppcsummarycloneData = res as Ppc[];

        me.ppcsummarycloneData.forEach(smd => {
          if (smd.schvalue != null) {
            me.schedulevalue = me.schedulevalue + smd.schvalue;
          }
        });
        me.schedulevalue = me.schedulevalue / 100000;
        me.ppcsummarycloneLoader = false;
      }, error => {
        me.ppcsummarycloneLoader = false;
      });
  }
}
