import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Grid, GridOptions } from 'ag-grid-community';
import { PurchaserepoService } from '../shared/purchaserepo/purchaserepo.service';
import { PlantService } from '../shared/plant/plant.service';
import { User } from '../shared/login/User.model';
import { LoginService } from '../shared/login/login.service';
import { ColDef, GridReadyEvent, SideBarDef  } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { InnerRenderer } from '../salesrepo/innerrenderer.component';
import { Plant } from '../shared/plant/plant.model';

@Component({
  selector: 'app-purchaserepoyear',
  templateUrl: './purchaserepoyear.component.html',
  styleUrls: ['./purchaserepoyear.component.css']
})
export class PurchaserepoyearComponent implements OnInit {

  public d: any;
  public currentUser: User;

  public yearname: string;
  public year: string;
  public plantcode: string;
  public plant: string;
  public selectedcode: string;
  public selected_plantname: string;
  public loading = false;

  rowData: Observable<any[]>;
  public sideBar: SideBarDef | string | boolean | null = 'filters';
  public columnDefs: ColDef[] = [
    {headerName: 'Purchase Category', field: 'subGrouping', enableRowGroup: true, rowGroup: true, hide: true, cellStyle: {fontSize: '13px'} },
    // {headerName: 'Branch', field: 'plantShortName', enableRowGroup: true,  rowGroup: true, hide: true, cellStyle: {fontSize: '13px'} },
    {headerName: 'Year', field: 'finyear', pivot: true, enablePivot: true, sortable: true, filter: true, pivotComparator: this.MyYearPivotComparator, cellStyle: {fontSize: '13px'}},
    {headerName: 'Month', field: 'monthname', pivot: true, enablePivot: true, sortable: true, pivotComparator: this.MyYearPivotComparator2, cellStyle: {fontSize: '13px'} },
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
    floatingFilter: true,
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

  public gridOptions: GridOptions = {
    pivotColumnGroupTotals: 'before',
  };

  MyYearPivotComparator(a: string, b: string) {
    const requiredOrder = ['2023','2022','2021','2020'];
    return requiredOrder.indexOf(a) - requiredOrder.indexOf(b);
  }

  MyYearPivotComparator2(a: string, b: string) {
    const requiredOrder = ['April','May','June','July','August','September','October','November','December','January','February','March'];
    return requiredOrder.indexOf(a) - requiredOrder.indexOf(b);
  }

  MyYearPivotComparator3(a: string, b: string) {
    const requiredOrder = ['ABS','Capital','Chemical','Consumable','Consumables','ETP Chemical','HR','Jig Mfg','Moulded Parts Purchase','Other Expenses','Packing','Sales Rej','Services','Stores & Spares','Tool Purchase','Transport','Utility'];
    return requiredOrder.indexOf(a) - requiredOrder.indexOf(b);
  }

  constructor(private purchaserepo: PurchaserepoService, public plantservice: PlantService, public lservice: LoginService,) {
    this.plantcode = 'all';
    this.lservice.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    const me =this;
    this.d = new Date();
    this.yearname = this.d.getFullYear();
    this.rowData = this.purchaserepo.getDataall(this.yearname, this.plantcode);
    this.plantservice
      .sgetPlantData(me.currentUser.id)
      .toPromise()
      .then(res => {
        me.plantservice.splantlist = res as Plant[];
        console.log('splantlist', me.plantservice.splantlist);
        me.selectedcode = me.plantservice.splantlist[0].plantcode;
        me.selected_plantname = me.plantservice.splantlist[0].plantshortname;
        me.loading = false;
      });
  }

  selectedGrid(ev) {
    if(ev === '') {
      this.selectedcode = 'all';
    }else{
      this.selectedcode = ev;
    }
    const me = this;
    this.rowData = this.purchaserepo.getDataall(this.yearname, this.selectedcode);
    console.log(this.selectedcode);
  }

  onGridReady(params: GridReadyEvent) {}
  
  getRowStyle = params => {
    if (params.node.footer) {
        return { background: 'PowderBlue', fontWeight: 'bolder'};
    }    
};

}
