import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SalesrepoService } from '../shared/salesrepo/salesrepo.service';
import { ColDef, GridReadyEvent, SideBarDef  } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { InnerRenderer } from '../salesrepo/innerrenderer.component';


@Component({
  selector: 'app-salesrepo',
  templateUrl: './salesrepoyear.component.html',
  styleUrls: ['./salesrepoyear.component.css']
})
export class SalesrepoyearComponent implements OnInit {

  public d: any;

  public yearname: string;
  public year: string;

  rowData: Observable<any[]>;
  public sideBar: SideBarDef | string | boolean | null = 'columns';
  public columnDefs: ColDef[] = [
    {headerName: 'Month', field: 'monthName', type: 'leftAligned' , enableRowGroup: true, rowGroup: true, hide: true },
    {headerName: 'Branch', field: 'plantname', type: 'leftAligned' , enableRowGroup: true , rowGroup: true },
    {headerName: 'Year', field: 'year', pivot: true, enablePivot: true, sortable: true , pivotComparator: this.MyYearPivotComparator },
    {headerName: 'End Customers', field: 'endcustomer', enableValue: true, type: 'rightAligned',aggFunc: params => {
                                                            let sum = 0;
                                                            params.values.forEach(value => sum += value);
                                                            return Math.round(sum * 100) / 100;}
                                                          },
    {headerName: 'Export Sales', field: 'exportsales', enableValue: true, type: 'rightAligned' ,aggFunc: params => {
                                                              let sum = 0;
                                                              params.values.forEach(value => sum += value);
                                                              return Math.round(sum * 100) / 100;}
                                                            },
    {headerName: 'Rejection', field: 'rejection', enableValue: true, type: 'rightAligned' ,aggFunc: params => {
                                                              let sum = 0;
                                                              params.values.forEach(value => sum += value);
                                                              return Math.round(sum * 100) / 100;}
                                                            },
    {headerName: 'Net Sales', field: 'netsales', enableValue: true, type: 'rightAligned' ,aggFunc: params => {
                                                              let sum = 0;
                                                              params.values.forEach(value => sum += value);
                                                              return Math.round(sum * 100) / 100;}
                                                            },
    {headerName: 'Tool Sales', field: 'toolsale', enableValue: true, type: 'rightAligned', aggFunc: params => {
                                                              let sum = 0;
                                                              params.values.forEach(value => sum += value);
                                                              return Math.round(sum * 100) / 100;}
                                                            },
    {headerName: 'Other Sales', field: 'othersales', enableValue: true, type: 'rightAligned' ,aggFunc: params => {
                                                              let sum = 0;
                                                              params.values.forEach(value => sum += value);
                                                              return Math.round(sum * 100) / 100;}
                                                            },
  ];


  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 120,
    sortable: true,
    resizable: true,
  };

  // public autoGroupColumnDef: ColDef = {
  //   headerName: 'Company',
  //   minWidth: 220,
  //   cellRendererParams: {
  //       suppressCount: true,
  //       checkbox: false,
  //   }
  
  // };
  MyYearPivotComparator(a: string, b: string) {
    const requiredOrder = ['2023','2022','2021','2020'];
    return requiredOrder.indexOf(a) - requiredOrder.indexOf(b);
  }
  public autoGroupColumnDef: ColDef = {
    minWidth: 220,
    cellRendererParams: {
      suppressCount: true,
       checkbox: false,
       innerRenderer: InnerRenderer,
    },
  };

  constructor(private salesrepo: SalesrepoService) { }
  public groupDefaultExpanded = 1;
  ngOnInit() {
    this.d = new Date();
    this.yearname = this.d.getFullYear();
    this.rowData = this.salesrepo.getAgGridDataall(this.yearname);
  }

  getselectedyear() {
    this.year = this.yearname;
    this.rowData = this.salesrepo.getAgGridDataall(this.year);
  }

  onGridReady(params: GridReadyEvent) {}
  
  getRowStyle = params => {
    if (params.node.footer) {
        return { background: 'PowderBlue' };
    }
};

}
