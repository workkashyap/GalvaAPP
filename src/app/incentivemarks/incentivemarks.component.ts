import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Grid, GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { IncentiveService } from '../shared/incentive/incentive.service';


@Component({
  selector: 'app-incentivemarks',
  templateUrl: './incentivemarks.component.html',
  styleUrls: ['./incentivemarks.component.scss']
})
export class IncentivemarksComponent implements OnInit {

  constructor(private incentive: IncentiveService) { }
  rowData = [ ];
  ngOnInit() {
    this.incentive.getAllincentivemarks().toPromise()
    .then(res => {
        this.rowData = res
    });
  }
  columnDefs: ColDef[] = [
    { field: 'id' },
    { field: 'type' },
    { field: 'range' },
    { field: 'marks' }

];
public autoGroupColumnDef: ColDef = {
  minWidth: 210,
  cellRendererParams: {
      suppressCount: true,
      checkbox: false,
  }

};
public defaultColDef: ColDef = {
  flex: 1,
  minWidth: 90,
  sortable: true,
  resizable: true,
};
}
