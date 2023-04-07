import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaserepoService } from '../shared/purchaserepo/purchaserepo.service';
import { ColDef, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { Grid, GridOptions } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { InnerRenderer } from '../salesrepo/innerrenderer.component';

@Component({
  selector: 'app-purchaserepo',
  templateUrl: './purchaserepo.component.html',
  styleUrls: ['./purchaserepo.component.css']
})
export class PurchaserepoComponent implements OnInit {

  public d: any;

  public yearname: string;
  public year: string;

  // rowData: Observable<any[]>;
  rowData: any[] = [];
  public sideBar: SideBarDef | string | boolean | null = 'columns';
  public columnDefs: ColDef[] = [
    { headerName: 'Purchase Category', field: 'subGrouping', enableRowGroup: true, rowGroup: true, hide: true, cellStyle: { fontSize: '13px' } },
    // {headerName: 'Branch', field: 'plantShortName', enableRowGroup: true,  rowGroup: true, hide: true, cellStyle: {fontSize: '13px'} },
    { headerName: 'Year', field: 'finyear', pivot: true, enablePivot: true, sortable: true, pivotComparator: this.MyYearPivotComparator, cellStyle: { fontSize: '13px' } },
    { headerName: 'Month', field: 'monthname', pivot: true, enablePivot: true, sortable: true, pivotComparator: this.MyYearPivotComparator2, cellStyle: { fontSize: '13px' } },
    {
      headerName: '', field: 'totalPurchase', aggFunc: params => {
        let sum = 0;
        params.values.forEach(value => sum += value);
        return Math.round(sum * 100) / 100;
      },
      cellStyle: { fontSize: '13px' },
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

  public gridOptions: GridOptions = {
    pivotColumnGroupTotals: 'before',
  };

  MyYearPivotComparator(a: string, b: string) {
    const requiredOrder = ['2019-2020', '2020-2021', '2021-2022', '2022-2023', '2023-2024'];
    return requiredOrder.indexOf(a) - requiredOrder.indexOf(b);
  }

  MyYearPivotComparator2(a: string, b: string) {
    const requiredOrder = ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March'];
    return requiredOrder.indexOf(a) - requiredOrder.indexOf(b);
  }

  constructor(private purchaserepo: PurchaserepoService) { }

  async ngOnInit() {
    this.rowData = [];
    this.d = new Date();
    this.yearname = this.d.getFullYear();
    let data1: any[] = [];
    let data2: any[] = [];
    await this.purchaserepo.getData(Number(this.yearname) - 1).toPromise().then(data => data1 = data);
    await this.purchaserepo.getData(this.yearname).toPromise().then(data => data2 = data);
    data1 = data1.filter(d => d.finyear === "2022-2023")
    data2 = data2.filter(d => d.finyear === "2022-2023")
    this.rowData = data1.concat(data2);
    console.log(this.rowData);

  }

  async getselectedyear() {
    // this.rowData = this.purchaserepo.getData(this.year);
    if(this.yearname == '2024'){this.rowData = [];return}
    this.rowData = [];
    this.year = this.yearname;
    console.log(String(Number(this.yearname) - 1 + '-' + Number(this.yearname)));
    let data1: any[] = [];
    let data2: any[] = [];

    await this.purchaserepo.getData(Number(this.yearname) - 1).toPromise().then(data => data1 = data);
    await this.purchaserepo.getData(this.yearname).toPromise().then(data => data2 = data);
    data1 = data1.filter(d => d.finyear == Number(this.yearname) - 1 + '-' + Number(this.yearname))
    data2 = data2.filter(d => d.finyear == Number(this.yearname) - 1 + '-' + Number(this.yearname))
    this.rowData = data1.concat(data2);
    console.log(this.rowData);

  }

  onGridReady(params: GridReadyEvent) { }

  getRowStyle = params => {
    if (params.node.footer) {
      return { background: 'PowderBlue', fontWeight: 'bolder' };
    }
  };

}
