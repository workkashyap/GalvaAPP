import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SalesrepoService } from '../shared/salesrepo/salesrepo.service';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

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

  public columnDefs: ColDef[] = [
    {headerName: 'Month', field: 'monthName', rowGroup: true, enableRowGroup: true},
    {headerName: 'Branch', field: 'plantname', rowGroup: true, enableRowGroup: true, enablePivot: true},
    {headerName: 'End Customers', field: 'endcustomer', aggFunc: params => {
                                                            let sum = 0;
                                                            params.values.forEach(value => sum += value);
                                                            return Math.round(sum * 100) / 100;}
                                                          },
    {headerName: 'Export Sales', field: 'exportsales', aggFunc: params => {
                                                              let sum = 0;
                                                              params.values.forEach(value => sum += value);
                                                              return Math.round(sum * 100) / 100;}
                                                            },
    {headerName: 'Rejection', field: 'rejection', aggFunc: params => {
                                                              let sum = 0;
                                                              params.values.forEach(value => sum += value);
                                                              return Math.round(sum * 100) / 100;}
                                                            },
    {headerName: 'Net Sales', field: 'netsales', aggFunc: params => {
                                                              let sum = 0;
                                                              params.values.forEach(value => sum += value);
                                                              return Math.round(sum * 100) / 100;}
                                                            },
    {headerName: 'Tool Sales (Including Export)', field: 'toolsale', aggFunc: params => {
                                                              let sum = 0;
                                                              params.values.forEach(value => sum += value);
                                                              return Math.round(sum * 100) / 100;}
                                                            },
    {headerName: 'Other Sales', field: 'othersales', aggFunc: params => {
                                                              let sum = 0;
                                                              params.values.forEach(value => sum += value);
                                                              return Math.round(sum * 100) / 100;}
                                                            },
  ];

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 110,
    sortable: true,
    resizable: true,
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


}
