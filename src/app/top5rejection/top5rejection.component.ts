import { Component, OnInit } from '@angular/core';
import { ColDef, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { InnerRenderer } from '../salesrepo/innerrenderer.component';
import { Top5rejectionService } from '../shared/dailyProduction/top5rejection.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-top5rejection',
  templateUrl: './top5rejection.component.html',
  styleUrls: ['./top5rejection.component.css']
})
export class Top5rejectionComponent implements OnInit {
  public d: any;
  public cyear: any;
  public yearname: any;
  public year: string;
  public groupDefaultExpanded = 0;
  rowData: any[];
  data: any[];
  monthArray = ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March'];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 50,
    sortable: false,
    floatingFilter: true,
    resizable: true,
  };
  public autoGroupColumnDef: ColDef = {
    minWidth: 50,
    width:250,
    maxWidth: 500,
    resizable: true,
    pinned: 'left',
    cellRendererParams: {
      suppressCount: true,
      checkbox: false,
      innerRenderer: InnerRenderer,
    },
  };

  public columnDefs: ColDef[] = [
    // { headerName: 'Year', field: 'finyear', enableRowGroup: true, rowGroup: true, hide: false, cellStyle: { fontSize: '13px' } },
    { headerName: 'Month', field: 'monthname', enableRowGroup: true, rowGroup: true, hide: true, cellStyle: { fontSize: '13px' } },
    { headerName: 'Plant', field: 'plantname', enableRowGroup: true, rowGroup: true, hide: false, cellStyle: { fontSize: '13px' } },
    { headerName: 'Item', field: 'itemname', enableRowGroup: true, rowGroup: true, hide: false, cellStyle: { fontSize: '13px' } },
    { headerName: 'Reject Value', field: 'rejvalue', aggFunc: params => {
                                                                              let sum = 0;
                                                                              params.values.forEach(value => sum += value);
                                                                              return Math.round(sum * 100) / 100;
                                                                            },cellStyle: { fontSize: '13px' },
    }];

  constructor(private rejectionservice: Top5rejectionService) { }

  async ngOnInit() {
    this.d = new Date();
    this.cyear = new Date().toLocaleDateString('en', { year: '2-digit' });
    let cmonth = this.d.getMonth();
    if (cmonth < 3) {
      this.yearname = (this.cyear - 1) + '-' + this.cyear;
    } else {
      this.yearname = this.cyear + '-' + (this.cyear + 1);
    }
    await this.rejectionservice.getTop5Rejection(this.yearname).toPromise().then(res => { this.rowData = res });
    this.rowData = this.sortByFnMonth();
  }

  sortByFnMonth() {
    return _.orderBy(this.rowData, [(datas) => datas.finyear, (user) => (this.monthArray.indexOf(user.monthname))], ["asc", "asc"]);
  }

  onGridReady(params: GridReadyEvent) { }

  getRowStyle = params => {
    if (params.node.footer) {
      return { background: 'PowderBlue', fontWeight: 'bolder' };
    }
  };

  async getBySelectedYear() {
    this.year = this.yearname;
    await this.rejectionservice.getTop5Rejection(this.year).toPromise().then(res => { this.rowData = res });
    this.rowData = this.sortByFnMonth();
  }
}
