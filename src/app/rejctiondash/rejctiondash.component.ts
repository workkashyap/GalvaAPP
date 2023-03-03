import { Component, OnInit } from '@angular/core';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import * as Chart from 'chart.js';
import { Top5rejectionService } from '../shared/dailyProduction/top5rejection.service';

@Component({
  selector: 'app-rejctiondash',
  templateUrl: './rejctiondash.component.html',
  styleUrls: ['./rejctiondash.component.css']
})
export class RejctiondashComponent implements OnInit {

  public myChart: Chart;
  canvas: any;
  ctx: any;
  rowData: any;

  public loading = false;
  public monthname: any;
  public Yearname: any;
  public plantname: any;
  public d: any;

  public inspectionvalue: number[] = [];
  public Okvalue: number[] = [];
  public rejectvalue: number[] = [];
  public Rejectper: number[] = [];
  public items: string[] = [];

  constructor(private service: Top5rejectionService) { }

  async ngOnInit() {
    const namedChartAnnotation = ChartAnnotation;
    namedChartAnnotation['id'] = 'annotation';
    Chart.pluginService.register(namedChartAnnotation);
    this.loading = true;

    this.plantname = "GDPL Zaroli";
    this.d = new Date();
    let cyear: any = new Date().toLocaleDateString('en', { year: '2-digit' });
    let cmonth = this.d.getMonth();
    this.monthname = this.d.toLocaleDateString('default', { month: 'long' });
    if (cmonth < 3) {
      this.Yearname = (cyear - 1) + '-' + cyear;
    } else {
      this.Yearname = cyear + '-' + (cyear + 1);
    }
    await this.service.getTop5Rejection(this.Yearname).toPromise().then(res => { this.rowData = res });
    this.filterData();
  }

  filterData() {
    let filter = { monthname: this.monthname, plantname: this.plantname };
    let data = this.rowData.filter(function (item) {
      for (var key in filter) {
        if (item[key] === undefined || item[key] != filter[key])
          return false;
      }
      return true;
    });
    this.items = [];
    this.inspectionvalue = [];
    this.Okvalue = [];
    this.rejectvalue = [];
    this.Rejectper = [];

    data.forEach(element => {
      this.items.push(element.itemname);
      this.inspectionvalue.push(element.inspValue);
      this.Okvalue.push(element.okvalue);
      this.rejectvalue.push(element.rejvalue);
      this.Rejectper.push(element.rejper);
    });
    this.loadchart();
  }


  loadchart() {
    this.loading = false;
    // this.ctx.clearRect(0, 0, this.canvas.weight, this.canvas.height);
    // this.ctx.restore();
    Chart.defaults.global.legend.display = false;
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');

    this.myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: this.items,
        datasets: [
          {
            label: 'Total Inspection Value',
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
          // {
          //   label: 'Reject %',
          //   type: 'line',
          //   data: this.Rejectper
          // },
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

  async getselectedyear() {
    await this.service.getTop5Rejection(this.Yearname).toPromise().then(res => { this.rowData = res });
    if (this.myChart) this.myChart.destroy();
    this.ctx.clearRect(0, 0, this.canvas.weight, this.canvas.height);
    this.filterData();
  }

  getselectedmonth() {
    if (this.myChart) this.myChart.destroy();
    this.ctx.clearRect(0, 0, this.canvas.weight, this.canvas.height);
    this.filterData();
  }

  selectedplant() {
    if (this.myChart) this.myChart.destroy();
    this.ctx.clearRect(0, 0, this.canvas.weight, this.canvas.height);
    this.filterData();
  }

  monthclick() {
    if (this.myChart) this.myChart.destroy();
    this.ctx.clearRect(0, 0, this.canvas.weight, this.canvas.height);
    this.monthname = this.d.toLocaleDateString('default', { month: 'long' });
    this.filterData();
  }

}
