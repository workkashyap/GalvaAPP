import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SalesrepoService } from '../shared/salesrepo/salesrepo.service';
import { ColDef, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { InnerRenderer } from '../salesrepo/innerrenderer.component';
import * as _ from 'lodash';
@Component({
  selector: 'app-salesrepofnyear',
  templateUrl: './salesrepofnyear.component.html',
  styleUrls: ['./salesrepofnyear.component.css']
})
export class SalesrepofnyearComponent implements OnInit {

  public d: any;

  public yearname: string;
  public year: string;
  public groupDefaultExpanded = 0;
  
  rowData: any = [];

  constructor(private salesrepo: SalesrepoService) { }

  public columnDefs: ColDef[] = [
    {headerName: 'Month', field: 'monthName', type: 'leftAligned' , enableRowGroup: true, rowGroup: true, hide: true,  cellStyle: {fontSize: '13px'}  },
    {headerName: 'Branch', field: 'plantname', type: 'leftAligned' , enableRowGroup: true , rowGroup: true,  cellStyle: {fontSize: '13px'} },
    {headerName: 'Year', field: 'finyear', pivot: true, enablePivot: true, sortable: true , filter: true, pivotComparator: this.MyYearPivotComparator,  cellStyle: {fontSize: '13px'} },
    {headerName: 'End Customers', field: 'endcustomer', enableValue: true, type: 'rightAligned',aggFunc: params => {
                                                            let sum = 0;
                                                            params.values.forEach(value => sum += value);
                                                            return Math.round(sum * 100) / 100;},
                                                            cellStyle: {fontSize: '13px'} 
                                                          },
    {headerName: 'Export Sales', field: 'exportsales', enableValue: true, type: 'rightAligned' ,aggFunc: params => {
                                                              let sum = 0;
                                                              params.values.forEach(value => sum += value);
                                                              return Math.round(sum * 100) / 100;},
                                                              cellStyle: {fontSize: '13px'} 
                                                            },
    {headerName: 'Rejection', field: 'rejection', enableValue: true, type: 'rightAligned' ,aggFunc: params => {
                                                              let sum = 0;
                                                              params.values.forEach(value => sum += value);
                                                              return Math.round(sum * 100) / 100;},
                                                              cellStyle: {fontSize: '13px'} 
                                                            },
    {headerName: 'Net Sales', field: 'netsales', enableValue: true, type: 'rightAligned' ,aggFunc: params => {
                                                              let sum = 0;
                                                              params.values.forEach(value => sum += value);
                                                              return Math.round(sum * 100) / 100;},
                                                              cellStyle: {fontSize: '13px'} 
                                                            },
    {headerName: 'Tool Sales', field: 'toolsale', enableValue: true, type: 'rightAligned', aggFunc: params => {
                                                              let sum = 0;
                                                              params.values.forEach(value => sum += value);
                                                              return Math.round(sum * 100) / 100;},
                                                              cellStyle: {fontSize: '13px'} 
                                                            },
    {headerName: 'Other Sales', field: 'othersales', enableValue: true, type: 'rightAligned' ,aggFunc: params => {
                                                              let sum = 0;
                                                              params.values.forEach(value => sum += value);
                                                              return Math.round(sum * 100) / 100;},
                                                              cellStyle: {fontSize: '13px'} 
                                                            },
  ];

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 120,
    sortable: true,
    floatingFilter: true,
    resizable: true,
  };

  monthArray = ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December','January', 'February', 'March'];

  MyYearPivotComparator(a: string, b: string) {
    const requiredOrder = ['2022-2023','2021-2022','2023-2024'];
    return requiredOrder.indexOf(a) - requiredOrder.indexOf(b);
  }

  public autoGroupColumnDef: ColDef = {
    minWidth: 220,
    pinned: 'left',
    cellRendererParams: {
      suppressCount: true,
       checkbox: false,
       innerRenderer: InnerRenderer,
    },
  };

  async ngOnInit() {
    this.d = new Date();
    this.yearname = this.d.getFullYear();
    await this.salesrepo.getAgGridDataall(this.yearname).toPromise().then(
      (res) => {
        this.rowData = res;
      }
      );
      this.rowData = this.sortByFnMonth();
  }
  
  sortByFnMonth() {
    return _.orderBy(this.rowData, [(datas) => datas.year, (user) => (this.monthArray.indexOf(user.monthName))], ["asc", "asc"]);
  }

  onGridReady(params: GridReadyEvent) { }

  getRowStyle = params => {
    if (params.node.footer) {
      return { background: 'PowderBlue', fontWeight: 'bolder' };
    }
  }
}
