import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { DailyproductionService } from '../shared/dailyProduction/dailyproduction.service';
import { DailyReportDisplay } from '../shared/dailyProduction/dailyreportdisplay.model';
import { DailyReportSummary } from '../shared/dailyProduction/dailyreportsummary.model';
import { User } from '../shared/login/User.model';
import { PlantService } from '../shared/plant/plant.service';
import { LoginService } from '../shared/login/login.service';
import * as ChartAnnotation from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  title = 'Chart';
  public myChart: Chart;
  canvas: any;
  ctx: any;

  public selectedchart: DailyReportDisplay[] = [];
  public selectedcharttot: DailyReportSummary[] = [];

  public daylist: string[] = [];
  public inspectionvalue: number[] = [];
  public inspectiontotal: number;
  public Okvalue: number[] = [];
  public rejectvalue: number[] = [];
  public Rejectper: number[] = [];


  public year: string;
  public Month: string;
  public Week: string;
  public Day: string;

  public monthname: string;
  public yearname: string;
  public typename: string;

  public cv: number;
  public loading = false;
  public monthNames: any;
  public yearNames: any;
  public d: any;
  currentUser: User;

  constructor(public service: DailyproductionService, public plantservice: PlantService, public lservice: LoginService) {
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));

  }

  ngOnInit() {
    const namedChartAnnotation = ChartAnnotation;
    namedChartAnnotation['id'] = 'annotation';
    Chart.pluginService.register(namedChartAnnotation);
    this.plantservice.getPlantData(this.currentUser.id);
    this.service.plantcode = '1010';
    this.service.plantshortname = 'GDPL Vapi';
    this.loading = true;
    this.daylist = [];
    this.cv = 0;
    this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
      'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];
    this.yearNames = ['2022', '2021', '2020'];
    this.d = new Date();
    this.monthname = this.monthNames[this.d.getMonth()];
    this.yearname = this.yearNames[this.d.getYear()];
    this.typename = 'PLATING';
    this.loadchart1();
  }
  getselectedtype(ev) {
    this.Month = 'a';
    this.typename = ev;
    if (this.myChart) this.myChart.destroy();
    this.ctx.clearRect(0, 0, this.canvas.weight, this.canvas.height);
    this.loadchart1();
  }
  selectedGrid(ev) {
    this.Month = 'a';
    
    this.service.plantcode = ev;

    this.selectedPlant();

    if (this.myChart) this.myChart.destroy();
    this.ctx.clearRect(0, 0, this.canvas.weight, this.canvas.height);
    this.loadchart1();
  }
  getselectedyear() {
    this.year = this.yearname;
    
    if (this.myChart) this.myChart.destroy();
    this.ctx.clearRect(0, 0, this.canvas.weight, this.canvas.height);
    this.loadchart1();
  }
  getselectedmonth() {
    this.Month = 'a';
    if (this.myChart) this.myChart.destroy();
    this.ctx.clearRect(0, 0, this.canvas.weight, this.canvas.height);
    this.loadchart1();
  }
  monthclick() {
    this.Month = 'M';
    if (this.myChart) this.myChart.destroy();
    this.ctx.clearRect(0, 0, this.canvas.weight, this.canvas.height);
    this.loadchart1();
  }
  weekclick() {
    this.Month = 'W';
    if (this.myChart) this.myChart.destroy();
    this.ctx.clearRect(0, 0, this.canvas.weight, this.canvas.height);
    this.loadchart1();
  }
  dayclick() {
    this.Month = 'D';
    if (this.myChart) this.myChart.destroy();
    this.ctx.clearRect(0, 0, this.canvas.weight, this.canvas.height);
    this.loadchart1();
  }
  loadchart() {
    const typevalue = this.typename;
    Chart.defaults.global.legend.display = false;
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    if (typevalue === "PLATING") {


      this.myChart = new Chart(this.ctx, {
        type: 'bar',
        data: {
          labels: this.daylist,
          datasets: [
            {
              label: 'Total Inspection',
              type: 'bar',
              backgroundColor: '#73b4fa',
              data: this.inspectionvalue
            },
            {
              label: 'Ok Value',
              type: 'bar',
              backgroundColor: '#11f2a3',
              data: this.Okvalue
            },
            {
              label: 'Reject Value',
              type: 'bar',
              backgroundColor: '#fe909d',
              data: this.rejectvalue
            },
            {
              label: 'Reject %',
              type: 'line',
              // backgroundColor: '#FFFFFF',
              data: this.Rejectper
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
            intersect: true
          },
          annotation: {
            annotations: [{
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: 15,
              endValue: 15,
              borderColor: '#01a9ac',
              borderWidth: 4,
              label: {
                enabled: true,
                content: 'Trendline 15%',
                yAdjust: -16,
              }
            }]
          },
          maintainAspectRatio: false,
          hover: {
            mode: 'label'
          },
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'In Lakhs'
              }
            }]
          },
          animation: {
            duration: 1,
            onComplete: function () {
              const chartInstance = this.chart;
              this.ctx = chartInstance.ctx;
              this.font = Chart.helpers.fontString
                (Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
              this.textAlign = 'center';
              this.textBaseline = 'bottom';
              // tslint:disable-next-line:only-arrow-functions
              this.data.datasets.forEach(function (dataset, i) {
                if (dataset.type === 'line') {
                  const meta = chartInstance.controller.getDatasetMeta(i);
                  // tslint:disable-next-line:only-arrow-functions
                  meta.data.forEach(function (bar, index) {
                    const data = dataset.data[index];
                    if (data !== '0.00') {
                      chartInstance.ctx.fillStyle = '#dc3545';
                      chartInstance.ctx.font = 'italic bold 8pt verdana';
                      chartInstance.ctx.fillText(data + ' %', bar._model.x, bar._model.y - 5);
                    }

                  });
                }
              });
            }
          }
        }
      });
    }
    else {
      this.myChart = new Chart(this.ctx, {
        type: 'bar',
        data: {
          labels: this.daylist,
          datasets: [
            {
              label: 'Total Inspection',
              type: 'bar',
              backgroundColor: '#73b4fa',
              data: this.inspectionvalue
            },
            {
              label: 'Ok Value',
              type: 'bar',
              backgroundColor: '#11f2a3',
              data: this.Okvalue
            },
            {
              label: 'Reject Value',
              type: 'bar',
              backgroundColor: '#fe909d',
              data: this.rejectvalue
            },
            {
              label: 'Reject %',
              type: 'line',
              // backgroundColor: '#FFFFFF',
              data: this.Rejectper
            },

          ]
        },
        options: {
          scaleBeginAtZero: true,
          scaleShowGridLines: true,
          // tslint:disable-next-line:quotemark
          scaleGridLineColor: "red",
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
            intersect: true
          },
          annotation: {
            annotations: [{
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: 3,
              endValue: 3,
              borderColor: 'rgb(75, 192, 192)',
              borderWidth: 4,
              label: {
                enabled: true,
                content: 'Trendline 3%',
                yAdjust: -16,
              }
            }]
          },
          maintainAspectRatio: false,
          hover: {
            mode: 'label'
          },
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'In Lakhs'
              }
            }]
          },
          animation: {
            duration: 1,
            onComplete: function () {
              const chartInstance = this.chart;
              this.ctx = chartInstance.ctx;
              this.font = Chart.helpers.fontString
                (Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
              this.textAlign = 'center';
              this.textBaseline = 'bottom';
              // tslint:disable-next-line:only-arrow-functions
              this.data.datasets.forEach(function (dataset, i) {
                if (dataset.type === 'line') {
                  const meta = chartInstance.controller.getDatasetMeta(i);
                  // tslint:disable-next-line:only-arrow-functions
                  meta.data.forEach(function (bar, index) {
                    const data = dataset.data[index];
                    if (data !== '0.00') {
                      chartInstance.ctx.fillStyle = '#dc3545';
                      chartInstance.ctx.font = 'italic bold 8pt verdana';
                      chartInstance.ctx.fillText(data + ' %', bar._model.x, bar._model.y - 5);
                    }

                  });
                }
              });
            }
          }
        }
      });
    }
  }
  loadchart1() {
    this.daylist = [];
    this.inspectionvalue = [];
    this.Okvalue = [];
    this.rejectvalue = [];
    this.Rejectper = [];
    this.loading = true;
    if (this.Month === 'M') {
      this.Month = 'M';
      this.monthname = this.monthNames[this.d.getMonth()];
    }
    else if (this.Month === 'W') {
      this.Month = 'W';
      this.monthname = this.monthNames[this.d.getMonth()];
    }
    else if (this.Month === 'D') {
      this.Month = 'D';
      this.monthname = this.monthNames[this.d.getMonth()];
    }
    else {
      this.Month = 'a';
      // this.monthname = this.monthNames[this.d.getMonth()];
    }
    this.service.New_getprochartsummary(this.service.plantcode, "ZCRM", this.monthname,"A");
    this.service.getprochart(this.service.plantcode, this.Month, this.monthname, this.year)
      .toPromise()
      .then(res => {
        this.selectedchart = res as DailyReportDisplay[];
        for (const xx of this.selectedchart) {
          if (xx.itemtype === this.typename) {
            this.daylist.push(xx.inspectiondate.replace('T00:00:00', ''));
            this.inspectionvalue.push(xx.inspectionvalue);
            this.Okvalue.push(xx.okvalue);
            this.rejectvalue.push(xx.rejectvalue);
            this.Rejectper.push(xx.rejper);
          }
        }
        this.loadchart();
        this.loading = false;
      });
  }
  selectedPlant() {
    const me = this;
    if (this.plantservice && this.plantservice.plantlist && this.service.plantcode) {
      this.plantservice.plantlist.forEach(function (element, i) {
        if (element.plantcode == me.service.plantcode) {
          me.service.plantshortname = element.plantshortname;
        }
      });
    }
  }
}

