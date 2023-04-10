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
import * as moment from 'moment';

@Component({
  selector: 'app-purchase-detail-grid',
  templateUrl: './purchase-detail-grid.component.html',
  styleUrls: ['./purchase-detail-grid.component.css'],
  providers: [DatePipe],
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
  totalPurchase: number = 0;

  rowData: any[] = [];
  tempData: any[] = [];

  groupDefaultExpanded = 0;
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 50,
    sortable: false,
    floatingFilter: true,
    resizable: true,
  };
  public autoGroupColumnDef: ColDef = {
    minWidth: 50,
    width: 250,
    maxWidth: 500,
    resizable: true,
    pinned: 'left'
  };

  dateformatter = params => {
    var dateAsString = params.data.date;
    var dateParts = dateAsString.split("/");
    return `${dateParts[0]} - ${dateParts[1]} - ${dateParts[2]}`;
  }

  public columnDefs: ColDef[] = [
    { headerName: 'Category', field: 'category', enableRowGroup:true, rowGroup: true, hide: true, cellStyle: { fontSize: '13px' } },
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
    this.Fromdate = this.cDate;
    this.Todate = this.cDate;
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

    await this.purchaseservice.getPurchaseDetail(this.selectedPlant, this.Fromdate, this.Todate).toPromise()
      .then(res => {
        this.rowData = res;
        console.log(this.rowData);
      }).catch(err => { console.log(err); });
    this.rowData.forEach(e => {
      console.log(e.dateOfGRN);
      
      e.dateOfGRN ? e.dateOfGRN = this.datePipe.transform(e.dateOfGRN, "dd-MM-yyyy") : null;
      e.vendorInvoiceDate ? e.vendorInvoiceDate = this.datePipe.transform(e.vendorInvoiceDate, "dd-MM-yyyy") : null;
      e.category == null ?  e.category = "No Category" : null;
    });
    await this.purchaseservice
      .getPurchaseDetailTotal(this.selectedPlant, this.Fromdate, this.Todate)
      .toPromise()
      .then(res => { res.length > 0 ? this.totalPurchase = res[0].totalPurchase : null }).catch(err => { console.log(err); });
    this.loading = false;
    this.tempData = this.rowData;

  }

  filterCategory() {
    console.log(this.selectedCategory,this.rowData);
    console.log(this.tempData);
    
    if(this.selectedCategory == "ALL") {this.rowData = this.tempData; return;}
    this.rowData = this.rowData.filter(e => e.category == this.selectedCategory);
  }

  onGridReady(params: GridReadyEvent) { }

  getRowStyle = params => {
    if (params.node.footer) {
      return { background: 'PowderBlue', fontWeight: 'bolder' };
    }
  };

}
