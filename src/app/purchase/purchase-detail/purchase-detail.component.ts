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
  selector: "app-purchase-detail",
  templateUrl: "./purchase-detail.component.html",
  styleUrls: ["./purchase-detail.component.css"],
  providers: [DatePipe],
  styles: [
    `
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
    `
  ]
})
export class PurchaseDetailComponent implements OnInit {
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


  netPayableToVendorSum: number = 0;
  totalValueSum: number = 0;
  materialValueSum: number = 0;

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
      //  { field: 'id', header: 'ID' },
      //  { field: "grnNoMIGO", header: "grnNoMIGO" },
      //  { field: "dateOfGRN", header: "dateOfGRN" },
      // { field: "entryNoMIRO", header: "entryNoMIRO" },
      // { field: "miroDate", header: "miroDate" },
      { field: "acDocumentNo", header: "acDocumentNo" },
      { field: "acDocumentDate", header: "acDocumentDate" },
      //{ field: "poDocType", header: "poDocType" },
      { field: "poDocName", header: "poDocName" },
      { field: "purchaseOrder", header: "purchaseOrder" },
      // { field: "businessPartnerGroup", header: "businessPartnerGroup" },
      { field: "vendorCode", header: "vendorCode" },
      { field: "vendorName", header: "vendorName" },
      { field: "vendorInvoiceNo", header: "vendorInvoiceNo" },
      { field: "vendorInvoiceDate", header: "vendorInvoiceDate" },
      //  { field: "grouping", header: "grouping" },
    ];

    this.subcols = [
      // { field: 'id', header: 'ID' },
      { field: "acDocumentNo", header: "acDocumentNo" },
      { field: "acDocumentDate", header: "acDocumentDate" },
      { field: "glCode", header: "glCode" },
      { field: "glName", header: "glName" },
      { field: "narattion", header: "narattion" },
      { field: "material", header: "material" },
      { field: "materialDescription", header: "materialDescription" },
      { field: "materialQuantity", header: "materialQuantity" },
      { field: "materialRate", header: "materialRate" },
      { field: "materialValue", header: "materialValue" },
      { field: "totalValue", header: "totalValue" },
      { field: "netPayableToVendor", header: "netPayableToVendor" },
      { field: "costCentre", header: "costCentre" },
      { field: "materialGroup", header: "materialGroup" },

      // { field: "unitOfMeasurement", header: "unitOfMeasurement" },
      // { field: "materialType", header: "materialType" },
      // { field: "cancellation", header: "cancellation" },
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
    this.dpservice
      .getPurchaseDetail(me.selectedPlant, me.Fromdate, me.Todate)
      .toPromise()
      .then(res => {
        me.dpservice.purchase = res as Purchase[];
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
        c.poDocName.toString().includes(ev.toString()) ||
        c.purchaseOrder.toString().includes(ev.toString() ||
          c.vendorCode.toString().includes(ev.toString()) ||
          c.vendorInvoiceNo.toString().includes(ev.toString()) ||
          c.vendorInvoiceDate.toString().includes(ev.toString())
        )
      ) {
        this.filterItemrejarray.push(this.selectedItemrejarray[this.iv]);
        this.iv += 1;
      } else {
        this.iv += 1;
      }
    }
  }

  onRowSelect(ev) {
    this.selectedItemrej = ev.data;
    this.loading = true;
    this.dpservice.purchaseLineDetail = [];
    this.dpservice.getPurchaseLineDetail(this.selectedItemrej.acDocumentNo).toPromise()
      .then(res => {
        this.dpservice.purchaseLineDetail = res as Purchase[];
        this.sumOfvalues();
        this.loading = false;
      });
    $("#basicExampleModal").modal("show");
  }
  sumOfvalues() {
    this.materialValueSum = 0;
    this.totalValueSum = 0;
    this.netPayableToVendorSum = 0;
    this.dpservice.purchaseLineDetail.forEach(element => {
      this.materialValueSum = this.materialValueSum + element.materialValue;
      this.totalValueSum = this.totalValueSum + element.totalValue;
      this.netPayableToVendorSum = this.netPayableToVendorSum + element.netPayableToVendor;
    });
  }
}
