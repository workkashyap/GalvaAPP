import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  public monthNames: any;
  public days: any;
  public d: any;
  public total: any;

  public monthly: any;
  public today: any;
  public datarow: any[] = [];
  
  rowData: Observable<any[]>;
  // public rowData: any;

  public columnDefs: ColDef[] = [
    { field: 'plant', rowGroup: true },
    // { headerName: 'Total (in Lakhs)', aggFunc: this.getTotal , rowGroup: true },
    { field: 'd_Date', pivot: true },
    {headerName: '' , field: 'value', aggFunc: 'sum' },
   // { field: 'rejectValue', aggFunc: 'sum' },
   // { field: 'year', rowGroup: true, hide: true },
   // { field: 'date' , pivot: true },
   // { field: 'sport' },
   // { field: 'gold' },
   // { field: 'silver' },
   // { field: 'bronze' },
  ];

public defaultColDef: ColDef = {
  flex: 1,
  minWidth: 110,
  sortable: true,
  resizable: true,
};
public autoGroupColumnDef: ColDef = {
  headerName: 'Company',
  minWidth: 220,
  cellRendererParams: {
      suppressCount: true,
      checkbox: false,
  }

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
  this. rejValues = Math.round(this.rejValues * 100) / 100
  return this.rejValues;
}


}

