import { Component, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { User } from 'src/app/shared/login/User.model';
import { PlantService } from 'src/app/shared/plant/plant.service';
import { LoginService } from 'src/app/shared/login/login.service';
import { PurchaseService } from 'src/app/shared/purchase/purchase.service';
import { Plant } from 'src/app/shared/plant/plant.model';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { Purchase } from 'src/app/shared/purchase/purchase.model';

@Component({
  selector: 'app-purchase-detail-grid',
  templateUrl: './purchase-detail-grid.component.html',
  styleUrls: ['./purchase-detail-grid.component.css'],
  providers: [DatePipe],
  styles: [
    `
      :host ::ng-deep .ui-table .ui-table-thead > tr > th {
        position: -webkit-sticky;
        position: sticky;
        background: blue;
        color: white;
        font-size:10px;
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

export class PurchaseDetailGridComponent implements OnInit {

  public currentUser: User;
  public loading = false;
  public cDate: string;
  public Fromdate: string;
  public Todate: string;
  public selectedPlant: any;
  public selectedCategory: any;
  public plant_name: string;
  public totalPurchase: number = 0;
  public show: boolean = false;

  rowData: any[] = [];
  tempData: any[] = [];
  tempvalData: any[] = [];
  subcols: any[] = [];
  valueData: any[] = [];
  gridApi: any;

  selectedItemrej: any;
  materialValueSum = 0;
  totalValueSum = 0;
  netPayableToVendorSum = 0;

  groupDefaultExpanded = 0;
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 50,
    sortable: false,
    floatingFilter: false,
    resizable: true,
  };
  public autoGroupColumnDef: ColDef = {
    minWidth: 50,
    width: 250,
    maxWidth: 500,
    resizable: true,
    pinned: 'left',
    suppressFiltersToolPanel:true
  };

  dateformatter = params => {
    var dateAsString = params.data.date;
    var dateParts = dateAsString.split("/");
    return `${dateParts[0]} - ${dateParts[1]} - ${dateParts[2]}`;
  }

  public columnDefs: ColDef[] = [
    { headerName: 'Category', field: 'category', enableRowGroup: true, rowGroup: true, hide: true, cellStyle: { fontSize: '13px' } },
    { headerName: 'VndrName', field: 'vendorName', cellStyle: { fontSize: '12px' } },
    { headerName: 'VndrCod', field: 'vendorCode', cellStyle: { fontSize: '12px' } },
    { headerName: 'PO Name', field: 'poDocName', cellStyle: { fontSize: '12px' } },
    { headerName: 'PO No.', field: 'purchaseOrder', cellStyle: { fontSize: '12px' } },
    { headerName: 'GRN No', field: 'grnNoMIGO', cellStyle: { fontSize: '12px' } },
    { headerName: 'GRN Date', field: 'dateOfGRN', cellStyle: { fontSize: '12px' } },
    { headerName: 'Inv Date', field: 'vendorInvoiceDate', cellStyle: { fontSize: '12px' } },
    { headerName: 'Inv No', field: 'vendorInvoiceNo', cellStyle: { fontSize: '12px' } },
    { headerName: 'AcDoc No', field: 'acDocumentNo', cellStyle: { fontSize: '12px' } },
    { headerName: 'Doc Name', field: 'poDocName', cellStyle: { fontSize: '12px' } },
  ];

  constructor(
    private datePipe: DatePipe,
    public plantservice: PlantService,
    public purchaseservice: PurchaseService,
    private lservice: LoginService,
  ) {
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    this.cDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  }

  async ngOnInit() {
    this.subcols = [
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
    ];

    this.Fromdate = this.cDate;
    this.Todate = this.cDate;
    this.purchaseservice.getsubgroup()
    this.purchaseservice.getmaingroup()
    this.selectedCategory = "ALL";
    await this.purchaseservice.getCategory();
    await this.plantservice
      .sgetPlantData(this.currentUser.id)
      .toPromise()
      .then(res => {
        this.plantservice.plantlist = res as Plant[];
        this.selectedPlant = this.plantservice.plantlist[0].plantcode;
        this.plant_name = this.plantservice.plantlist[0].plantshortname;
      });
    this.getPurchaseDetail();
  }

  async getPurchaseDetail() {
    this.loading = true;
    this.totalPurchase = 0;

    await this.purchaseservice
      .getPurchaseDetailTotal(this.selectedPlant, this.Fromdate, this.Todate)
      .toPromise()
      .then(res => { res.length > 0 ? this.totalPurchase = res[0].totalPurchase : null }).catch(err => { console.log(err); });


    await this.purchaseservice.getPurchaseDetail(this.selectedPlant, this.Fromdate, this.Todate).toPromise()
      .then(res => {
        this.rowData = res;
      }).catch(err => { console.log(err); });

    await this.purchaseservice.getPurchaseCategorySum(this.selectedPlant, this.Fromdate, this.Todate).toPromise()
      .then((res) => {
        this.valueData = res;
      }).catch((err) => { console.error(err); });
    this.rowData.forEach(e => {
      e.dateOfGRN ? e.dateOfGRN = this.datePipe.transform(e.dateOfGRN, "dd-MM-yyyy") : null;
      e.vendorInvoiceDate ? e.vendorInvoiceDate = this.datePipe.transform(e.vendorInvoiceDate, "dd-MM-yyyy") : null;
      e.category == null ? e.category = "No Category" : null;
    });
    this.loading = false;
    this.tempData = this.rowData;
    this.tempvalData = this.valueData;
    this.filterCategory();
  }

  filterCategory() {
    if (this.selectedCategory == "ALL") {
      this.rowData = this.tempData;
      this.valueData = this.tempvalData;
      return;
    }
    this.rowData = this.tempData;
    this.valueData = this.tempvalData;
    this.rowData = this.rowData.filter(e => e.category == this.selectedCategory);
    this.valueData = this.valueData.filter(e => e.category == this.selectedCategory);
    console.log(this.valueData);

  }

  onGridReady(params: GridReadyEvent) { this.gridApi = params.api; }

  getRowStyle = params => {
    if (params.node.footer) {
      return { background: 'PowderBlue', fontWeight: 'bolder' };
    }
  };

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

  selectionChange() {
    let srow = this.gridApi.getSelectedRows();
    console.log(srow);
    if (srow.length > 0) {
      this.selectedItemrej = srow[0];
      this.loading = true;
      this.purchaseservice.purchaseLineDetail = [];
      this.purchaseservice.getPurchaseLineDetail(this.selectedItemrej.acDocumentNo).toPromise()
        .then(res => {
          this.purchaseservice.purchaseLineDetail = res as Purchase[];
          this.sumOfvalues();
          this.loading = false;
        });
      this.purchaseservice.groupid = this.selectedItemrej.id;
      this.purchaseservice.getsubGroupDetail(this.selectedItemrej.id)
      $("#basicExampleModal").modal("show");
      this.loading = false;
    }
  }

  updategroup() {
    this.purchaseservice.putmaingroup();
  }

  sumOfvalues() {
    this.materialValueSum = 0;
    this.totalValueSum = 0;
    this.netPayableToVendorSum = 0;
    this.purchaseservice.purchaseLineDetail.forEach(element => {
      this.materialValueSum = this.materialValueSum + element.materialValue;
      this.totalValueSum = this.totalValueSum + element.totalValue;
      this.netPayableToVendorSum = this.netPayableToVendorSum + element.netPayableToVendor;
    });
  }

}
