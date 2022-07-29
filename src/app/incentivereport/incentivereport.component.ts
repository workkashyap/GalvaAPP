import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Incentive } from '../shared/incentive/incentive.model'
import { Grid, GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { IncentiveService } from '../shared/incentive/incentive.service';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

@Component({
  selector: 'app-incentivereport',
  templateUrl: './incentivereport.component.html',
  styleUrls: ['./incentivereport.component.css']
})
export class IncentivereportComponent implements OnInit {

  public year: string;
  public Month: string;
  public x: number;
  public index: string;

  public monthname: string;
  public monthtoday: string;
  public monthTemp: string;
  public yearname: string;
  public day: string;
  public date: string;
  public fullDate: string;

  public rejValues: number;
  public dateno: number;
  public rejValuesToday: number;
  public rejValuesMonthly: number;
  public numberOfDays: number;

  public monthNames: any;
  public monthDays: number;
  public days: any;
  public d: any;
  public total: any;
  public temp: any[] = [];
 public rowStyle: any;
  public monthly: any;
  public today: any;
  public allPlant: any;
  public reportRej: number;
  public reportSales: number;
  
  rowData: Observable<any[]>;

  public columnDefs: ColDef[] = [
    { headerName: 'Plant', field: 'over_All_Company_Rej', cellStyle: {fontSize: '16px'}},
    { headerName: 'Values in Lacs', field: 'value', cellStyle: {fontSize: '16px'}},
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
    columnDefs: this.columnDefs,
    // pivotRowTotals: 'before',
    
    
  };

  
  

  constructor(private incentive: IncentiveService) { }

  ngOnInit() {
    this.monthly = [];
    this.today = [];
    this.allPlant = [];
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
    this.monthtoday = this.monthNames[this.d.getMonth()];
    this.monthTemp = this.monthNames[this.d.getMonth()];
    this.dateno = this.d.getDate();
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
    this.incentive.getAllPlantReport(this.yearname, this.index).subscribe(data=> {
       this.allPlant = data;
    })
    // this.incentive.getAgGridData().subscribe(data => {
    //    this.rowData = data;
    //    ;
  
    // });
    this.rowData = this.incentive.getAllPlantReportDetail(this.yearname, this.index);
    this.getSummary();

  }

  getTotal(values) {
    this.rejValues = 0;
    for (let i = 0; i < values.length; i++) {
      this.rejValues = this.rejValues + values[i].value;
    }
    this.rejValues = Math.round((this.rejValues / 100000) * 100) / 100;
    return this.rejValues;
  }

  getSummary(){
    this.reportRej = 0;
    this.reportSales = 0;
    this.rowData.forEach(element => {
      for(const x in element) {
        if(element[x].type === "Rejection"){
          if(element[x].over_All_Company_Rej.includes("Sales Return")) {
            console.log("Rej " + element[x].value);
            this.reportRej = this.reportRej + (element[x].value);
            console.log(this.reportRej);
            this.rowStyle = 'row-fail';
          }
          else{
            console.log("Rej " + element[x].value);
            this.reportRej = this.reportRej + element[x].value;
            console.log(this.reportRej);
            this.rowStyle = 'row-fail';
           
          } 
        }
        else {
          
          console.log("Sales " + element[x].value);
          this.reportSales = this.reportSales + element[x].value;
          console.log(this.reportSales);
          this.rowStyle = 'row-pass';
         
        }
      }
    });
  }
  
  daysInMOnth(x, y) {
    this.monthDays =  new Date(y, x, 0).getDate();
    return this.monthDays;
  }

  onviewDetail() {
    this.getselectedmonth();
    this.x = this.monthNames.indexOf(this.Month) + 1;
    this.index = this.x.toString();
    this.incentive.getMonthlyRej(this.yearname, this.index).subscribe(data => {
      this.monthly = data;
      this.rejValuesMonthly = this.getTotal(this.monthly);
    });
    this.incentive.getAllPlantReport(this.yearname, this.index).subscribe(data1=> {
      this.allPlant = data1;
   });
   this.rowData = this.incentive.getAllPlantReportDetail(this.yearname, this.index);
   this.getSummary();
  }

  viewDetail() {
    $('#basicExampleModal').modal('show');
  }

}
