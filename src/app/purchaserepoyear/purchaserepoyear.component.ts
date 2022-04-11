import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaserepoService } from '../shared/purchaserepo/purchaserepo.service';
import { ColDef, GridReadyEvent, SideBarDef  } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { InnerRenderer } from '../salesrepo/innerrenderer.component';

@Component({
  selector: 'app-purchaserepoyear',
  templateUrl: './purchaserepoyear.component.html',
  styleUrls: ['./purchaserepoyear.component.css']
})
export class PurchaserepoyearComponent implements OnInit {

  public d: any;

  public yearname: string;
  public year: string;

  rowData: Observable<any[]>;
  public sideBar: SideBarDef | string | boolean | null = 'columns';
  public columnDefs: ColDef[] = [
    {headerName: 'Purchase Category', field: 'subGrouping', enableRowGroup: true, rowGroup: true, hide: true, cellStyle: {fontSize: '13px'} },
    // {headerName: 'Branch', field: 'plantShortName', enableRowGroup: true,  rowGroup: true, hide: true, cellStyle: {fontSize: '13px'} },
    {headerName: 'Year', field: 'year', pivot: true, enablePivot: true, sortable: true, pivotComparator: this.MyYearPivotComparator, cellStyle: {fontSize: '13px'}},
    {headerName: 'Month', field: 'monthname', pivot: true, enablePivot: true, sortable: true, pivotComparator: this.MyYearPivotComparator2, cellStyle: {fontSize: '13px'} },
    {headerName: '', field: 'totalPurchase', aggFunc: params => {
                                                        let sum = 0;
                                                        params.values.forEach(value => sum += value);
                                                        return Math.round(sum * 100) / 100; },
                                                        cellStyle: {fontSize: '13px'},
                                                      }
  ];

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 120,
    sortable: true,
    resizable: true,
  };

  public autoGroupColumnDef: ColDef = {
    minWidth: 220,
    pinned: 'left',
    cellRendererParams: {
      suppressCount: true,
       checkbox: false,
       innerRenderer: InnerRenderer,
    },
  };

  MyYearPivotComparator(a: string, b: string) {
    const requiredOrder = ['2023','2022','2021','2020'];
    return requiredOrder.indexOf(a) - requiredOrder.indexOf(b);
  }

  MyYearPivotComparator2(a: string, b: string) {
    const requiredOrder = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return requiredOrder.indexOf(a) - requiredOrder.indexOf(b);
  }

  MyYearPivotComparator3(a: string, b: string) {
    const requiredOrder = ['ABS','Capital','Chemical','Consumable','Consumables','ETP Chemical','HR','Jig Mfg','Moulded Parts Purchase','Other Expenses','Packing','Sales Rej','Services','Stores & Spares','Tool Purchase','Transport','Utility'];
    return requiredOrder.indexOf(a) - requiredOrder.indexOf(b);
  }

  constructor(private purchaserepo: PurchaserepoService) {}

  ngOnInit() {
    this.d = new Date();
    this.yearname = this.d.getFullYear();
    this.rowData = this.purchaserepo.getDataall(this.yearname);
  }

  getselectedyear() {
    this.year = this.yearname;
    this.rowData = this.purchaserepo.getDataall(this.year);
  }

  onGridReady(params: GridReadyEvent) {}
  
  getRowStyle = params => {
    if (params.node.footer) {
        return { background: 'PowderBlue', fontWeight: 'bolder'};
    }    
};

}
