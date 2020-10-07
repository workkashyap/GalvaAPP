import { Component, OnInit } from "@angular/core";
import { User } from "src/app/shared/login/User.model";
import { Inbox } from "src/app/shared/inbox/inbox.model";
import { ActionplanService } from "src/app/shared/inbox/actionplan.service";
import { LoginService } from "src/app/shared/login/login.service";
import { InboxService } from "src/app/shared/inbox/inbox.service";
import { DatePipe } from "@angular/common";
import { PurchaseService } from "src/app/shared/purchase/purchase.service";
import { Plant } from '../../shared/plant/plant.model';

import { UserService } from "src/app/shared/user/user.service";
import { PlantService } from "src/app/shared/plant/plant.service";
import { Purchase } from 'src/app/shared/purchase/purchase.model';

@Component({
  selector: "app-purchase-detail-report",
  templateUrl: "./purchase-detail-report.component.html",
  styleUrls: ["./purchase-detail-report.component.css"],
  providers: [DatePipe],
  styles: [
    `:host ::ng-deep .ui-table .ui-table-thead > tr > th {
      position: -webkit-sticky;
      position: sticky;
      background: blue;
      color: white;
      font-size:10px;
      top: 0px;
      z-index: 1;
    }
    :host ::ng-deep .ui-table-resizable .ui-resizable-column {
      position: sticky !important;
    }
  
    @media screen and (max-width: 64em) {
      :host ::ng-deep .ui-table .ui-table-thead > tr > th {
        top: 0px;
      }
    }
    
    :host ::ng-deep .ui-table-resizable > .ui-table-wrapper > table{
      transform:rotateX(180deg);
      -ms-transform:rotateX(180deg); /* IE 9 */
      -webkit-transform:rotateX(180deg);
    }
    :host ::ng-deep .ui-table-resizable > p-paginator > div {
      transform: rotateX(180deg);
      -ms-transform: rotateX(180deg);
      -webkit-transform: rotateX(180deg);
    }
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
export class PurchaseDetailReportComponent implements OnInit {
  public currentUser: User;
  public loading = false;
  public inbox: Inbox;
  public cDate: string;
  public todayDate: Date;
  public login: string;
  public Fromdate: string;
  public Todate: string;
  public selectedPlant: string;

  cols: any[];
  subcols: any[];
  editcols: any[];
  actions: any[];
  selectedItemrej: Purchase;
  selectedItemrejarray: Purchase[] = [];
  filterItemrejarray: Purchase[] = [];
  public totalRejValueSum: any;
  public totalQtySum: any;
  public plant_name: string;
  totalRejQty: number;
  totalinsQty: number;
  totalRejPer: number;
  totalRejVal: number;
  iv: number;
  filterenable = false;

  materialQuantity: number = 0;
  materialValue: number = 0;

  constructor(
    public acservice: ActionplanService,
    public dpservice: PurchaseService,
    private lservice: LoginService,
    public service: InboxService,
    public uservice: UserService,
    private datePipe: DatePipe,
    public plantservice: PlantService
  ) {
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    this.cDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  }
  ngOnInit() {
    let me = this;
    this.Fromdate = this.cDate;
    this.Todate = this.cDate;

    this.cols = [
      { field: "acDocumentNo", header: "Ac Document No" },
      { field: "acDocumentDate", header: "Ac Document Date" },
      { field: "vendorCode", header: "Vendor Code" },
      { field: "vendorName", header: "Vendor Name" },
      { field: "vendorInvoiceNo", header: "Vendor Invoice No" },
      { field: "vendorInvoiceDate", header: "Vendor Invoice Date" },
      { field: "gLcode", header: "Gl Code" },
      { field: "glName", header: "Gl Name" },
      { field: "narattion", header: "Narattion" },
      { field: "material", header: "Material" },
      { field: "materialDescription", header: "Material Desc" },
      { field: "unitOfMeasurement", header: "Unit Of Measu" },
      { field: "materialValue", header: "Material Value" },
      { field: "materialQuantity", header: "Material Qty" },
      { field: "materialRate", header: "Material Rate" },
      { field: "materialGroup", header: "Material Group" },
      { field: "materialType", header: "Material Type" },
      { field: "grouping", header: "Grouping" },
    ];

    this.plantservice
      .sgetPlantData(me.currentUser.id)
      .toPromise()
      .then(res => {
        me.plantservice.plantlist = res as Plant[];
        me.selectedPlant = me.plantservice.plantlist[0].plantcode;
        me.plant_name = me.plantservice.plantlist[0].plantshortname;
        this.getPurchaseDetail();
      });
  }
  getPurchaseDetail() {
    let me = this;
    this.filterenable = false;
    me.loading = true;
    me.dpservice.purchase = [];

    this.materialQuantity = 0;
    this.materialValue = 0;

    this.dpservice
      .getPurchaseDetailReport(me.selectedPlant, me.Fromdate, me.Todate)
      .toPromise()
      .then(res => {
        me.dpservice.purchase = res as Purchase[];
        me.sumOfvalues();
        me.loading = false;
      });
  }
  selectedGrid(ev) {
    this.selectedPlant = ev;
    const me = this;
    if (this.plantservice && this.plantservice.plantlist && me.selectedPlant) {
      this.plantservice.plantlist.forEach(function (element, i) {
        if (element.plantcode == me.selectedPlant) {
          me.plant_name = element.plantshortname;
        }
      });
    }
  }


  loadper(ev, dt) {
    this.filterenable = true;
    this.selectedItemrejarray = dt.value;
    this.iv = 0;
    this.filterItemrejarray = [];
    // console.log(this.selectedItemrejarray[0].id);
    for (const c of this.selectedItemrejarray) {
      if (
        c.acDocumentNo.toString().includes(ev.toString()) ||
        c.acDocumentDate.toString().includes(ev.toString()) ||
        c.vendorName.toString().includes(ev.toString()) ||
        c.vendorInvoiceNo.toString().includes(ev.toString()) ||
        c.vendorCode.toString().includes(ev.toString()) ||
        c.vendorInvoiceNo.toString().includes(ev.toString()) ||
        c.vendorInvoiceDate.toString().includes(ev.toString())
      ) {
        this.filterItemrejarray.push(this.selectedItemrejarray[this.iv]);
        this.iv += 1;
      } else {
        this.iv += 1;
      }
    }
    this.sumOfvalues();
  }

  sumOfvalues() {
    this.materialQuantity = 0;
    this.materialValue = 0;
    if (this.filterenable) {
      this.filterItemrejarray.forEach(element => {
        this.materialQuantity += element.materialQuantity;
        this.materialValue += element.materialValue;
      });
      return;
    }
    this.dpservice.purchase.forEach(element => {
      this.materialQuantity += element.materialQuantity;
      this.materialValue += element.materialValue;
    });
  }
}
