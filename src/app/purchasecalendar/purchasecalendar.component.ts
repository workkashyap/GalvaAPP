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
import { Purchasecalendar } from '../shared/purchase/purchasecalendar.model'; // '../shared/dailyProduction/purchasedetail.model';
import { Plant } from '../shared/plant/plant.model';
import { Salessummary } from '../shared/dailyProduction/salessummary.model';
import { PurchaseService } from '../shared/purchase/purchase.service';
import { Purchasesummary } from '../shared/purchase/purchasesummary.model';
import { Purchasedetail } from '../shared/purchase/purchasedetail.model';
@Component({
  selector: 'app-purchasecalendar',
  templateUrl: './purchasecalendar.component.html',
  styleUrls: ['./purchasecalendar.component.css'],
  providers: [DatePipe]
})
export class PurchasecalendarComponent implements OnInit {
  totalSumofValue: number = 0;
  totalSumofTitle: string = '';
  totalSumofBg: string = '';
  modalType: number = 0;

  public sDate: Date;
  public lDate: Date;
  cols: any[];

  public dailyprodlist: Dailyproduction[] = [];
  public salessummary: Salessummary[] = [];
  selectedItemrej: Salesdetail;
  purchaseItemrej: Purchasecalendar;

  public selectedcode: string;
  public selected_plantname: string;
  public selected_eventdate: any;
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

  //
  abs: number = 0;
  capital: number = 0;
  consumable: number = 0;
  packing: number = 0;
  spares: number = 0;
  transport: number = 0;
  chemicals: number = 0;
  misc_purchase: number = 0;
  tpurchase: number = 0;
  constructor(
    public plantservice: PlantService,
    public dpservice: PurchaseService, //DailyproductionService,
    public toastr: ToastrService,
    public datePipe: DatePipe, public apservice: CreateactionplanService,
    public lservice: LoginService,
  ) {
    this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
      'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];
    this.lservice.currentUser.subscribe(x => this.currentUser = x);
  }
  ngOnInit() {
    const me = this;
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

    this.startdate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    var date = new Date();

    this.sDate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.lDate = new Date(me.sDate.getFullYear(), me.sDate.getMonth() + 1, 0);
    //this.loading = true;
    //get plant
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
            .getPurchaseCalendar(me.selectedcode, me.startdate)
            .toPromise()
            .then(res => {
              me.dpservice.purchasecalendar = res as Purchasecalendar[];
              me.loading = false;
              me.loadchart1();
            });
        }
      });
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
  //on refres button click event
  loaddata() {
    const me = this;
    this.dpservice
      .getPurchaseCalendar(this.selectedcode, this.startdate)
      .toPromise()
      .then(res => {
        me.dpservice.purchasecalendar = res as Purchasecalendar[];
        me.loadchart1();
        this.loading = false;
      });
  }

  //get top button total value
  loadchart1() {

    //abs value
    this.abs = 0;
    this.dpservice.getPurchaseBtnInfo('purchasegroupabs', this.selectedcode, this.startdate).toPromise().then(res => {
      const row = res as Purchasesummary[];
      row.forEach(element => {
        this.abs = element.totalPurchase;
      });

    });
    //capital value
    this.capital = 0;
    this.dpservice.getPurchaseBtnInfo('purchasegroupcapital', this.selectedcode, this.startdate).toPromise().then(res => {
      const row = res as Purchasesummary[];
      row.forEach(element => {
        this.capital = element.totalPurchase;
      });
    });
    //consumable value
    this.consumable = 0;
    this.dpservice.getPurchaseBtnInfo('purchasegroupcon', this.selectedcode, this.startdate).toPromise().then(res => {
      const row = res as Purchasesummary[];
      row.forEach(element => {
        this.consumable = element.totalPurchase;
      });
    });
    //packing value
    this.packing = 0;
    this.dpservice.getPurchaseBtnInfo('purchasegrouppac', this.selectedcode, this.startdate).toPromise().then(res => {
      const row = res as Purchasesummary[];
      row.forEach(element => {
        this.packing = element.totalPurchase
      });
    });
    //spares value
    this.spares = 0;
    this.dpservice.getPurchaseBtnInfo('purchasegroupspares', this.selectedcode, this.startdate).toPromise().then(res => {
      const row = res as Purchasesummary[];
      row.forEach(element => {
        this.spares = element.totalPurchase
      });
    });
    //Transport value
    this.transport = 0;
    this.dpservice.getPurchaseBtnInfo('purchasegrouptransport', this.selectedcode, this.startdate).toPromise().then(res => {
      const row = res as Purchasesummary[];
      row.forEach(element => {
        this.transport = element.totalPurchase
      });
    });

    //total purchase value
    this.tpurchase = 0;
    this.dpservice.getPurchaseBtnInfo('purchasegrouptotal', this.selectedcode, this.startdate).toPromise().then(res => {
      const row = res as Purchasesummary[];
      row.forEach(element => {
        this.tpurchase = element.totalPurchase
      });
    });
    //chemicals value
    this.chemicals = 0;
    this.dpservice.getPurchaseBtnInfo('purchasegroupchemical', this.selectedcode, this.startdate).toPromise().then(res => {
      const row = res as Purchasesummary[];
      row.forEach(element => {
        this.chemicals = element.totalPurchase
      });
    });
    //Moulded value
    this.misc_purchase = 0;
    this.dpservice.getPurchaseBtnInfo('purchasegroupmoulded', this.selectedcode, this.startdate).toPromise().then(res => {
      const row = res as Purchasesummary[];
      row.forEach(element => {
        this.misc_purchase = element.totalPurchase
      });
    });
  }
  //on change option value
  selectedGrid(ev) {
    this.selectedcode = ev;
    const me = this;
    this.selectedPlanName();
    this.dpservice
      .getPurchaseCalendar(ev, this.startdate)
      .toPromise()
      .then(res => {
        me.dpservice.purchasecalendar = res as Purchasecalendar[];
        me.loadchart1();
        this.loading = false;
      });

  }
  //calendar event click
  eventClick(model) {
    this.modalType = 1;
    this.cols = [
      { field: 'plantShortName', header: 'Plant Name' },
      { field: 'acDocumentDate', header: 'AC Document Date' },
      { field: 'group', header: 'Group' },
      { field: 'vendorName', header: 'Vendor Name' },
      { field: 'narattion', header: 'Narattion' },
      { field: 'totalPurchase', header: 'Total Purchase' },
    ];

    this.dpservice.purchasedetail = [];
    this.monthName = '';
    $('#basicExampleModal').modal('show');
    this.selected_eventdate = this.datePipe.transform(model.event.start, 'yyyy-MM-dd');
    this.loading = true;
    this.dpservice.getPurchaseCaldetail(this.selectedcode, this.selected_eventdate)
      .toPromise()
      .then(res => {
        this.dpservice.purchasedetail = res as Purchasedetail[];
        this.getSumForCalEvent();
        this.loading = false;
      });
  }
  //top btn click
  extraVal(val) {

    this.modalType = 2;
    this.totalSumofValue = 0;
    this.cols = [
      { field: 'plantShortName', header: 'Plant Name' },
      { field: 'acDocumentDate', header: 'AC Document Date' },
      { field: 'group', header: 'Group' },
      { field: 'vendorName', header: 'Vendor Name' },
      { field: 'narattion', header: 'Narattion' },
    ];
    if (val == "getpurchasecalendarsum") {
      this.totalSumofTitle = "Tot. Purchase";
      this.totalSumofBg = "bg-info";
      this.cols.push(
        { field: 'totalPurchase', header: 'Purchase' },
      );
    } else if (val == "purchasegroupabssum") {
      this.totalSumofTitle = "Tot. ABS";
      this.totalSumofBg = "bg-primary";
      this.cols.push(
        { field: 'totalPurchase', header: 'ABS' },
      );
    } else if (val == "purchasegrouppacsum") {
      this.totalSumofTitle = "Tot. Packing";
      this.totalSumofBg = "bg-dark";
      this.cols.push(
        { field: 'totalPurchase', header: 'Packing' },
      );
    } else if (val == "purchasegroupsparessum") {
      this.totalSumofTitle = "Tot. Spares";
      this.totalSumofBg = "bg-danger";
      this.cols.push(
        { field: 'totalPurchase', header: 'Spares' },
      );
    }
    else if (val == "purchasegroupconsum") {
      this.totalSumofTitle = "Tot. Consumable";
      this.totalSumofBg = "bg-warning";
      this.cols.push(
        { field: 'totalPurchase', header: 'Consumable' },
      );
    } else if (val == "purchasegrouptransportsum") {
      this.totalSumofTitle = "Tot. Transport";
      this.totalSumofBg = "bg-action-plan";
      this.cols.push(
        { field: 'totalPurchase', header: 'Transport' },
      );
    } else if (val == "purchasegroupcapitalsum") {
      this.totalSumofTitle = "Tot. Capital";
      this.totalSumofBg = "bg-capital";
      this.cols.push(
        { field: 'totalPurchase', header: 'Capital' },
      );
    }
    else if (val == "purchasegroupchemicalsum") {
      this.totalSumofTitle = "Tot. Chemicals";
      this.totalSumofBg = "bg-success";
      this.cols.push(
        { field: 'totalPurchase', header: 'Chemicals' },
      );
    }
    else if (val == "purchasegroupmouldedsum") {
      this.totalSumofTitle = "Tot. Moulded";
      this.totalSumofBg = "bg-moulded";
      this.cols.push(
        { field: 'totalPurchase', header: 'Moulded' },
      );
    }


    this.dpservice.purchasedetail = [];
    this.monthName = this.datePipe.transform(this.sDate, 'yyyy-MM-d');
    $('#basicExampleModal').modal('show');
    this.loading = true;

    this.dpservice.getPurchaseBtnClickEvent(val, this.selectedcode, this.startdate)
      .toPromise()
      .then(res => {
        this.dpservice.purchasedetail = res as Purchasedetail[];
        this.getSumForButtonEvent();
        this.loading = false;
      });

  }
  //sum
  getSumForCalEvent() {

    this.totalSumofValue = 0;
    for (const sd of this.dpservice.purchasedetail) {
      this.totalSumofValue = (this.totalSumofValue + sd.totalPurchase);
    }
    return;
  }
  getSumForButtonEvent() {

    this.totalSumofValue = 0;
    for (const sd of this.dpservice.purchasedetail) {
      this.totalSumofValue = (this.totalSumofValue + sd.totalPurchase);
    }
    return;
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
