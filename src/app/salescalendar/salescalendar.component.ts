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
import { Purchasedetail } from '../shared/purchase/purchasedetail.model';
import { PurchaseService } from '../shared/purchase/purchase.service';
@Component({
  selector: 'app-salescalendar',
  templateUrl: './salescalendar.component.html',
  styleUrls: ['./salescalendar.component.css'],
  providers: [DatePipe]
})
export class SalescalendarComponent implements OnInit {
  company_val: number = 0;
  finlaNetSales: number = 0;
  purchaseMoulded: number = 0;
  netSales: number = 0;
  compliance: number = 0;
  salesRej: number = 0;
  grossSales: number = 0;
  cancelledInvoice: number = 0;
  totalSumofValue: number = 0;
  totalSumofTitle: string = '';
  totalSumofBg: string = '';
  basicamtinr: number = 0;
  totalvalue: number = 0;
  modalType: number = 0;
  public sDate: Date;
  public lDate: Date;
  public dailyprodlist: Dailyproduction[] = [];
  public salessummary: Salessummary[] = [];
  total_netsales: number = 0;
  grand_netsales: number = 0;
  i: number;
  cols: any[];
  selectedItemrej: Salesdetail;

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
  summaryDetail: any = [];
  summaryDetail2: any = [];

  cancelInvTotal: number = 0;
  salesReturnTotal: number = 0;
  netSalesTotal: number = 0;
  mouldedTotal: number = 0;
  constructor(
    public plantservice: PlantService,
    public dpservice: DailyproductionService,
    public toastr: ToastrService,
    public dpservicePurchase: PurchaseService,
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
        console.log("splantlist", me.plantservice.splantlist);
        me.selectedcode = me.plantservice.splantlist[0].plantcode;
        me.selected_plantname = me.plantservice.splantlist[0].plantshortname;
        me.loading = false;
        me.selectedPlanName();
        if (res) {
          me.summary2();

          me.dpservice
            .getSalesCalendar(me.selectedcode, me.startdate)
            .toPromise()
            .then(res => {
              me.dpservice.dailyprodlist = res as Dailyproduction[];
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
    me.summary2();
    this.dpservice
      .getSalesCalendar(this.selectedcode, this.startdate)
      .toPromise()
      .then(res => {
        this.dpservice.dailyprodlist = res as Dailyproduction[];
        me.loadchart1();
        this.loading = false;
      });
  }
  //netsales
  finalNetSale(i) {
    this.finlaNetSales = 0;
    this.compliance = 0;

    this.finlaNetSales = (this.netSales - (Math.abs(this.cancelledInvoice) + Math.abs(this.salesRej) + Math.abs(this.purchaseMoulded)));

    this.compliance = ((this.grossSales / this.company_val) * 100);
    if (i == 'compliance') {
      return this.compliance;
    }
    return this.finlaNetSales;
  }

  //get top button total value
  loadchart1() {
    this.netSales = 0;
    this.grossSales = 0;
    this.cancelledInvoice = 0;
    this.salesRej = 0;
    this.dpservice.getNetSale(this.selectedcode, this.startdate).toPromise().then(res => {
      const salesReturn = res as Salessummary[];
      salesReturn.forEach(element => {
        this.netSales = element.netsale;
      });

    });

    this.dpservice.getGrossSale(this.selectedcode, this.startdate).toPromise().then(res => {
      const salesReturn = res as Salessummary[];
      salesReturn.forEach(element => {
        this.grossSales = element.grossSale;
      });
    });
    this.dpservice.getCancelInvoice(this.selectedcode, this.startdate).toPromise().then(res => {
      const salesReturn = res as Salessummary[];
      salesReturn.forEach(element => {
        this.cancelledInvoice = element.cancelInvoice;
      });
    });

    this.dpservice.getSalesReturn(this.selectedcode, this.startdate).toPromise().then(res => {
      const salesReturn = res as Salessummary[];
      salesReturn.forEach(element => {
        this.salesRej = element.salesReturn
      });
    });
    //Moulded value
    this.purchaseMoulded = 0;
    this.dpservice.getPurchaseBtnInfo(this.selectedcode, this.startdate).toPromise().then(res => {
      const row = res as Purchasesummary[];
      row.forEach(element => {
        this.purchaseMoulded = element.totalPurchase
      });
    });

  }
  //on change option value
  selectedGrid(ev) {
    this.selectedcode = ev;
    const me = this;
    this.selectedPlanName();
    this.dpservice
      .getSalesCalendar(ev, this.startdate)
      .toPromise()
      .then(res => {
        this.dpservice.dailyprodlist = res as Dailyproduction[];
        me.loadchart1();
        this.loading = false;
      });

  }
  //calendar event click
  eventClick(model) {

    this.modalType = 1;
    this.cols = [
      // { field: 'plant', header: 'Plant' },
      // { field: 'plantName', header: 'Plant Name' },
      // { field: 'invoiceNumber', header: 'Invoiceno' },
      // { field: 'accDocNo', header: 'Accdocno' },
      //{ field: 'billingDocDate', header: 'Billingdocdate' },
      // { field: 'materialType', header: 'Materialtype' },
      // { field: 'soType', header: 'Sotype' },
      // { field: 'soTypedesc', header: 'Sotypedesc' },
      // { field: 'billingDocTYPE', header: 'Billingdoctype' },
      //{ field: 'billingtypedesc', header: 'Billingtypedesc' },
      //   { field: 'divisionName', header: 'Devisionname' },
      // { field: 'soldToParty', header: 'soldToParty' },
      { field: 'soldToPartyName', header: 'Party name' },
      // { field: 'payer', header: 'Payer' },
      // { field: 'payerName', header: 'Payername' },
      { field: 'materialNumber', header: 'Code' },
      { field: 'materialDesc', header: 'Description' },
      { field: 'invoiceQty', header: 'Qty' },
      { field: 'basicAmtINR', header: 'Amount' },
      //{ field: 'totalvalue', header: 'Totalvalue' },
    ];
    this.dpservice.salesdetail = [];
    this.monthName = '';
    $('#basicExampleModal').modal('show');
    this.selected_eventdate = this.datePipe.transform(model.event.start, 'yyyy-MM-dd');
    this.loading = true;
    this.dpservice.getSaleCaldetail(this.selectedcode, this.selected_eventdate)
      .toPromise()
      .then(res => {
        this.dpservice.salesdetail = res as Salesdetail[];
        this.sumgetsale(false);
        this.loading = false;
      });
  }
  totalNetsales() {
    this.grand_netsales = 0;
    this.plantservice.splantlist.forEach(element => {
      this.grand_netsales = this.grand_netsales + element.totalVal;
    });
    return this.grand_netsales;
  }
  summary2() {
    const me = this;
    this.i = 1;
    me.netSalesTotal = 0;
    me.cancelInvTotal = 0;
    me.salesReturnTotal = 0;
    me.summaryDetail2 = [];
    me.dpservice.getNetSaleSummary(this.startdate)
      .toPromise()
      .then(res => {
        const result = res; //as Salesdetail[];
        if (result) {
          result.forEach(row => {
            if (!me.summaryDetail2[row.plant]) {
              me.summaryDetail2[row.plant] = [];
            }
            me.summaryDetail2[row.plant].push(row);
            if (result.length == me.i) {

              me.plantservice.splantlist.forEach(plant => {
                plant.totalVal = 0;

                plant.cancelInv = 0;
                plant.salesReturn = 0;
                plant.netSale = 0;
                plant.moulded = 0;

                if (me.summaryDetail2[plant.plantcode]) {
                  me.netSalesTotal = 0;
                  me.cancelInvTotal = 0;
                  me.salesReturnTotal = 0;
                  me.mouldedTotal = 0
                  me.summaryDetail2[plant.plantcode].forEach(sum => {
                    if (sum.mode == "netsale") {
                      plant.netSale = plant.netSale + sum.netSale;
                      me.netSalesTotal = me.netSalesTotal + sum.netSale;
                    }
                    if (sum.mode == "salereturn") {
                      plant.salesReturn = plant.salesReturn + sum.netSale;
                      me.salesReturnTotal = me.salesReturnTotal + sum.netSale;
                    }
                    if (sum.mode == "cancelinv") {
                      plant.cancelInv = plant.cancelInv + sum.netSale;
                      me.cancelInvTotal = me.cancelInvTotal + sum.netSale;
                    }
                    if (sum.mode == "Moulded") {
                      plant.moulded = plant.moulded + sum.netSale;
                      me.mouldedTotal = me.mouldedTotal + sum.netSale;
                    }
                  });
                  plant.totalVal = (me.netSalesTotal - (Math.abs(me.cancelInvTotal) + Math.abs(me.salesReturnTotal) + Math.abs(me.mouldedTotal)));
                  me.totalNetsales();
                }
              });
            }
            me.i = me.i + 1;
          });
          console.log("me.plantservice.splantlist", me.plantservice.splantlist);
        }
      });
  }
  summary() {
    $('#summaryModal').modal('show');
  }
  //top btn click
  extraVal(val) {
    this.modalType = 2;
    this.basicamtinr = 0;
    this.totalvalue = 0;
    this.totalSumofValue = 0;
    this.cols = [
      // { field: 'plant', header: 'Plant' },
      { field: 'plantName', header: 'Plant Name' },
      // { field: 'billingDocType', header: 'Billingdoctype' },
      { field: 'invoiceNumber', header: 'Invoiceno' },
      //{ field: 'accdocno', header: 'Accdocno' },
      { field: 'billingDocDate', header: 'Billingdocdate' },
      // { field: 'materialType', header: 'Materialtype' },
      //  { field: 'soType', header: 'Sotype' },
    ];
    this.cols.push(
      //   { field: 'soTypedesc', header: 'Sotypedesc' },
      { field: 'materialNumber', header: 'Materialnumber' },
      { field: 'materialDesc', header: 'Materialdesc' },
      { field: 'soldToParty', header: 'Soldtoparty' },
      { field: 'soldToPartyName', header: 'Soldtopartyname' },
      //  { field: 'payer', header: 'Payer' },
      // { field: 'payerName', header: 'Payername' },
    );
    if (val == "NetSaleDetail") {
      this.totalSumofTitle = "Tot. Net.";
      this.totalSumofBg = "bg-info";
      this.cols.push(
        { field: 'netSale', header: 'Net Sale' },
      );
    } else if (val == "GrosSaleDetail") {
      this.totalSumofTitle = "Tot. Gross";
      this.totalSumofBg = "bg-success";
      val = "NetSaleDetail";
      this.cols.push(
        { field: 'netSale', header: 'Gross Sale' },
      );
    } else if (val == "salesReturnDetail") {
    
      this.totalSumofTitle = "Tot. Return";
      this.totalSumofBg = "bg-danger";

      this.cols.push(
        { field: 'salesReturn', header: 'Sales Return' },
      );
    } else if (val == "cancelinvoicedetail") {
      this.totalSumofBg = "bg-warning";
      this.totalSumofTitle = "Tot. Cancel";
      this.cols.push(
        { field: 'cancelInvoice', header: 'Cancel Inv.' },
      );
    }
    else if (val == "purchasegroupmouldedsum") {
      this.totalSumofTitle = "Tot. Moulded";
      this.totalSumofBg = "bg-moulded";
      this.cols = [
        { field: 'plantShortName', header: 'Plant Name' },
        { field: 'acDocumentDate', header: 'AC Document Date' },
        { field: 'group', header: 'Group' },
        { field: 'vendorName', header: 'Vendor Name' },
        { field: 'narattion', header: 'Narattion' },
        { field: 'totalPurchase', header: 'Moulded' },
      ];

      this.dpservicePurchase.purchasedetail = [];
      this.monthName = this.datePipe.transform(this.sDate, 'yyyy-MM-d');
      $('#basicExampleModalforpurchase').modal('show');
      this.loading = true;

      this.dpservicePurchase.getPurchaseBtnClickEvent(val, this.selectedcode, this.startdate)
        .toPromise()
        .then(res => {
          this.dpservicePurchase.purchasedetail = res as Purchasedetail[];
          this.getSumForButtonEvent();
          this.loading = false;
        });

      return;
    }

    this.dpservice.salesdetail = [];
    this.monthName = this.datePipe.transform(this.sDate, 'yyyy-MM-d');
    $('#basicExampleModal').modal('show');
    this.loading = true;

    this.dpservice.getSales(this.selectedcode, this.startdate, val)
      .toPromise()
      .then(res => {
        this.dpservice.salesdetail = res as Salesdetail[];
        this.sumgetsale(val);
        this.loading = false;
      });

  }
  //sum
  getSumForButtonEvent() {
    this.totalSumofValue = 0;
    for (const sd of this.dpservicePurchase.purchasedetail) {
      this.totalSumofValue = (this.totalSumofValue + sd.totalPurchase);
    }
    return;
  }
  sumgetsale(val) {
    this.basicamtinr = 0;
    this.totalvalue = 0;
    this.totalSumofValue = 0;
    for (const sd of this.dpservice.salesdetail) {
      this.basicamtinr = this.basicamtinr + sd.basicAmtINR;
      this.totalvalue = this.totalvalue + sd.totalvalue;
      if (val == "NetSaleDetail") {
        this.totalSumofValue = (this.totalSumofValue + sd.netSale);
      } else if (val == "GrosSaleDetail") {
        this.totalSumofValue = (this.totalSumofValue + sd.grossSale);
      } else if (val == "salesReturnDetail") {
        this.totalSumofValue = (this.totalSumofValue + sd.salesReturn);
      } else if (val == "cancelinvoicedetail") {
        this.totalSumofValue = (this.totalSumofValue + sd.cancelInvoice);
      }
    }
    this.totalSumofValue = (this.totalSumofValue / 100000);
    //   this.basicamtinr = (this.basicamtinr / 100000);
    this.totalvalue = (this.totalvalue / 100000);
    return;
  }
  //selected plant 
  selectedPlanName() {
    const me = this;
    this.company_val = 0;
    if (this.plantservice && this.plantservice.splantlist && me.selectedcode) {
      this.plantservice.splantlist.forEach(function (element, i) {

        if (element.plantcode == me.selectedcode) {
          me.selected_plantname = element.plantshortname;
        }
        if (me.selectedcode == '1010') {
          me.company_val = 400;
        } else if (me.selectedcode == '1040') {
          me.company_val = 800;
        } else if (me.selectedcode == '1050') {
          me.company_val = 300;
        }

      });
    }
    // return this.selected_plantname;
  }
}
