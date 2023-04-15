import { Component, OnInit } from '@angular/core';
import { SalesrepoService } from '../shared/salesrepo/salesrepo.service';
import { ColDef, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { InnerRenderer } from '../salesrepo/innerrenderer.component';
import * as _ from 'lodash';
@Component({
  selector: 'app-salesrepofnmom',
  templateUrl: './salesrepofnmom.component.html',
  styleUrls: ['./salesrepofnmom.component.css']
})
export class SalesrepofnmomComponent implements OnInit {

  public d: any;
  public cyear: any;
  public yearname: any;
  public year: string;

  public sideBar: SideBarDef | string | boolean | null = 'filters';
  public groupDefaultExpanded = 0;

  mouldData: any = [];
  rowData: any = [];

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 120,
    sortable: true,
    floatingFilter: true,
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

  monthArray = ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March'];

  constructor(private salesrepo: SalesrepoService) { }

  public columnDefs: ColDef[] = [
    { headerName: 'Month', field: 'monthName', type: 'leftAligned', enableRowGroup: true, rowGroup: true, filter: true, hide: true, cellStyle: { fontSize: '13px' } },
    { headerName: 'Company', field: 'company', type: 'leftAligned', enableRowGroup: true, rowGroup: true, filter: true, hide: true, cellStyle: { fontSize: '13px' } },
    { headerName: 'Branch', field: 'plantname', type: 'leftAligned', enableRowGroup: true, rowGroup: true, cellStyle: { fontSize: '13px' } },
    {
      headerName: 'End Customers', field: 'endcustomer', enableValue: true, type: 'rightAligned', aggFunc: params => {
        let sum = 0;
        params.values.forEach(value => sum += value);
        return Math.round(sum * 100) / 100;
      },
      cellStyle: { fontSize: '13px' }
    },
    {
      headerName: 'Export Sales', field: 'exportsales', enableValue: true, type: 'rightAligned', aggFunc: params => {
        let sum = 0;
        params.values.forEach(value => sum += value);
        return Math.round(sum * 100) / 100;
      },
      cellStyle: { fontSize: '13px' }
    },
    {
      headerName: 'Rejection', field: 'rejection', enableValue: true, type: 'rightAligned', aggFunc: params => {
        let sum = 0;
        params.values.forEach(value => sum += value);
        return Math.round(sum * 100) / 100;
      },
      cellStyle: { fontSize: '13px' }
    },
    {
      headerName: 'Net Sales', field: 'netsales', enableValue: true, type: 'rightAligned', aggFunc: params => {
        let sum = 0;
        params.values.forEach(value => sum += value);
        return Math.round(sum * 100) / 100;
      },
      cellStyle: { fontSize: '13px' }
    },
    {
      headerName: 'Tool Sales', field: 'toolsale', enableValue: true, type: 'rightAligned', aggFunc: params => {
        let sum = 0;
        params.values.forEach(value => sum += value);
        return Math.round(sum * 100) / 100;
      },
      cellStyle: { fontSize: '13px' }
    },
    {
      headerName: 'Other Sales', field: 'othersales', enableValue: true, type: 'rightAligned', aggFunc: params => {
        let sum = 0;
        params.values.forEach(value => sum += value);
        return Math.round(sum * 100) / 100;
      },
      cellStyle: { fontSize: '13px' }
    },
    {
      headerName: 'Mould Purchase', field: 'mouldPurchase', enableValue: true, type: 'rightAligned', aggFunc: params => {
        let sum = 0;
        params.values.forEach(value => sum += value);
        return Math.round(sum * 100) / 100;
      },
      cellStyle: { fontSize: '13px' }
    },
  ]

  async ngOnInit() {
    this.d = new Date();
    this.cyear = new Date().toLocaleDateString('en', { year: '2-digit' });
    let cmonth = this.d.getMonth();
    if (cmonth < 3) {
      this.yearname = (Number(this.cyear) - 1); + '-' + this.cyear;
    } else {
      this.yearname = this.cyear + '-' + (Number(this.cyear) + 1);;
    }
    await this.salesrepo.getAgGridDataForFnYear(this.yearname).toPromise().then(res => { this.rowData = res });
    this.rowData.map(v => { v.mouldPurchase = 0 });
    await this.salesrepo.getSalesRepoFinWithMould(this.yearname).toPromise().then(res => { this.mouldData = res });
    this.mouldData.forEach((e) => {
      if (e.plantname == 'FFPL') {
        e.company = 'FUTURE FINISHER'
      } else {
        e.company = 'GALVA';
      }
      e.endcustomer = 0;
      e.exportsales = 0;
      e.rejection = 0;
      e.netsales = 0;
      e.toolsale = 0;
      e.othersales = 0;
      this.rowData.push(e);
    });

    this.rowData = this.sortByFnMonth();
  }

  async getselectedyear() {
    this.year = this.yearname;
    await this.salesrepo.getAgGridDataForFnYear(this.yearname).toPromise().then(res => { this.rowData = res });
    this.rowData.map(v => { v.mouldPurchase = 0 });
    await this.salesrepo.getSalesRepoFinWithMould(this.yearname).toPromise().then(res => { this.mouldData = res });
    this.mouldData.forEach((e) => {
      if (e.plantname == 'FFPL') {
        e.company = 'FUTURE FINISHER'
      } else {
        e.company = 'GALVA';
      }
      e.endcustomer = 0;
      e.exportsales = 0;
      e.rejection = 0;
      e.netsales = 0;
      e.toolsale = 0;
      e.othersales = 0;
      this.rowData.push(e);
    });

    this.rowData = this.sortByFnMonth();
  }

  sortByFnMonth() {
    return _.orderBy(this.rowData, [(datas) => this.yearname, (user) => (this.monthArray.indexOf(user.monthName))], ["asc", "asc"]);
  }

  onGridReady(params: GridReadyEvent) { }

  getRowStyle = params => {
    if (params.node.footer) {
      return { background: 'PowderBlue', fontWeight: 'bolder' };
    }
  }

}