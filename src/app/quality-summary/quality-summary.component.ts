import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import * as Chart from 'chart.js';
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
  loading: boolean = true;

  public myChart: Chart;
  canvas: any;
  ctx: any;

  public columnDefs: ColDef[] = [
    { headerName: 'Values (In Lacs / %)', field: 'inspValue', pinned: 'left', width: 180, cellStyle: { fontSize: '14px' } },
    { headerName: 'Total', field: 'total', pinned: 'left', width: 150, cellStyle: { fontSize: '14px', 'background-color': '#e7feff' } },
    { headerName: 'April', field: 'apr', cellStyle: { fontSize: '14px' } },
    { headerName: 'May', field: 'may', cellStyle: { fontSize: '14px' } },
    { headerName: 'June', field: 'jun', cellStyle: { fontSize: '14px' } },
    { headerName: 'July', field: 'jul', cellStyle: { fontSize: '14px' } },
    { headerName: 'Aug', field: 'aug', cellStyle: { fontSize: '14px' } },
    { headerName: 'Sep', field: 'sep', cellStyle: { fontSize: '14px' } },
    { headerName: 'Oct', field: 'oct', cellStyle: { fontSize: '14px' } },
    { headerName: 'Nov', field: 'nov', cellStyle: { fontSize: '14px' } },
    { headerName: 'Dec', field: 'dec', cellStyle: { fontSize: '14px' } },
    { headerName: 'Jan', field: 'jan', cellStyle: { fontSize: '14px' } },
    { headerName: 'Feb', field: 'feb', cellStyle: { fontSize: '14px' } },
    { headerName: 'March', field: 'mar', cellStyle: { fontSize: '14px' } },
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
      this.yearname = (Number(this.cyear) - 1) + '-' + this.cyear;
    } else {
      this.yearname = this.cyear + '-' + (Number(this.cyear) + 1);
    }

    this.getSummary(this.plantcode, this.yearname);
  }

  index: any;
  data: any = [];
  label: any = [];

  getSummary(plntcod, year) {
    this.data = []; this.label = [];
    this.qualityservice.getSummaryAllReport(plntcod, year).toPromise().then(
      res => {
        this.rowData = res;

        var i0 = this.rowData.map(function (e) { return e.inspValue; }).indexOf('Insp Value');
        var i1 = this.rowData.map(function (e) { return e.inspValue; }).indexOf('OK Value');
        var irewrk = this.rowData.map(function (e) { return e.inspValue; }).indexOf('Rework OK');

        var irejper = this.rowData.map(function (e) { return e.inspValue; }).indexOf('Rej Per');
        var i2 = this.rowData.map(function (e) { return e.inspValue; }).indexOf('Reject Value');
        this.index = irejper;
        //count rejectin value => inspection value -(minus) ok value -(minus) rework value = total rejectin value
        if (i0 >= 0 && i1 >= 0 && irewrk >= 0) {
          this.rowData[i2] = Object.keys(this.rowData[i0]).reduce((a, k) => {
            if (k === 'id' || k === 'plantcode') {
              a[k] = this.rowData[i2][k];
              return a;
            } else if (k === 'inspValue') { a[k] = this.rowData[i2][k]; return a; }
            else {
              if (this.rowData[i0][k] != 0.00) {
                a[k] = this.rowData[i0][k].replaceAll(',', '') - this.rowData[i1][k].replaceAll(',', '') - this.rowData[irewrk][k].replaceAll(',', '');
                a[k] = a[k].toFixed(2);
                return a;
              } else {
                a[k] = this.rowData[i2][k];
                return a;
              }
            }
          }, {});
          this.rowData[irejper] = Object.keys(this.rowData[i0]).reduce((a, k) => {
            if (k === 'id' || k === 'plantcode') {
              a[k] = this.rowData[irejper][k];
              return a;
            } else if (k === 'inspValue') { a[k] = this.rowData[irejper][k]; return a; }
            else {
              if (this.rowData[i0][k] != 0.00) {
                a[k] = this.rowData[i2][k].replaceAll(',', '') / this.rowData[i0][k].replaceAll(',', '') * 100;
                a[k] = a[k].toFixed(2);
                return a;
              } else {
                a[k] = this.rowData[i2][k];
                return a;
              }
            }
          }, {});
        }

        if (i0 >= 0 && i1 >= 0 && irewrk < 0) {
          this.rowData[i2] = Object.keys(this.rowData[i0]).reduce((a, k) => {
            if (k === 'id' || k === 'plantcode') {
              a[k] = this.rowData[i2][k];
              return a;
            } else if (k === 'inspValue') { a[k] = this.rowData[i2][k]; return a; }
            else {
              if (this.rowData[i0][k] != 0.00) {
                a[k] = this.rowData[i0][k].replaceAll(',', '') - this.rowData[i1][k].replaceAll(',', '');
                a[k] = a[k].toFixed(2);
                return a;
              } else {
                a[k] = this.rowData[i2][k];
                return a;
              }
            }
          }, {});
          this.rowData[irejper] = Object.keys(this.rowData[i0]).reduce((a, k) => {
            if (k === 'id' || k === 'plantcode') {
              a[k] = this.rowData[irejper][k];
              return a;
            } else if (k === 'inspValue') { a[k] = this.rowData[irejper][k]; return a; }
            else {
              if (this.rowData[i0][k] != 0.00) {
                a[k] = this.rowData[i2][k].replaceAll(',', '') / this.rowData[i0][k].replaceAll(',', '') * 100;
                a[k] = a[k].toFixed(2);
                return a;
              } else {
                a[k] = this.rowData[i2][k];
                return a;
              }
            }
          }, {});
        }

        this.rowData.forEach((e, i) => {

          if (e.inspValue == "Rej Per" || e.inspValue == "OK Per") {
            e.total = Number((
              Number(e.jan != null ? e.jan.replaceAll(',', '') : e.jan) +
              Number(e.feb != null ? e.feb.replaceAll(',', '') : e.feb) +
              Number(e.mar != null ? e.mar.replaceAll(',', '') : e.mar) +
              Number(e.apr != null ? e.apr.replaceAll(',', '') : e.apr) +
              Number(e.may != null ? e.may.replaceAll(',', '') : e.may) +
              Number(e.jun != null ? e.jun.replaceAll(',', '') : e.jun) +
              Number(e.jul != null ? e.jul.replaceAll(',', '') : e.jul) +
              Number(e.aug != null ? e.aug.replaceAll(',', '') : e.aug) +
              Number(e.sep != null ? e.sep.replaceAll(',', '') : e.sep) +
              Number(e.oct != null ? e.oct.replaceAll(',', '') : e.oct) +
              Number(e.nov != null ? e.nov.replaceAll(',', '') : e.nov) +
              Number(e.dec != null ? e.dec.replaceAll(',', '') : e.dec)) / 12).toFixed(2);
          } else {
            e.total = Number((
              Number(e.jan != null ? e.jan.replaceAll(',', '') : e.jan) +
              Number(e.feb != null ? e.feb.replaceAll(',', '') : e.feb) +
              Number(e.mar != null ? e.mar.replaceAll(',', '') : e.mar) +
              Number(e.apr != null ? e.apr.replaceAll(',', '') : e.apr) +
              Number(e.may != null ? e.may.replaceAll(',', '') : e.may) +
              Number(e.jun != null ? e.jun.replaceAll(',', '') : e.jun) +
              Number(e.jul != null ? e.jul.replaceAll(',', '') : e.jul) +
              Number(e.aug != null ? e.aug.replaceAll(',', '') : e.aug) +
              Number(e.sep != null ? e.sep.replaceAll(',', '') : e.sep) +
              Number(e.oct != null ? e.oct.replaceAll(',', '') : e.oct) +
              Number(e.nov != null ? e.nov.replaceAll(',', '') : e.nov) +
              Number(e.dec != null ? e.dec.replaceAll(',', '') : e.dec))).toFixed(2);
          }
          if (e.inspValue == "Rej Per") {
            this.data.push(e.apr, e.may, e.jun, e.jul, e.aug, e.sep, e.oct, e.nov, e.dec, e.jan, e.feb, e.mar);
          }
        });
        this.label.push('APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER', 'JANUARY', 'FEBRUARY', 'MARCH');
        this.loadchart();
      }
    );
  }

  selectedGrid(plantcode) {
    this.plantcode = plantcode;
    this.getSummary(this.plantcode, this.yearname);
  }

  selectedYear(year) {
    this.yearname = year;
    this.getSummary(this.plantcode, this.yearname);
  }

  loadchart() {
    this.loading = false;
    Chart.defaults.global.legend.display = false;
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    // let rejqty = this.rejqty;
    this.myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: this.label,
        datasets: [
          {
            label: 'Rejection Percentage',
            type: 'line',
            data: this.data,
            borderColor: 'red'
          },
        ]
      },
      options: {
        scaleBeginAtZero: true,
        scaleShowGridLines: true,
        // tslint:disable-next-line:quotemark
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleGridLineWidth: 1,
        scaleShowHorizontalLines: true,
        scaleShowVerticalLines: true,
        barShowStroke: true,
        barStrokeWidth: 2,
        barValueSpacing: 5,
        barDatasetSpacing: 1,
        responsive: true,
        tooltips: {
          mode: 'index',
          intersect: true,
          callbacks: {
            label: function (tooltipItems, data) {
              var multistringText = ["Rejection % : " + tooltipItems.yLabel];
              // multistringText.push("Quantity : " + rejqty[tooltipItems.index]);
              return multistringText;
            }
          }
        },
        maintainAspectRatio: false,
        hover: {
          mode: 'label'
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              scaleLabel: {
                display: true,
                labelString: 'Value In Percentage'
              }
            },
          ]
        },
        animation: {
          duration: 1,
          onComplete: function () {
            var ctx = this.ctx;
            const chartInstance = this.chart;
            this.ctx = chartInstance.ctx;
            this.textAlign = 'center';
            this.textBaseline = 'bottom';
            ctx.fillStyle = "#000000"

            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data = dataset.data[index];
                ctx.fillText(data, bar._model.x, bar._model.y-8);
              });
            });

          }
        }
      }
    });
    this.myChart.update();
  }


  getRowStyle = params => {
    if (params.node.footer) {
      return { background: 'PowderBlue', fontWeight: 'bolder' };
    }
  }
}