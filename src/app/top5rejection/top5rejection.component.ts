import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { InnerRenderer } from '../salesrepo/innerrenderer.component';
import { Top5rejectionService } from '../shared/dailyProduction/top5rejection.service';
import * as _ from 'lodash';
import { PlantService } from '../shared/plant/plant.service';
import { LoginService } from '../shared/login/login.service';
import { Plant } from '../shared/plant/plant.model';

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
  public currentuser: any;
  public plantcode: any;
  public plantname: any;
  rowData: any[];
  data: any[];
  valueData: any[];
  show = false;
  public loading: boolean = false;
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

    {
      headerName: 'Month', field: 'monthname', enableRowGroup: true, rowGroup: true, hide: true, cellStyle: { fontSize: '13px' }
    },
    { headerName: 'Item', field: 'itemname', width: 500, enableRowGroup: true, rowGroup: true, hide: false, cellStyle: { fontSize: '13px' } },
    {
      headerName: 'Reject Value', field: 'rejvalue', aggFunc: params => {
        let sum = 0;
        params.values.forEach(value => sum += value);
        return Math.round(sum * 100) / 100;
      }, cellStyle: { fontSize: '13px' },
    }];

  constructor(
    private rejectionservice: Top5rejectionService,
    public plantservice: PlantService,
    public lservice: LoginService,
  ) { this.lservice.currentUser.subscribe(x => this.currentuser = x); }

  async ngOnInit() {
    this.loading = true;
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
    await this.rejectionservice.getTop5RejectionValue(this.yearname, this.plantcode).toPromise().then(res => { this.valueData = res; });
    await this.rejectionservice.getTop5Rejection(this.yearname, this.plantcode).toPromise()
      .then(res => { this.rowData = res; });
    await this.rejectionservice.getTop5RejectionSum(this.yearname, this.plantcode).toPromise()
      .then(res => { this.data = res; this.plantname = res[0].plantname; });
    this.loading = false;
    this.rowData = this.sortByFnMonth(this.rowData);
    this.valueData = this.sortValueByFnMonth(this.valueData);
    this.getTotal();
  }

  sortByFnMonth(data) {
    return _.orderBy(data, [(datas) => datas.finyear, (user) => (this.monthArray.indexOf(user.monthname))], ["asc", "asc"]);
  }

  sortValueByFnMonth(data) {
    return _.orderBy(data, [(datas) => this.yearname, (user) => (this.monthArray.indexOf(user.monthName))], ["asc", "asc"]);
  }

  gridApi: any;
  onGridReady(params: GridReadyEvent) {
  }

  getRowStyle = params => {
    if (params.node.footer) {
      return { background: 'PowderBlue', fontWeight: 'bolder' };
    }
  };


  async getBySelectedYear() {
    this.loading = true;
    this.year = this.yearname;
    await this.rejectionservice.getTop5RejectionValue(this.year, this.plantcode).toPromise().then(res => { this.valueData = res; });
    await this.rejectionservice.getTop5Rejection(this.year, this.plantcode).toPromise().then(res => { this.rowData = res });
    await this.rejectionservice.getTop5RejectionSum(this.yearname, this.plantcode).toPromise()
      .then(res => { this.data = res; res.length > 0 ? this.plantname = res[0].plantname : null;});
    this.loading = false;
    this.rowData = this.sortByFnMonth(this.rowData);
    this.valueData = this.sortValueByFnMonth(this.valueData);
    this.getTotal();
  }

  async selectedGrid(plantcode) {
    this.loading = true;
    this.plantcode = plantcode;
    await this.rejectionservice.getTop5RejectionValue(this.yearname, this.plantcode).toPromise().then(res => { this.valueData = res; });
    await this.rejectionservice.getTop5Rejection(this.yearname, this.plantcode).toPromise().then(res => { this.rowData = res });
    await this.rejectionservice.getTop5RejectionSum(this.yearname, this.plantcode).toPromise()
      .then(res => { this.data = res; res.length > 0 ? this.plantname = res[0].plantname : null; });
    this.loading = false;
    this.rowData = this.sortByFnMonth(this.rowData);
    this.valueData = this.sortValueByFnMonth(this.valueData);
    this.getTotal();
  }

  Tinspection: any;
  Tok: any;
  Tokper: any;
  Trej: any;
  Trejper: any;
  getTotal() {
    this.Tinspection = 0; this.Tok = 0; this.Tokper = 0; this.Trej = 0; this.Trejper = 0;
    this.data.forEach(e => {
      this.Tinspection += e.inspValue;
      this.Tok += e.okvalue;
      this.Tokper += e.okjper;
      this.Trej += e.rejvalue;
      this.Trejper += e.rejper;
    });
    this.Tokper = this.Tokper / this.data.length;
    this.Trejper = this.Trejper / this.data.length;
    this.Tinspection = Math.round(this.Tinspection * 100) / 100;
    this.Tok = Math.round(this.Tok * 100) / 100;
    this.Trej = Math.round(this.Trej * 100) / 100;
    this.Tokper = Math.round(this.Tokper * 100) / 100;
    this.Trejper = Math.round(this.Trejper * 100) / 100;
  }
}
