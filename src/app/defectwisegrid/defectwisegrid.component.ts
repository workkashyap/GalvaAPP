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
    await this.qualityservice.getDefectWiseReportSum(this.plantcode, this.selectedtype, this.yearname).toPromise()
      .then(res => { this.data = res; });
    this.rowData = this.sortByFnMonth();

    this.getTotal();
  }

  sortByFnMonth() {
    return _.orderBy(this.rowData, [(datas) => this.yearname, (user) => (this.monthArray.indexOf(user.monthName))], ["asc", "asc"]);
  }

  async getBySelectedYear() {
    await this.qualityservice.getDefectWiseReport(this.plantcode, this.selectedtype, this.yearname).toPromise().
      then(res => {
        this.rowData = res;
      });
    await this.qualityservice.getDefectWiseReportSum(this.plantcode, this.selectedtype, this.yearname).toPromise()
      .then(res => { this.data = res; });
    this.getTotal();
    this.rowData = this.sortByFnMonth();
  }

  async selectedGrid(plantcode) {
    this.plantcode = plantcode;
    await this.qualityservice.getDefectWiseReport(this.plantcode, this.selectedtype, this.yearname).toPromise().
      then(res => {
        this.rowData = res;
      });
    await this.qualityservice.getDefectWiseReportSum(this.plantcode, this.selectedtype, this.yearname).toPromise()
      .then(res => { this.data = res; });
    this.getTotal();
    this.rowData = this.sortByFnMonth();
  }

  async onselecttype(prodtype) {
    this.selectedtype = prodtype;
    await this.qualityservice.getDefectWiseReport(this.plantcode, this.selectedtype, this.yearname).toPromise().
      then(res => {
        this.rowData = res;
      });
    await this.qualityservice.getDefectWiseReportSum(this.plantcode, this.selectedtype, this.yearname).toPromise()
      .then(res => { this.data = res; });
    this.getTotal();
    this.rowData = this.sortByFnMonth();
  }

  Trejval: any;
  Trejqty: any;
  getTotal() {
    this.Trejqty = 0;
    this.Trejval = 0;
    const res = []
    for (let i = 0; i < this.data.length; i++) {
      const ind = res.findIndex(el => el.name === this.data[i].name);
      if (ind === -1) {
        res.push(this.data[i]);
      } else {
        res[ind].rejqty += this.data[i].rejqty;
        res[ind].rejvalue += this.data[i].rejvalue;
      };
      this.Trejqty += this.data[i].rejqty;
      this.Trejval += this.data[i].rejvalue;
    };
    this.data = res;
    this.Trejqty = Math.round(this.Trejqty * 100) / 100;
    this.Trejval = Math.round(this.Trejval * 100) / 100;
  }

  getRowStyle = params => {
    if (params.node.footer) {
      return { background: 'PowderBlue', fontWeight: 'bolder' };
    }
  };
}
