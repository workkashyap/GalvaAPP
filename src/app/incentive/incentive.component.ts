import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Grid, GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { IncentiveService } from '../shared/incentive/incentive.service';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
@Component({
  selector: 'app-incentive',
  templateUrl: './incentive.component.html',
  styleUrls: ['./incentive.component.css']
})
export class IncentiveComponent  {

  public year: string;
  public Month: string;
  public x: number;
  public index: string;

  public monthname: string;
  public yearname: string;
  public day: string;
  public date: string;
  public fullDate: string;

  public rejValues: number;
  public rejValuesToday: number;
  public rejValuesMonthly: number;
  public numberOfDays: number;

  public monthNames: any;
  public monthDays: number;
  public days: any;
  public d: any;
  public total: any;

  public monthly: any;
  public today: any;
  public datarow: any[] = [];
  
  rowData: Observable<any[]>;
  // public rowData: any;

  public columnDefs: ColDef[] = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    // { headerName: 'Total (in Lakhs)', aggFunc: this.getTotal , rowGroup: true },
    //{ field: 'day', pivot: true, enablePivot: true, sortable: true , pivotComparator: this.MyYearPivotComparator },
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: '31', field: 'd_31', cellStyle: {fontSize: '13px'}},
    { headerName: '30', field: 'd_30', cellStyle: {fontSize: '13px'}},
    { headerName: '29', field: 'd_29', cellStyle: {fontSize: '13px'}},
    { headerName: '28', field: 'd_28', cellStyle: {fontSize: '13px'}},
    { headerName: '27', field: 'd_27', cellStyle: {fontSize: '13px'}},
    { headerName: '26', field: 'd_26', cellStyle: {fontSize: '13px'}},
    { headerName: '25', field: 'd_25', cellStyle: {fontSize: '13px'}},
    { headerName: '24', field: 'd_24', cellStyle: {fontSize: '13px'}},
    { headerName: '23', field: 'd_23', cellStyle: {fontSize: '13px'}},
    { headerName: '22', field: 'd_22', cellStyle: {fontSize: '13px'}},
    { headerName: '21', field: 'd_21', cellStyle: {fontSize: '13px'}},
    { headerName: '20', field: 'd_20', cellStyle: {fontSize: '13px'}},
    { headerName: '19', field: 'd_19', cellStyle: {fontSize: '13px'}},
    { headerName: '18', field: 'd_18', cellStyle: {fontSize: '13px'}},
    { headerName: '17', field: 'd_17', cellStyle: {fontSize: '13px'}},
    { headerName: '16', field: 'd_16', cellStyle: {fontSize: '13px'}},
    { headerName: '15', field: 'd_15', cellStyle: {fontSize: '13px'}},
    { headerName: '14', field: 'd_14', cellStyle: {fontSize: '13px'}},
    { headerName: '13', field: 'd_13', cellStyle: {fontSize: '13px'}},
    { headerName: '12', field: 'd_12', cellStyle: {fontSize: '13px'}},
    { headerName: '11', field: 'd_11', cellStyle: {fontSize: '13px'}},
    { headerName: '10', field: 'd_10', cellStyle: {fontSize: '13px'}},
    { headerName: '9', field: 'd_9', cellStyle: {fontSize: '13px'}},
    { headerName: '8', field: 'd_8', cellStyle: {fontSize: '13px'}},
    { headerName: '7', field: 'd_7', cellStyle: {fontSize: '13px'}},
    { headerName: '6', field: 'd_6', cellStyle: {fontSize: '13px'}},
    { headerName: '5', field: 'd_5', cellStyle: {fontSize: '13px'}},
    { headerName: '4', field: 'd_4', cellStyle: {fontSize: '13px'}},
    { headerName: '3', field: 'd_3', cellStyle: {fontSize: '13px'}},
    { headerName: '2', field: 'd_2', cellStyle: {fontSize: '13px'}},
    { headerName: '1', field: 'd_1', cellStyle: {fontSize: '13px'}},

    //{headerName: '' , field: 'value', aggFunc: 'sum' }
  ];

public defaultColDef: ColDef = {
  flex: 1,
  minWidth: 90,
  sortable: true,
  resizable: true,
};
public autoGroupColumnDef: ColDef = {
  minWidth: 210,
  cellRendererParams: {
      suppressCount: true,
      checkbox: false,
  }

};

public gridOptions: GridOptions = {
  // pivotRowTotals: 'before',
};


constructor(private incentive: IncentiveService) {
  // tslint:disable-next-line: max-line-length
   // this.rowData = this.http.get<any[]>('http://103.236.154.122:2222/api/dailyproductions/Getallrejdata/2022-03-01');
}

ngOnInit() {
  // this.incentive.rowD = [];
  this.monthly = [];
  this.datarow = [];
  this.today = [];
  this.getData();
}

getselectedyear() {
  this.year = this.yearname;
}
getselectedmonth() {
  this.Month = this.monthname;
}

getData() {
  this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  this.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  this.d = new Date();
  this.monthname = this.monthNames[this.d.getMonth()];
  this.yearname = this.d.getFullYear();
  this.day = this.days[this.d.getDay()];
  this.fullDate = this.d;
  this.date = this.d.getDate();
  this.x = this.monthNames.indexOf(this.monthname) + 1;
  this.index = this.x.toString();
  this.incentive.getMonthlyRej(this.yearname, this.index).subscribe(data => {
     this.monthly = data;
     this.rejValuesMonthly = this.getTotal(this.monthly);
     this.numberOfDays = this.daysInMOnth(this.d.getMonth() + 1, this.yearname);
   });
  this.incentive.getTodayRej(this.yearname, this.index, this.date).subscribe(data => {
     this.today = data;
     this.rejValuesToday = this.getTotal(this.today);
  });
  // this.incentive.getAgGridData().subscribe(data => {
  //    this.rowData = data;
  //    ;

  // });
  this.rowData = this.incentive.getAgGridData(this.yearname, this.index);
}

//  constructor(private http: HttpClient) {
// //   this.monthly = this.http.get<any[]>('http://103.236.154.122:2222/api/dailyproductions/Getallrejdatasum/P/F/2022-03-01');
//    this.rowData = this.http.get<any[]>('http://103.236.154.122:2222/api/dailyproductions/Getallrejdata/' + this.yearname + '-' + this.mon + '-01');
//  }

onviewDetail() {
  this.getselectedmonth();
  this.x = this.monthNames.indexOf(this.Month) + 1;
  this.index = this.x.toString();
  this.incentive.getMonthlyRej(this.yearname, this.index).subscribe(data => {
    this.monthly = data;
    this.rejValuesMonthly = this.getTotal(this.monthly);
  });
  this.rowData = this.incentive.getAgGridData(this.yearname, this.index);
}

getTotal(values) {
  this.rejValues = 0;
  for (let i = 0; i < values.length; i++) {
    this.rejValues = this.rejValues + values[i].value;
  }
  this.rejValues = Math.round((this.rejValues / 100000) * 100) / 100;
  return this.rejValues;
}

daysInMOnth(x, y) {
  this.monthDays =  new Date(y, x, 0).getDate();
  return this.monthDays;
}

MyYearPivotComparator(a: string, b: string) {
  const requiredOrder = ['31', '30', '29', '28', '27', '26', '25', '24', '23', '22', '21', '20', '19' ,'18','17','16','15','14','13','12','11','10','9','8','7','6','5','4','3','2','1'];
  return requiredOrder.indexOf(a) - requiredOrder.indexOf(b);
}

}

