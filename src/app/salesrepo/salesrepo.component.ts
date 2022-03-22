import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SalesrepoService } from '../shared/salesrepo/salesrepo.service';
import { ColDef, GridReadyEvent, SideBarDef  } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { InnerRenderer } from './innerrenderer.component';

@Component({
  selector: 'app-salesrepo',
  templateUrl: './salesrepo.component.html',
  styleUrls: ['./salesrepo.component.css']
})
export class SalesrepoComponent implements OnInit {

  public d: any;

  public yearname: string;
  public year: string;

  rowData: Observable<any[]>;
  public sideBar: SideBarDef | string | boolean | null = 'columns';
  public columnDefs: ColDef[] = [
    {headerName: 'Month', field: 'monthName', enableRowGroup: true, rowGroup: true, hide: true, cellStyle: {fontSize: '13px'} },
    {headerName: 'Branch', field: 'plantname', enableRowGroup: true,  rowGroup: true, hide: true, cellStyle: {fontSize: '13px', marginLeft: '0px'} },
    {headerName: 'End Customers', field: 'endcustomer', aggFunc: params => {
                                                            let sum = 0;
                                                            params.values.forEach(value => sum += value);
                                                            return Math.round(sum * 100) / 100; },
                                                            cellStyle: {fontSize: '13px'}
                                                          },
    {headerName: 'Export Sales', field: 'exportsales', aggFunc: params => {
                                                              let sum = 0;
                                                              params.values.forEach(value => sum += value);
                                                              return Math.round(sum * 100) / 100;},
                                                              cellStyle: {fontSize: '13px'}
                                                            },
    {headerName: 'Rejection', field: 'rejection', aggFunc: params => {
                                                              let sum = 0;
                                                              params.values.forEach(value => sum += value);
                                                              return Math.round(sum * 100) / 100;},
                                                              cellStyle: {fontSize: '13px'}
                                                            },
    {headerName: 'Net Sales', field: 'netsales', aggFunc: params => {
                                                              let sum = 0;
                                                              params.values.forEach(value => sum += value);
                                                              return Math.round(sum * 100) / 100;},
                                                              cellStyle: {fontSize: '13px'}
                                                            },
    {headerName: 'Tool Sales', field: 'toolsale', aggFunc: params => {
                                                              let sum = 0;
                                                              params.values.forEach(value => sum += value);
                                                              return Math.round(sum * 100) / 100;},
                                                              cellStyle: {fontSize: '13px'}
                                                            },
    {headerName: 'Other Sales', field: 'othersales', aggFunc: params => {
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

  public autoGroupColumnDef: ColDef = {
    minWidth: 220,
    cellRendererParams: {
      suppressCount: true,
       checkbox: false,
       innerRenderer: InnerRenderer,
    },
  };

  constructor(private salesrepo: SalesrepoService) { }

  ngOnInit() {
    this.d = new Date();
    this.yearname = this.d.getFullYear();
    this.rowData = this.salesrepo.getAgGridData(this.yearname);
  }

  getselectedyear() {
    this.year = this.yearname;
    this.rowData = this.salesrepo.getAgGridData(this.year);
  }

  onGridReady(params: GridReadyEvent) {}
  
  getRowStyle = params => {
    if (params.node.footer) {
        return { background: 'PowderBlue', fontWeight: 'bolder'};
    }    
};

}
