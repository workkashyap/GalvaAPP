import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
@Component({
  selector: 'app-incentive',
  templateUrl: './incentive.component.html',
  styleUrls: ['./incentive.component.css']
})
export class IncentiveComponent  {
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

rowData: Observable<any[]>;

constructor(private http: HttpClient) {
    this.rowData = this.http.get<any[]>('http://103.236.154.122:2222/api/dailyproductions/Getallrejdata/2021-01-01');
}
  
}

