import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/login/User.model';
import { LoginService } from 'src/app/shared/login/login.service';
import { DatePipe } from '@angular/common';
import { PlantService } from 'src/app/shared/plant/plant.service';
import { Plant } from '../shared/plant/plant.model';
import { Salesinfo } from '../shared/sales/salesinfo.model';
import { SalesinfoService } from '../shared/sales/salesinfo.service';

@Component({
  selector: 'app-salesitem',
  styleUrls: ['./salesitem.component.css'],
  templateUrl: './salesitem.component.html',
  providers: [DatePipe],

  styles: [`
  :host ::ng-deep .ui-table .ui-table-thead > tr > th {
    font-size:10px;
  }
  :host ::ng-deep .ui-table .ui-table-tbody tr > td {
    font-size: 10px;
  }
  th.sub-heading.ui-sortable-column {
    background: blue !important;
    color: white !important;
  }
  
`]
})
export class SalesitemComponent implements OnInit {
  selectedItemrej: Salesinfo;
  salesDetailInfo: any;

  plantcode: any;
  totalNetSale: number = 0;

  public currentUser: User;
  public loading = false;
  loadingSubData: boolean = false;
  public cDate: string;
  public todayDate: Date;
  public login: string;
  public Fromdate: string;
  public Todate: string;
  public selectedPlant: string;

  cols: any[];
  selectedItemrejarray: any;
  filterItemrejarray: any;

  iv: number;
  filterenable = false;

  constructor(
    private lservice: LoginService,
    public sinservice: SalesinfoService,
    private datePipe: DatePipe,
    public plantservice: PlantService,
  ) {
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    this.cDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  }

  ngOnInit() {
    let me = this;
    this.Fromdate = this.cDate;
    this.Todate = this.cDate;


    this.cols = [
      { field: 'action', header: '+' },
      { field: 'netsale', header: 'Netsale' },
      { field: 'soldToParty', header: 'Sold To Customer' },
      { field: 'soldToPartyName', header: 'Sold To Customer Name' },
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

  loadData() {
    const me = this;
    this.salesDetailInfo = [];
    this.totalNetSale = 0;
    this.loading = true;
    this.sinservice.netSaleSumItem(this.plantcode, this.Fromdate, this.Todate)
      .toPromise()
      .then(res => {
        me.salesDetailInfo = res as Salesinfo[];

        me.sumgetsale();
        me.loading = false;
      }, error => {
        me.loading = false;
      });
  }
  selectedGrid(ev) {
    this.selectedPlant = ev;
  }

  loadper(ev, dt) {
    this.filterenable = true;
    const selectedItemrejarray = this.salesDetailInfo;
    this.iv = 0;
    this.filterItemrejarray = [];
    // console.log(this.selectedItemrejarray[0].id);
    for (const c of selectedItemrejarray) {
      if (c.materialDesc.toString().includes(ev.toString()) ||
        c.materialNumber.toString().includes(ev.toString())) {
        this.filterItemrejarray.push(selectedItemrejarray[this.iv]);
        this.iv += 1;
      }
      else {
        this.iv += 1;
      }
    }
    this.sumgetsale();
  }
  sumgetsale() {
    this.totalNetSale = 0;
    if (this.filterenable == true) {
      for (const sd of this.filterItemrejarray) {
        this.totalNetSale += sd.netsale;
      }
      return;
    }
    this.salesDetailInfo.forEach(element => {
      this.totalNetSale += element.netsale;
    });
    return;
  }
  getSubData(product) {
    console.log("product : ", product);
    if (!product.list) {
      product.list = [];
    }
    if (product.list && product.list.length > 0) {
      return;
    }
    this.loadingSubData = true;
    this.sinservice.netSaleSumItemDetail(product.materialNumber, this.plantcode, this.Fromdate, this.Todate)
      .toPromise()
      .then(res => {
        product.list = res as Salesinfo[];
        this.loadingSubData = false;
      }, error => {
        this.loadingSubData = false;
      });

  }
}
