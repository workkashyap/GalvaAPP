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

  public monthly: any;
  public today: any;
  public datarow: any[] = [];
  
  rowData: Observable<any[]>;
  // public rowData: any;

  public columnDefs1 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
    { headerName: '1', field: 'd_1', cellStyle: {fontSize: '13px'}},
  ];

  public columnDefs2 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
    { headerName: '2', field: 'd_2', cellStyle: {fontSize: '13px'}},
    { headerName: '1', field: 'd_1', cellStyle: {fontSize: '13px'}},
  ]

  public columnDefs3 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
    { headerName: '3', field: 'd_3', cellStyle: {fontSize: '13px'}},
    { headerName: '2', field: 'd_2', cellStyle: {fontSize: '13px'}},
    { headerName: '1', field: 'd_1', cellStyle: {fontSize: '13px'}},
  ];

  public columnDefs4 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
    { headerName: '4', field: 'd_4', cellStyle: {fontSize: '13px'}},
    { headerName: '3', field: 'd_3', cellStyle: {fontSize: '13px'}},
    { headerName: '2', field: 'd_2', cellStyle: {fontSize: '13px'}},
    { headerName: '1', field: 'd_1', cellStyle: {fontSize: '13px'}},
  ];

  public columnDefs5 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
    { headerName: '5', field: 'd_5', cellStyle: {fontSize: '13px'}},
    { headerName: '4', field: 'd_4', cellStyle: {fontSize: '13px'}},
    { headerName: '3', field: 'd_3', cellStyle: {fontSize: '13px'}},
    { headerName: '2', field: 'd_2', cellStyle: {fontSize: '13px'}},
    { headerName: '1', field: 'd_1', cellStyle: {fontSize: '13px'}},
  ];

  public columnDefs6 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
    { headerName: '6', field: 'd_6', cellStyle: {fontSize: '13px'}},
    { headerName: '5', field: 'd_5', cellStyle: {fontSize: '13px'}},
    { headerName: '4', field: 'd_4', cellStyle: {fontSize: '13px'}},
    { headerName: '3', field: 'd_3', cellStyle: {fontSize: '13px'}},
    { headerName: '2', field: 'd_2', cellStyle: {fontSize: '13px'}},
    { headerName: '1', field: 'd_1', cellStyle: {fontSize: '13px'}},
  ];

  public columnDefs7 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
    { headerName: '7', field: 'd_7', cellStyle: {fontSize: '13px'}},
    { headerName: '6', field: 'd_6', cellStyle: {fontSize: '13px'}},
    { headerName: '5', field: 'd_5', cellStyle: {fontSize: '13px'}},
    { headerName: '4', field: 'd_4', cellStyle: {fontSize: '13px'}},
    { headerName: '3', field: 'd_3', cellStyle: {fontSize: '13px'}},
    { headerName: '2', field: 'd_2', cellStyle: {fontSize: '13px'}},
    { headerName: '1', field: 'd_1', cellStyle: {fontSize: '13px'}},
  ];

  public columnDefs8 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
    { headerName: '8', field: 'd_8', cellStyle: {fontSize: '13px'}},
    { headerName: '7', field: 'd_7', cellStyle: {fontSize: '13px'}},
    { headerName: '6', field: 'd_6', cellStyle: {fontSize: '13px'}},
    { headerName: '5', field: 'd_5', cellStyle: {fontSize: '13px'}},
    { headerName: '4', field: 'd_4', cellStyle: {fontSize: '13px'}},
    { headerName: '3', field: 'd_3', cellStyle: {fontSize: '13px'}},
    { headerName: '2', field: 'd_2', cellStyle: {fontSize: '13px'}},
    { headerName: '1', field: 'd_1', cellStyle: {fontSize: '13px'}},
  ];

  public columnDefs9 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
    { headerName: '9', field: 'd_9', cellStyle: {fontSize: '13px'}},
    { headerName: '8', field: 'd_8', cellStyle: {fontSize: '13px'}},
    { headerName: '7', field: 'd_7', cellStyle: {fontSize: '13px'}},
    { headerName: '6', field: 'd_6', cellStyle: {fontSize: '13px'}},
    { headerName: '5', field: 'd_5', cellStyle: {fontSize: '13px'}},
    { headerName: '4', field: 'd_4', cellStyle: {fontSize: '13px'}},
    { headerName: '3', field: 'd_3', cellStyle: {fontSize: '13px'}},
    { headerName: '2', field: 'd_2', cellStyle: {fontSize: '13px'}},
    { headerName: '1', field: 'd_1', cellStyle: {fontSize: '13px'}},
  ];

  public columnDefs10 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
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
  ];

  public columnDefs11 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
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
  ];

  public columnDefs12 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
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
  ];

  public columnDefs13 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
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
  ];

  public columnDefs14 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
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
  ];

  public columnDefs15 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
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
  ];

  public columnDefs16 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
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
  ];

  public columnDefs17 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
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
  ];

  public columnDefs18 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
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
  ];

  public columnDefs19 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
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
  ];

  public columnDefs20 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
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
  ];

  public columnDefs21 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
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
  ];

  public columnDefs22 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
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
  ];

  public columnDefs23 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
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
  ];

  public columnDefs24 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
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
  ];

  public columnDefs25 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
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
  ];
  
  public columnDefs26 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
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
  ];

  public columnDefs27 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
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
  ];

  public columnDefs28 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
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
  ];

  public columnDefs29 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
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
  ];

  public columnDefs30 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
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
  ];

  public columnDefs31 = [
    { headerName: 'Plant(Value in Lacs)', field: 'plant', pinned: 'left', cellStyle: {fontSize: '13px'}},
    { headerName: 'Total', field: 'total', pinned: 'left', cellStyle: {fontSize: '13px', 'background-color': '#e7feff'}},
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
  columnDefs: this.columnDefs31,
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



onview(){
  if (this.monthtoday === this.Month) {
    if (this.dateno === 1) {
      this.gridOptions.api.setColumnDefs(this.columnDefs1);
    }
    else if (this.dateno === 2) {
      this.gridOptions.api.setColumnDefs(this.columnDefs2);
    }
    else if (this.dateno === 3) {
      this.gridOptions.api.setColumnDefs(this.columnDefs3);
    }
    else if (this.dateno === 4) {
      this.gridOptions.api.setColumnDefs(this.columnDefs4);
    }
    else if (this.dateno === 5) {
      this.gridOptions.api.setColumnDefs(this.columnDefs5);
    }
    else if (this.dateno === 6) {
      this.gridOptions.api.setColumnDefs(this.columnDefs6);
    }
    else if (this.dateno === 7) {
      this.gridOptions.api.setColumnDefs(this.columnDefs7);
    }
    else if (this.dateno === 8) {
      this.gridOptions.api.setColumnDefs(this.columnDefs8);
    }
    else if (this.dateno === 9) {
      this.gridOptions.api.setColumnDefs(this.columnDefs9);
    }
    else if (this.dateno === 10) {
      this.gridOptions.api.setColumnDefs(this.columnDefs10);
    }
    else if (this.dateno === 11) {
      this.gridOptions.api.setColumnDefs(this.columnDefs11);
    }
    else if (this.dateno === 12) {
      this.gridOptions.api.setColumnDefs(this.columnDefs12);
    }
    else if (this.dateno === 13) {
      this.gridOptions.api.setColumnDefs(this.columnDefs13);
    }
    else if (this.dateno === 14) {
      this.gridOptions.api.setColumnDefs(this.columnDefs14);
    }
    else if (this.dateno === 15) {
      this.gridOptions.api.setColumnDefs(this.columnDefs15);
    }
    else if (this.dateno === 16) {
      this.gridOptions.api.setColumnDefs(this.columnDefs16);
    }
    else if (this.dateno === 17) {
      this.gridOptions.api.setColumnDefs(this.columnDefs17);
    }
    else if (this.dateno === 18) {
      this.gridOptions.api.setColumnDefs(this.columnDefs18);
    }
    else if (this.dateno === 19) {
      this.gridOptions.api.setColumnDefs(this.columnDefs19);
    }
    else if (this.dateno === 20) {
      this.gridOptions.api.setColumnDefs(this.columnDefs20);
    }
    else if (this.dateno === 21) {
      this.gridOptions.api.setColumnDefs(this.columnDefs21);
    }
    else if (this.dateno === 22) {
      this.gridOptions.api.setColumnDefs(this.columnDefs22);
    }
    else if (this.dateno === 23) {
      this.gridOptions.api.setColumnDefs(this.columnDefs23);
    }
    else if (this.dateno === 24) {
      this.gridOptions.api.setColumnDefs(this.columnDefs24);
    }
    else if (this.dateno === 25) {
      this.gridOptions.api.setColumnDefs(this.columnDefs25);
    }
    else if (this.dateno === 26) {
      this.gridOptions.api.setColumnDefs(this.columnDefs26);
    }
    else if (this.dateno === 27) {
      this.gridOptions.api.setColumnDefs(this.columnDefs27);
    }
    else if (this.dateno === 28) {
      this.gridOptions.api.setColumnDefs(this.columnDefs28);
    }
    else if (this.dateno === 29) {
      this.gridOptions.api.setColumnDefs(this.columnDefs29);
    }
    else if (this.dateno === 30) {
      this.gridOptions.api.setColumnDefs(this.columnDefs30);
    }
    else{
      this.gridOptions.api.setColumnDefs(this.columnDefs31);
    }
  }
  else if (this.monthname === this.monthTemp) {
    if (this.dateno === 1) {
      this.gridOptions.api.setColumnDefs(this.columnDefs1);
    }
    else if (this.dateno === 2) {
      this.gridOptions.api.setColumnDefs(this.columnDefs2);
    }
    else if (this.dateno === 3) {
      this.gridOptions.api.setColumnDefs(this.columnDefs3);
    }
    else if (this.dateno === 4) {
      this.gridOptions.api.setColumnDefs(this.columnDefs4);
    }
    else if (this.dateno === 5) {
      this.gridOptions.api.setColumnDefs(this.columnDefs5);
    }
    else if (this.dateno === 6) {
      this.gridOptions.api.setColumnDefs(this.columnDefs6);
    }
    else if (this.dateno === 7) {
      this.gridOptions.api.setColumnDefs(this.columnDefs7);
    }
    else if (this.dateno === 8) {
      this.gridOptions.api.setColumnDefs(this.columnDefs8);
    }
    else if (this.dateno === 9) {
      this.gridOptions.api.setColumnDefs(this.columnDefs9);
    }
    else if (this.dateno === 10) {
      this.gridOptions.api.setColumnDefs(this.columnDefs10);
    }
    else if (this.dateno === 11) {
      this.gridOptions.api.setColumnDefs(this.columnDefs11);
    }
    else if (this.dateno === 12) {
      this.gridOptions.api.setColumnDefs(this.columnDefs12);
    }
    else if (this.dateno === 13) {
      this.gridOptions.api.setColumnDefs(this.columnDefs13);
    }
    else if (this.dateno === 14) {
      this.gridOptions.api.setColumnDefs(this.columnDefs14);
    }
    else if (this.dateno === 15) {
      this.gridOptions.api.setColumnDefs(this.columnDefs15);
    }
    else if (this.dateno === 16) {
      this.gridOptions.api.setColumnDefs(this.columnDefs16);
    }
    else if (this.dateno === 17) {
      this.gridOptions.api.setColumnDefs(this.columnDefs17);
    }
    else if (this.dateno === 18) {
      this.gridOptions.api.setColumnDefs(this.columnDefs18);
    }
    else if (this.dateno === 19) {
      this.gridOptions.api.setColumnDefs(this.columnDefs19);
    }
    else if (this.dateno === 20) {
      this.gridOptions.api.setColumnDefs(this.columnDefs20);
    }
    else if (this.dateno === 21) {
      this.gridOptions.api.setColumnDefs(this.columnDefs21);
    }
    else if (this.dateno === 22) {
      this.gridOptions.api.setColumnDefs(this.columnDefs22);
    }
    else if (this.dateno === 23) {
      this.gridOptions.api.setColumnDefs(this.columnDefs23);
    }
    else if (this.dateno === 24) {
      this.gridOptions.api.setColumnDefs(this.columnDefs24);
    }
    else if (this.dateno === 25) {
      this.gridOptions.api.setColumnDefs(this.columnDefs25);
    }
    else if (this.dateno === 26) {
      this.gridOptions.api.setColumnDefs(this.columnDefs26);
    }
    else if (this.dateno === 27) {
      this.gridOptions.api.setColumnDefs(this.columnDefs27);
    }
    else if (this.dateno === 28) {
      this.gridOptions.api.setColumnDefs(this.columnDefs28);
    }
    else if (this.dateno === 29) {
      this.gridOptions.api.setColumnDefs(this.columnDefs29);
    }
    else if (this.dateno === 30) {
      this.gridOptions.api.setColumnDefs(this.columnDefs30);
    }
    else{
      this.gridOptions.api.setColumnDefs(this.columnDefs31);
    }
  }
  else {
    this.gridOptions.api.setColumnDefs(this.columnDefs31);
  }
  
}

onviewDetail() {
  this.getselectedmonth();
  this.x = this.monthNames.indexOf(this.Month) + 1;
  this.index = this.x.toString();
  this.incentive.getMonthlyRej(this.yearname, this.index).subscribe(data => {
    this.monthly = data;
    this.rejValuesMonthly = this.getTotal(this.monthly);
  });
  this.rowData = this.incentive.getAgGridData(this.yearname, this.index);
  this.onview();
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

