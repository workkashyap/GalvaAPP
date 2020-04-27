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

import { Plant } from '../shared/plant/plant.model';
import { Salessummary } from '../shared/dailyProduction/salessummary.model';
@Component({
  selector: 'app-salescalendar',
  templateUrl: './salescalendar.component.html',
  styleUrls: ['./salescalendar.component.css'],
  providers: [DatePipe]
})
export class SalescalendarComponent implements OnInit {
  netSales: number = 0;
  salesRej: number = 0;
  grossSales: number = 0;
  cancelledInvoice: number = 0;
  totalSumofValue: number = 0;
  totalSumofTitle: string = '';

  basicamtinr: number = 0;
  totalvalue: number = 0;
  modalType: number = 0;
  public sDate: Date;
  public lDate: Date;
  public dailyprodlist: Dailyproduction[] = [];
  public salessummary: Salessummary[] = [];

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
    this.loading = true;
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
        if (res) {
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
    this.dpservice
      .getSalesCalendar(this.selectedcode, this.startdate)
      .toPromise()
      .then(res => {
        this.dpservice.dailyprodlist = res as Dailyproduction[];
        me.loadchart1();
        this.loading = false;
      });
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
      this.netSales = this.netSales / 100000;

    });

    this.dpservice.getGrossSale(this.selectedcode, this.startdate).toPromise().then(res => {
      const salesReturn = res as Salessummary[];
      salesReturn.forEach(element => {
        this.grossSales = element.grossSale;
      });
      this.grossSales = this.grossSales / 100000;

    });


    this.dpservice.getCancelInvoice(this.selectedcode, this.startdate).toPromise().then(res => {
      const salesReturn = res as Salessummary[];
      salesReturn.forEach(element => {
        this.cancelledInvoice = element.cancelInvoice;
      });
      this.cancelledInvoice = this.cancelledInvoice / 100000;

    });

    this.dpservice.getSalesReturn(this.selectedcode, this.startdate).toPromise().then(res => {
      const salesReturn = res as Salessummary[];
      salesReturn.forEach(element => {
        this.salesRej = element.salesReturn
      });
      this.salesRej = this.salesRej / 100000;
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
      { field: 'plant', header: 'Plant' },
      { field: 'plantName', header: 'Plant Name' },
      { field: 'invoiceNumber', header: 'Invoiceno' },
      { field: 'accDocNo', header: 'Accdocno' },
      { field: 'billingDocDate', header: 'Billingdocdate' },
      { field: 'materialType', header: 'Materialtype' },
      { field: 'soType', header: 'Sotype' },
      { field: 'soTypedesc', header: 'Sotypedesc' },
      { field: 'billingDocTYPE', header: 'Billingdoctype' },
      { field: 'billingtypedesc', header: 'Billingtypedesc' },
      { field: 'divisionName', header: 'Devisionname' },
      { field: 'soldToParty', header: 'soldToParty' },
      { field: 'soldToPartyName', header: 'Soldtopartyname' },
      { field: 'payer', header: 'Payer' },
      { field: 'payerName', header: 'Payername' },
      { field: 'materialNumber', header: 'Materialnumber' },
      { field: 'materialDesc', header: 'Materialdesc' },
      { field: 'invoiceQty', header: 'Invoiceqty' },
      { field: 'basicAmtINR', header: 'Basicamtinr' },
      { field: 'totalvalue', header: 'Totalvalue' },
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
  //top btn click
  extraVal(val) {
    this.modalType = 2;
    this.basicamtinr = 0;
    this.totalvalue = 0;
    this.totalSumofValue = 0;
    this.cols = [
      { field: 'plant', header: 'Plant' },
      { field: 'plantName', header: 'Plant Name' },
      { field: 'billingDocType', header: 'Billingdoctype' },
      { field: 'invoiceNumber', header: 'Invoiceno' },
      { field: 'accdocno', header: 'Accdocno' },
      { field: 'billingDocDate', header: 'Billingdocdate' },
      { field: 'materialType', header: 'Materialtype' },
      { field: 'soType', header: 'Sotype' },];
    if (val == "NetSaleDetail") {
      this.totalSumofTitle = "Tot. Net.";
      this.cols.push(
        { field: 'netSale', header: 'Net Sale' },
      );
    } else if (val == "GrosSaleDetail") {
      this.totalSumofTitle = "Tot. Gross";

      this.cols.push(
        { field: 'grossSale', header: 'Gross Sale' },
      );
    } else if (val == "SalesreturnDetail") {

      this.totalSumofTitle = "Tot. Return";

      this.cols.push(
        { field: 'salesReturn', header: 'Sales Return' },
      );
    } else if (val == "cancelinvoicedetail") {
      this.totalSumofTitle = "Tot. Cancel";
      this.cols.push(
        { field: 'cancelInvoice', header: 'Cancel Inv.' },
      );
    }
    this.cols.push(
      { field: 'soTypedesc', header: 'Sotypedesc' },
      { field: 'materialNumber', header: 'Materialnumber' },
      { field: 'materialDesc', header: 'Materialdesc' },
      { field: 'soldToParty', header: 'Soldtoparty' },
      { field: 'soldToPartyName', header: 'Soldtopartyname' },
      { field: 'payer', header: 'Payer' },
      { field: 'payerName', header: 'Payername' },
    );

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
  sumgetsale(val) {
    this.basicamtinr = 0;
    this.totalvalue = 0;
    this.totalSumofValue = 0;
    for (const sd of this.dpservice.salesdetail) {
      this.basicamtinr = this.basicamtinr + sd.basicAmtINR;
      this.totalvalue = this.totalvalue + sd.totalvalue;
      if (val == "NetSaleDetail") {
        this.totalSumofValue = (this.totalSumofValue + sd.netSale) / 100000;
      } else if (val == "GrosSaleDetail") {
        this.totalSumofValue = (this.totalSumofValue + sd.grossSale) / 100000;
      } else if (val == "SalesreturnDetail") {
        this.totalSumofValue = (this.totalSumofValue + sd.salesReturn) / 100000;
      } else if (val == "SalesreturnDetail") {
        this.totalSumofValue = (this.totalSumofValue + sd.salesReturn) / 100000;
      } else if (val == "cancelinvoicedetail") {
        this.totalSumofValue = (this.totalSumofValue + sd.cancelInvoice) / 100000;
      }
    }
    this.basicamtinr = (this.basicamtinr / 100000);
    this.totalvalue = (this.totalvalue / 100000);
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
