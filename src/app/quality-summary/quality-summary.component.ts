import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { LoginService } from '../shared/login/login.service';
import { User } from '../shared/login/User.model';
import { Plant } from '../shared/plant/plant.model';
import { PlantService } from '../shared/plant/plant.service';
import { QualityService } from '../shared/quality/quality.service';

@Component({
  selector: 'app-quality-summary',
  templateUrl: './quality-summary.component.html',
  styleUrls: ['./quality-summary.component.css']
})
export class QualitySummaryComponent implements OnInit {

  public fnyear: any;
  public yearname: any;
  public plantcode: any;
  public currentUser: User;
  public rowData: any;

  public d: any;
  public cyear: any;

  public columnDefs: ColDef[] = [
    { headerName: 'Values (In Lacs / %)', field: 'inspValue', pinned: 'left', width:180, cellStyle: {fontSize: '14px'}},
    { headerName: 'Total', field: 'total', pinned: 'left',width:150, cellStyle: {fontSize: '14px', 'background-color': '#e7feff'}},
    { headerName: 'April', field: 'apr', cellStyle: {fontSize: '14px'}},
    { headerName: 'May', field: 'may', cellStyle: {fontSize: '14px'}},
    { headerName: 'June', field: 'jun', cellStyle: {fontSize: '14px'}},
    { headerName: 'July', field: 'jul', cellStyle: {fontSize: '14px'}},
    { headerName: 'Aug', field: 'aug', cellStyle: {fontSize: '14px'}},
    { headerName: 'Sep', field: 'sep', cellStyle: {fontSize: '14px'}},
    { headerName: 'Oct', field: 'oct', cellStyle: {fontSize: '14px'}},
    { headerName: 'Nov', field: 'nov', cellStyle: {fontSize: '14px'}},
    { headerName: 'Dec', field: 'dec', cellStyle: {fontSize: '14px'}},
    { headerName: 'Jan', field: 'jan', cellStyle: {fontSize: '14px'}},
    { headerName: 'Feb', field: 'feb', cellStyle: {fontSize: '14px'}},
    { headerName: 'March', field: 'mar', cellStyle: {fontSize: '14px'}},
  ];

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 90,
    sortable: true,
    resizable: true,
  };

  public autoGroupColumnDef: ColDef = {
    maxWidth: 180,
    cellRendererParams: {
        suppressCount: true,
        checkbox: false,
    }
  };
  
  constructor(
    public plantservice: PlantService,
    public qualityservice: QualityService,
    public lservice: LoginService,
  ) {
    this.lservice.currentUser.subscribe(x => this.currentUser = x);
  }

  async ngOnInit() {
    await this.plantservice
      .sgetPlantData(this.currentUser.id)
      .toPromise()
      .then(res => {
        this.plantservice.splantlist = res as Plant[]
        this.plantcode = this.plantservice.splantlist[0].plantcode;
      });

    this.d = new Date();
    this.cyear = new Date().toLocaleDateString('en', { year: '2-digit' });
    let cmonth = this.d.getMonth();
    if (cmonth < 3) {
      this.yearname = (this.cyear - 1) + '-' + this.cyear;
    } else {
      this.yearname = this.cyear + '-' + (this.cyear + 1);
    }
   
    this.getSummary(this.plantcode,this.yearname);
  }

  getSummary(plntcod,year) {
    this.qualityservice.getSummaryAllReport(plntcod,year).toPromise().then(
      res => {
        this.rowData = res;
        this.rowData.forEach(e => {
          if(e.inspValue == "Rej Per" || e.inspValue == "OK Per"){
            e.total = ((e.jan + e.feb + e.mar + e.apr + e.may + e.jun + e.jul + e.aug + e.sep + e.oct + e.nov + e.dec)/12).toFixed(2); 
          }else{
            e.total = ((e.jan + e.feb + e.mar + e.apr + e.may + e.jun + e.jul + e.aug + e.sep + e.oct + e.nov + e.dec)).toFixed(2); 
          }
        });
      }
    );
  }

  selectedGrid(plantcode) {
    this.plantcode = plantcode;
    this.getSummary(this.plantcode,this.yearname);
  }

  getRowStyle = params => {
    if (params.node.footer) {
      return { background: 'PowderBlue', fontWeight: 'bolder' };
    }
  }
}
