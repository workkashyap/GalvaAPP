import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { InnerRenderer } from '../salesrepo/innerrenderer.component';
import { LoginService } from '../shared/login/login.service';
import { User } from '../shared/login/User.model';
import { Plant } from '../shared/plant/plant.model';
import { PlantService } from '../shared/plant/plant.service';
import { QualityService } from '../shared/quality/quality.service';
import * as _ from 'lodash';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

@Component({
  selector: 'app-defectwisegrid',
  templateUrl: './defectwisegrid.component.html',
  styleUrls: ['./defectwisegrid.component.css']
})
export class DefectwisegridComponent implements OnInit {

  public d: any;
  public cyear: any;
  public yearname: any;
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

  currentUser: User;
  plantcode: any = '';
  selectedtype: any = '';

  public columnDefs: ColDef[] = [
    // { headerName: 'Year', field: 'finyear', enableRowGroup: true, rowGroup: true, hide: false, cellStyle: { fontSize: '13px' } },
    // { headerName: 'Plant', field: 'plantname', enableRowGroup: true, rowGroup: true, hide: false, cellStyle: { fontSize: '13px' } },
    { headerName: 'Month', field: 'monthName', enableRowGroup: true, rowGroup: true, hide: true, cellStyle: { fontSize: '13px' } },
    { headerName: 'Item', field: 'name', enableRowGroup: true, rowGroup: true, hide: false, cellStyle: { fontSize: '13px' } },
    {
      headerName: 'Reject Value', field: 'rejvalue', aggFunc: params => {
        let sum = 0;
        params.values.forEach(value => sum += value);
        return Math.round(sum * 100) / 100;
      }, cellStyle: { fontSize: '13px' },
    },
    {
      headerName: 'Reject Quantity', field: 'rejqty', aggFunc: params => {
        let sum = 0;
        params.values.forEach(value => sum += value);
        return Math.round(sum * 100) / 100;
      }, cellStyle: { fontSize: '13px' },
    }
  ];

  constructor(
    public plantservice: PlantService,
    public lservice: LoginService,
    public qualityservice: QualityService
  ) { this.lservice.currentUser.subscribe(x => (this.currentUser = x)); }

  async ngOnInit() {
    await this.plantservice
      .sgetPlantData(this.currentUser.id)
      .toPromise()
      .then(res => {
        this.plantservice.splantlist = res as Plant[]
        this.plantcode = this.plantservice.splantlist[0].plantcode;
      });
    this.selectedtype = "ZCRM";

    this.d = new Date();
    let cyear: any = new Date().toLocaleDateString('en', { year: '2-digit' });
    let cmonth = this.d.getMonth();
    if (cmonth < 3) {
      this.yearname = (cyear - 1) + '-' + cyear;
    } else {
      this.yearname = cyear + '-' + (cyear + 1);
    }

    await this.qualityservice.getDefectWiseReport(this.plantcode, this.selectedtype, this.yearname).toPromise().
      then(res => { this.rowData = res; });
    this.rowData = this.sortByFnMonth();
  }

  sortByFnMonth() {
    return _.orderBy(this.rowData, [(datas) => this.yearname, (user) => (this.monthArray.indexOf(user.monthName))], ["asc", "asc"]);
  }

  async getBySelectedYear() {
    await this.qualityservice.getDefectWiseReport(this.plantcode, this.selectedtype, this.yearname).toPromise().
      then(res => {
        this.rowData = res;
      });
    this.rowData = this.sortByFnMonth();
  }

  selectedGrid(plantcode) {
      this.plantcode = plantcode;
    this.qualityservice.getDefectWiseReport(this.plantcode, this.selectedtype, this.yearname).toPromise().
      then(res => {
        this.rowData = res;
      });
    this.rowData = this.sortByFnMonth();
  }

  async onselecttype(prodtype) {
    this.selectedtype = prodtype;
    await this.qualityservice.getDefectWiseReport(this.plantcode, this.selectedtype, this.yearname).toPromise().
      then(res => {
        this.rowData = res;
      });
    this.rowData = this.sortByFnMonth();
  }
  getRowStyle = params => {
    if (params.node.footer) {
      return { background: 'PowderBlue', fontWeight: 'bolder' };
    }
  };
}
