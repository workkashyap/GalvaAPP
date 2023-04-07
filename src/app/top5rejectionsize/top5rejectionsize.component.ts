import { Component, OnInit } from '@angular/core';
import { InnerRenderer } from '../salesrepo/innerrenderer.component';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { Top5rejectionService } from '../shared/dailyProduction/top5rejection.service';
import { PlantService } from '../shared/plant/plant.service';
import { LoginService } from '../shared/login/login.service';
import { Plant } from '../shared/plant/plant.model';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import * as _ from 'lodash';

@Component({
  selector: 'app-top5rejectionsize',
  templateUrl: './top5rejectionsize.component.html',
  styleUrls: ['./top5rejectionsize.component.css']
})
export class Top5rejectionsizeComponent implements OnInit {

  public d: any;
  public cyear: any;
  public yearname: any;
  public year: string;
  public groupDefaultExpanded = 0;
  public currentuser: any;
  public plantcode: any;
  public plantname: any;
  rowData: any[];
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
    width: 350,
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
    { headerName: 'Month', field: 'monthname', enableRowGroup: true, rowGroup: true, hide: true, cellStyle: { fontSize: '13px' } },
    { headerName: 'Size', field: 'size', enableRowGroup: true, rowGroup: true, hide: false, cellStyle: { fontSize: '13px' } },
    { headerName: 'Item', field: 'itemname', enableRowGroup: true, rowGroup: true, hide: false, cellStyle: { fontSize: '13px' } },
    {
      headerName: 'Reject Value', field: 'rejvalue', aggFunc: params => {
        let sum = 0;
        params.values.forEach(value => sum += value);
        return Math.round(sum * 100) / 100;
      }, cellStyle: { fontSize: '13px' },
    },
    // {
    //   headerName: 'Reject Qty.', field: 'rejvalue', aggFunc: params => {
    //     let sum = 0;
    //     params.values.forEach(value => sum += value);
    //     return Math.round(sum * 100) / 100;
    //   }, cellStyle: { fontSize: '13px' },
    // }
  ];

  constructor(
    private rejectionservice: Top5rejectionService,
    public plantservice: PlantService,
    public lservice: LoginService,
  ) { this.lservice.currentUser.subscribe(x => this.currentuser = x); }


  async ngOnInit() {
    await this.plantservice
      .sgetPlantData(this.currentuser.id)
      .toPromise()
      .then(res => {
        this.plantservice.splantlist = res as Plant[]
        this.plantcode = this.plantservice.splantlist[0].plantcode;
      });

    this.d = new Date();
    this.cyear = new Date().toLocaleDateString('en', { year: '2-digit' });
    let cmonth = this.d.getMonth();
    if (cmonth < 3) {
      this.yearname = (Number(this.cyear) + 1); + '-' + this.cyear;
    } else {
      this.yearname = this.cyear + '-' + (Number(this.cyear) + 1);;
    }
    await this.rejectionservice.getTop5RejectionSize(this.yearname, this.plantcode).toPromise().then(res => { this.rowData = res; });
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
    await this.rejectionservice.getTop5RejectionSize(this.year, this.plantcode).toPromise().then(res => { this.rowData = res });
    this.rowData = this.sortByFnMonth();
  }

  async selectedGrid(plantcode) {
    this.plantcode = plantcode;
    await this.rejectionservice.getTop5RejectionSize(this.yearname, this.plantcode).toPromise().then(res => { this.rowData = res });
    this.rowData = this.sortByFnMonth();
  }
}
