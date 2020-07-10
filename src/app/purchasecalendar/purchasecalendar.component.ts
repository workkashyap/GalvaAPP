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

  summaryDetail: any = [];
  summaryDetail2: any = [];

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

  public loadingSummary = false;

  filterenable: boolean = false;

  public currentUser: User;

  //
  utility: number = 0;
  service: number = 0;
  jig: number = 0;
  hr: number = 0;
  tool: number = 0;


  abs: number = 0;
  capital: number = 0;
  consumable: number = 0;
  packing: number = 0;
  spares: number = 0;
  transport: number = 0;
  chemicals: number = 0;
  misc_purchase: number = 0;
  tpurchase: number = 0;
  selectedItemrejarray: any[];
  filterItemrejarray: any[];
  iv: number = 0;
  //
  i: number = 0;
  companyAbs: number = 0
  companyCapital: number = 0
  companyConsumable: number = 0
  companyPacking: number = 0
  companySpares: number = 0
  companyTransport: number = 0
  companyChemicals: number = 0
  companyTotalpurchase: number = 0
  companyMisc_purchase: number = 0

  companyUtility: number = 0;
  companyServices: number = 0;
  companyJig: number = 0;

  companyHr: number = 0;
  companyTool: number = 0;

  grandPurchaseValue: number = 0

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
        me.selectedPlanName();
        me.loading = false;
        if (res) {
          me.dpservice
            .getPurchaseCalendar(me.selectedcode, me.startdate)
            .toPromise()
            .then(res => {
              me.dpservice.purchasecalendar = res as Purchasecalendar[];
              me.loading = false;
              me.selectedPlanName();
              me.summary2();
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
        me.selectedPlanName();
        me.summary2();
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

    /*Moulded value
    this.misc_purchase = 0;
    this.dpservice.getPurchaseBtnInfo('purchasegroupmoulded', this.selectedcode, this.startdate).toPromise().then(res => {
      const row = res as Purchasesummary[];
      row.forEach(element => {
        this.misc_purchase = element.totalPurchase
      });
    });*/

    //UTILITY value
    this.utility = 0;
    this.dpservice.getPurchaseBtnInfo('purchasegrouputility', this.selectedcode, this.startdate).toPromise().then(res => {
      const row = res as Purchasesummary[];
      row.forEach(element => {
        this.utility = element.totalPurchase
      });
    });

    //service value
    this.service = 0;
    this.dpservice.getPurchaseBtnInfo('purchasegroupservice', this.selectedcode, this.startdate).toPromise().then(res => {
      const row = res as Purchasesummary[];
      row.forEach(element => {
        this.service = element.totalPurchase
      });
    });

    //jig value
    this.jig = 0;
    this.dpservice.getPurchaseBtnInfo('purchasegroupjig', this.selectedcode, this.startdate).toPromise().then(res => {
      const row = res as Purchasesummary[];
      row.forEach(element => {
        this.jig = element.totalPurchase
      });
    });

    //hr value
    this.hr = 0;
    this.dpservice.getPurchaseBtnInfo('purchasegrouphr', this.selectedcode, this.startdate).toPromise().then(res => {
      const row = res as Purchasesummary[];
      row.forEach(element => {
        this.hr = element.totalPurchase
      });
    });

    //tool value
    this.tool = 0;
    this.dpservice.getPurchaseBtnInfo('purchasegrouptool', this.selectedcode, this.startdate).toPromise().then(res => {
      const row = res as Purchasesummary[];
      row.forEach(element => {
        this.tool = element.totalPurchase
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
        me.selectedPlanName();
        me.summary2();
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

  loadmdata(ev, dt) {
    this.filterenable = true;
    this.selectedItemrejarray = dt.value;
    this.iv = 0;
    this.filterItemrejarray = [];
    // console.log(this.selectedItemrejarray[0].id);
    for (const c of this.selectedItemrejarray) {
      if (
        c.plantShortName.toString().includes(ev.toString()) ||
        c.acDocumentDate.toString().includes(ev.toString()) ||
        c.group.toString().includes(ev.toString()) ||
        c.vendorName.toString().includes(ev.toString()) ||
        c.narattion.toString().includes(ev.toString()) ||
        c.totalPurchase.toString().includes(ev.toString())
      ) {
        this.filterItemrejarray.push(this.selectedItemrejarray[this.iv]);
        this.iv += 1;
      } else {
        this.iv += 1;
      }
    }
    this.getSumForCalEvent();
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
    else if (val == "purchasegroupservicesum") {
      this.totalSumofTitle = "Tot. Service";
      this.totalSumofBg = "bg-service";
      this.cols.push(
        { field: 'totalPurchase', header: 'Service' },
      );
    }
    else if (val == "purchasegrouputilitysum") {
      this.totalSumofTitle = "Tot. Utility";
      this.totalSumofBg = "bg-Utility";
      this.cols.push(
        { field: 'totalPurchase', header: 'Utility' },
      );
    }
    else if (val == "purchasegrouphrsum") {
      this.totalSumofTitle = "Tot. HR";
      this.totalSumofBg = "bg-hr";
      this.cols.push(
        { field: 'totalPurchase', header: 'HR' },
      );
    }
    else if (val == "purchasegrouptoolsum") {
      this.totalSumofTitle = "Tot. Tool";
      this.totalSumofBg = "bg-tool";
      this.cols.push(
        { field: 'totalPurchase', header: 'Tool' },
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

  summary() {
    this.monthName = this.datePipe.transform(this.sDate, 'yyyy-MM-d');
    $('#summaryModal').modal('show');
  }
  summary2() {
    this.loadingSummary = true;
    const me = this;
    this.i = 1;
    me.companyAbs = 0;
    me.companyCapital = 0;
    me.companyChemicals = 0;
    me.companyConsumable = 0;

    me.companyUtility = 0;
    me.companyServices = 0;
    me.companyJig = 0;

    me.companyHr = 0;
    me.companyTool = 0;



    me.companyPacking = 0;
    me.companySpares = 0;
    me.companyTransport = 0;
    me.companyChemicals = 0;
    me.companyMisc_purchase = 0;
    me.companyTotalpurchase = 0;
    me.summaryDetail2 = [];
    this.grandPurchaseValue = 0;

    me.dpservice.getNetPurchaseSummary(this.startdate)
      .toPromise()
      .then(res => {
        const result = res; //as Salesdetail[];
        if (result && result.length) {
          result.forEach(row => {
            if (!me.summaryDetail2[row.plant]) {
              me.summaryDetail2[row.plant] = [];
            }
            me.summaryDetail2[row.plant].push(row);
            if (result.length == me.i) {

              me.plantservice.splantlist.forEach(plant => {
                plant.totalVal = 0;

                if (me.summaryDetail2[plant.plantcode]) {

                  me.summaryDetail2[plant.plantcode].forEach(sum => {
                    if (sum.mode == "totalpurchase") {
                      plant.totalVal = sum.totalPurchase;
                    }
                    if (sum.mode == "abs") {
                      plant.abs = sum.totalPurchase;
                      me.companyAbs += sum.totalPurchase;
                    }
                    if (sum.mode == "Chemical") {
                      plant.chemicals = sum.totalPurchase;
                      me.companyChemicals += sum.totalPurchase;
                    }

                    if (sum.mode == "Moulded") {
                      plant.moulded = sum.totalPurchase;
                      me.companyMisc_purchase += sum.totalPurchase;
                    }

                    if (sum.mode == "Packing") {
                      plant.packing = sum.totalPurchase;
                      me.companyPacking += sum.totalPurchase;
                    }
                    if (sum.mode == "Capital") {
                      plant.capital = sum.totalPurchase;
                      me.companyCapital += sum.totalPurchase;
                    }

                    if (sum.mode == "Spares") {
                      plant.spares = sum.totalPurchase;
                      me.companySpares += sum.totalPurchase;
                    }
                    if (sum.mode == "Transport") {
                      plant.transport = sum.totalPurchase;
                      me.companyTransport += sum.totalPurchase;
                    }
                    if (sum.mode == "Consumable") {
                      plant.consumable = sum.totalPurchase;
                      me.companyConsumable += sum.totalPurchase;
                    }

                    if (sum.mode == "Service") {
                      plant.service = sum.totalPurchase;
                      me.companyServices += sum.totalPurchase;
                    }
                    if (sum.mode == "Jig") {
                      plant.jig = sum.totalPurchase;
                      me.companyJig += sum.totalPurchase;
                    }
                    if (sum.mode == "Utility") {
                      plant.utility = sum.totalPurchase;
                      me.companyUtility += sum.totalPurchase;
                    }
                    if (sum.mode == "Utility") {
                      plant.utility = sum.totalPurchase;
                      me.companyUtility += sum.totalPurchase;
                    }
                    if (sum.mode == "TOOL") {
                      plant.tool = sum.totalPurchase;
                      me.companyTool += sum.totalPurchase;
                    }
                    if (sum.mode == "HR") {
                      plant.hr = sum.totalPurchase;
                      me.companyHr += sum.totalPurchase;
                    }

                  });
                  // plant.totalVal = me.companyConsumable + me.companyTransport + me.companySpares + me.companyCapital + me.companyPacking +
                  me.totalPurchase();
                }
              });
            }
            me.i = me.i + 1;
          });
        } else {

          me.loadingSummary = false;
        }
      });
  }
  totalPurchase() {
    this.grandPurchaseValue = 0;
    this.plantservice.splantlist.forEach(element => {
      this.grandPurchaseValue += element.totalVal;
    });
    this.loadingSummary = false;

    return this.grandPurchaseValue;
  }
  //sum
  getSumForCalEvent() {

    this.totalSumofValue = 0;
    console.log("hi");
    if (this.filterenable === true) {
      for (const rq of this.filterItemrejarray) {
        this.totalSumofValue = (this.totalSumofValue + rq.totalPurchase);
      }
      return;
    }
    console.log("hi-2");
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

        element.totalVal = 0;
        element.abs = 0;
        element.chemicals = 0;
        element.moulded = 0;
        element.packing = 0;
        element.capital = 0;
        element.spares = 0;
        element.transport = 0;
        element.consumable = 0;

        element.jig = 0;
        element.utility = 0;
        element.service = 0;
        element.hr = 0;
        element.tool = 0;


        if (element.plantcode == me.selectedcode) {
          me.selected_plantname = element.plantshortname;
        }
      });
    }
    // return this.selected_plantname;
  }
}
