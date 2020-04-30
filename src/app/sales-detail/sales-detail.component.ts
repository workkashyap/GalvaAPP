import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/login/User.model';
import { ActionplanService } from 'src/app/shared/inbox/actionplan.service';
import { LoginService } from 'src/app/shared/login/login.service';
import { DatePipe } from '@angular/common';

import { Router } from '@angular/router';
import { DailyproductionService } from 'src/app/shared/dailyProduction/dailyproduction.service';
import { PlantService } from 'src/app/shared/plant/plant.service';
import { Salesdetail } from '../shared/dailyProduction/salesdetail.model';

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
    top: 0px;
    z-index: 1;
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
    this.selectedtype = "NetSaleDetail";
    this.plantcode = 1010;
  }
  onselecttype(ev) {
    this.selectedtype = ev;
  }
  loadData() {

    this.totalSumofValue = 0;
    this.cols = [
      { field: 'plant', header: 'Plant' },
      { field: 'plantName', header: 'Plant Name' },
      { field: 'billingDocType', header: 'Billingdoctype' },
      { field: 'invoiceNumber', header: 'Invoiceno' },
      { field: 'accdocno', header: 'Accdocno' },
      { field: 'billingDocDate', header: 'Billingdocdate' },
      { field: 'materialType', header: 'Materialtype' },
      { field: 'soType', header: 'Sotype' },
      { field: 'soTypedesc', header: 'Sotypedesc' },
      { field: 'materialNumber', header: 'Materialnumber' },
      { field: 'materialDesc', header: 'Materialdesc' },
      { field: 'soldToParty', header: 'Soldtoparty' },
      { field: 'soldToPartyName', header: 'Soldtopartyname' },
      { field: 'payer', header: 'Payer' },
      { field: 'payerName', header: 'Payername' },
    ];
    if (this.selectedtype == "NetSaleDetail") {
      this.totalSumofTitle = "Tot. Net.";
      this.totalSumofBg = "bg-info";
      this.cols.push({ field: 'netSale', header: 'Net Sale' });
      
    } else if (this.selectedtype == "GrosSaleDetail") {
      this.totalSumofTitle = "Tot. Gross";
      this.totalSumofBg = "bg-success";
      this.cols.push({ field: 'grossSale', header: 'Gross Sale' });

    } else if (this.selectedtype == "salesReturnDetail") {
      this.totalSumofTitle = "Tot. Return";
      this.totalSumofBg = "bg-danger";
      this.cols.push({ field: 'salesReturn', header: 'Sales Return' });

    } else if (this.selectedtype == "cancelinvoicedetail") {
      this.totalSumofBg = "bg-warning";
      this.totalSumofTitle = "Tot. Cancel";
      this.cols.push({ field: 'cancelInvoice', header: 'Cancel Inv.' });
    }

    this.dpservice.salesdetail = [];
    this.loading = true;
    this.dpservice.getSales(this.plantcode, this.Fromdate, this.selectedtype)
      .toPromise()
      .then(res => {
        this.dpservice.salesdetail = res as Salesdetail[];
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
      return;
    }
    for (const sd of this.dpservice.salesdetail) {
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
    return;
  }
  ngOnInit() {
    if (!this.dpservice.date) {
      console.log(this.dpservice.date);
      this.Fromdate = this.cDate;
      this.Todate = this.cDate;
    }
    else {
      this.Fromdate = this.dpservice.date.replace('T00:00:00', '');
      this.Todate = this.dpservice.date.replace('T00:00:00', '');
    }
    this.plantservice.getPlantData(this.currentUser.id);

    this.loadData()

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
