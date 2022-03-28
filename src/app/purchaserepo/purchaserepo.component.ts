import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaserepoService } from '../shared/purchaserepo/purchaserepo.service';
import { ColDef, GridReadyEvent, SideBarDef  } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { InnerRenderer } from '../salesrepo/innerrenderer.component';

@Component({
  selector: 'app-purchaserepo',
  templateUrl: './purchaserepo.component.html',
  styleUrls: ['./purchaserepo.component.css']
})
export class PurchaserepoComponent implements OnInit {

  public d: any;

  public yearname: string;
  public year: string;

  rowData: Observable<any[]>;
  public sideBar: SideBarDef | string | boolean | null = 'columns';
  public columnDefs: ColDef[] = [
    {headerName: 'Month', field: 'monthname', enableRowGroup: true, rowGroup: true, hide: true, cellStyle: {fontSize: '13px'} },
    {headerName: 'Branch', field: 'plantShortName', enableRowGroup: true,  rowGroup: true, hide: true, cellStyle: {fontSize: '13px'} },
    {headerName: 'Sub Grouping', field: 'subGrouping', pivot: true, enablePivot: true, sortable: true, cellStyle: {fontSize: '13px'} },
    {headerName: '', field: 'totalPurchase', aggFunc: params => {
                                                        let sum = 0;
                                                        params.values.forEach(value => sum += value);
                                                        return Math.round(sum * 100) / 100; },
                                                        cellStyle: {fontSize: '13px'},
                                                      }
  ];

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 120,
    sortable: true,
    resizable: true,
  };

  public autoGroupColumnDef: ColDef = {
    minWidth: 220,
    pinned: 'left',
    cellRendererParams: {
      suppressCount: true,
       checkbox: false,
       innerRenderer: InnerRenderer,
    },
  };

  constructor(private purchaserepo: PurchaserepoService) { }

  ngOnInit() {
    this.d = new Date();
    this.yearname = this.d.getFullYear();
    this.rowData = this.purchaserepo.getData(this.yearname);
  }

  getselectedyear() {
    this.year = this.yearname;
    this.rowData = this.purchaserepo.getData(this.year);
  }

  onGridReady(params: GridReadyEvent) {}
  
  getRowStyle = params => {
    if (params.node.footer) {
        return { background: 'PowderBlue', fontWeight: 'bolder'};
    }    
};

}
