import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/login/User.model';
import { ActionplanService } from 'src/app/shared/inbox/actionplan.service';
import { LoginService } from 'src/app/shared/login/login.service';
import { DatePipe } from '@angular/common';

import { Router } from '@angular/router';
import { DailyproductionService } from 'src/app/shared/dailyProduction/dailyproduction.service';
import { PlantService } from 'src/app/shared/plant/plant.service';
import { Salesdetail } from '../shared/dailyProduction/salesdetail.model';
import { Plant } from '../shared/plant/plant.model';

@Component({
  selector: 'app-sales-detail',
  styleUrls: ['./sales-detail.component.css'],
  templateUrl: './sales-detail.component.html',
  providers: [DatePipe],
  styles: [`
  :host ::ng-deep .ui-table .ui-table-thead > tr > th {
    position: -webkit-sticky;
    position: sticky;
    background: blue;
    color: white;
    font-size:9px;
    top: 0px;
    z-index: 1;
  }
  body .ui-table .ui-table-tbody > tr > td {
    font-size: 9px;
  }
  :host ::ng-deep .ui-table-resizable > .ui-table-wrapper {
    overflow-x: initial !important;
  }

  :host ::ng-deep .ui-table-resizable .ui-resizable-column {
    position: sticky !important;
  }

  @media screen and (max-width: 64em) {
    :host ::ng-deep .ui-table .ui-table-thead > tr > th {
      top: 0px;
    }
  }

`]
})
export class SalesDetailComponent implements OnInit {
  totalSumofValue: number = 0;
  selectedItemrej: Salesdetail;

  plantcode: any;
  totalSumofBg: string = '';
  totalSumofTitle: string = '';

  public currentUser: User;
  public loading = false;

  public cDate: string;
  public todayDate: Date;
  public login: string;
  public Fromdate: string;
  public Todate: string;
  public selectedPlant: string;
  public selectedtype: string;
  cols: any[];
  selectedItemrejarray: Salesdetail[] = [];
  filterItemrejarray: Salesdetail[] = [];
  iv: number;
  filterenable = false;

  constructor(
    public acservice: ActionplanService,
    private lservice: LoginService,
    public dpservice: DailyproductionService,
    private router: Router,
    private datePipe: DatePipe,
    public plantservice: PlantService,
  ) {
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    this.cDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.selectedtype = '0';
  }

  ngOnInit() {
    let me = this;
    if (!this.dpservice.date) {
      console.log(this.dpservice.date);
      this.Fromdate = this.cDate;
      this.Todate = this.cDate;
    }
    else {
      this.Fromdate = this.dpservice.date.replace('T00:00:00', '');
      this.Todate = this.dpservice.date.replace('T00:00:00', '');
    }

    this.cols = [
      { field: 'plantName', header: 'Plant Name' },
      { field: 'billingDocTYPE', header: 'Billingdoctype' },
      { field: 'invoiceNumber', header: 'Invoiceno' },
      { field: 'accDocNo', header: 'Accdocno' },
      { field: 'billingDocDate', header: 'Billingdocdate' },
      { field: 'materialType', header: 'Materialtype' },
      { field: 'soType', header: 'Sotype' },
      { field: 'soTypedesc', header: 'Sotypedesc' },
      { field: 'materialNumber', header: 'Material No.' },
      { field: 'materialDesc', header: 'Materialdesc' },
      { field: 'soldToParty', header: 'Soldtoparty' },
      { field: 'soldToPartyName', header: 'Soldtopartyname' },
      { field: 'payer', header: 'Payer' },
      { field: 'payerName', header: 'Payername' },
      { field: 'basicAmtINR', header: 'BasicAmtINR' },

    ];
    this.plantservice
      .sgetPlantData(me.currentUser.id)
      .toPromise()
      .then(res => {
        me.plantservice.plantlist = res as Plant[];
        me.plantcode = me.plantservice.plantlist[0].plantcode;
        this.loadData();
      });
  }
  onselecttype(ev) {
    this.selectedtype = ev;
  }
  loadData() {
    let me = this;
    this.totalSumofValue = 0;

    this.dpservice.salesdetail = [];

    this.loading = true;
    this.dpservice.getSalesDetail(this.plantcode, this.Fromdate, this.Todate)
      .toPromise()
      .then(res => {
        const salesdetail = res as Salesdetail[];
        salesdetail.forEach(sales_detail => {
          console.log("billingDocTYPE : ", sales_detail.billingDocTYPE);
          if (this.selectedtype == "salesReturn") {
            if (sales_detail.billingDocTYPE == "ZRET") {
              console.log("salesReturn");
              this.dpservice.salesdetail.push(sales_detail);
            } else if (sales_detail.billingDocTYPE == "ZCR") {
              console.log("salesReturn");
              this.dpservice.salesdetail.push(sales_detail);
            }
            else if (sales_detail.billingDocTYPE == "G2") {
              console.log("salesReturn");
              this.dpservice.salesdetail.push(sales_detail);
            }
          } else if (this.selectedtype == "netSales") {

            if (sales_detail.billingDocTYPE == "ZDOM") {
              this.dpservice.salesdetail.push(sales_detail); console.log("netSales");
            } else if (sales_detail.billingDocTYPE == "ZJOB") {
              this.dpservice.salesdetail.push(sales_detail); console.log("netSales");
            } else if (sales_detail.billingDocTYPE == "ZRAW") {
              this.dpservice.salesdetail.push(sales_detail); console.log("netSales");

            } else if (sales_detail.billingDocTYPE == "S2") {
              this.dpservice.salesdetail.push(sales_detail); console.log("netSales");

            } else if (sales_detail.billingDocTYPE == "ZDR") {
              this.dpservice.salesdetail.push(sales_detail); console.log("netSales");
            }

          } else if (this.selectedtype == "cancelInvoice") {
            if (sales_detail.billingDocTYPE == "S1") {
              console.log("cancelInvoice");
              this.dpservice.salesdetail.push(sales_detail);
            }
          } else if (this.selectedtype == "0") {
            this.dpservice.salesdetail = res as Salesdetail[];
          }
        });
        //this.dpservice.salesdetail = res as Salesdetail[];
        console.log("dpservice.salesdetail : ", this.dpservice.salesdetail);
        this.sumgetsale(this.selectedtype);
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
      if (c.payerName.toString().includes(ev.toString()) || c.invoiceNumber.toString().includes(ev.toString())
        || c.materialType.toString().includes(ev.toString()
          || c.plant.toString().includes(ev.toString()) || c.id.toString().includes(ev.toString()))) {
        this.filterItemrejarray.push(this.selectedItemrejarray[this.iv]);
        this.iv += 1;
      }
      else {
        this.iv += 1;
      }
    }
    this.sumgetsale(this.selectedtype);
  }
  sumgetsale(val) {
    this.totalSumofValue = 0;
    if (this.filterenable == true) {
      for (const sd of this.filterItemrejarray) {
        this.totalSumofValue = (this.totalSumofValue + sd.basicAmtINR);
      }
      // this.totalSumofValue = (this.totalSumofValue / 100000);
      return;
    }
    for (const sd of this.dpservice.salesdetail) {
      this.totalSumofValue = (this.totalSumofValue + sd.basicAmtINR);
    }
    // this.totalSumofValue = (this.totalSumofValue / 100000);
    return;
  }
  selectedGrid(ev) {
    this.selectedPlant = ev;
  }
  backtoRejection() {
    this.router.navigate(['./rejection']);
  }
  setPlan(ev) {
    this.acservice.actionplanData.loginid = Number(ev);
  }
}
