import { Component, OnInit } from "@angular/core";
import * as Chart from 'chart.js';
import { DailyproductionService } from '../shared/dailyProduction/dailyproduction.service';

import { HomeService } from '../shared/home/home.service';
import { Home } from '../shared/home/home.model';
import { DatePipe } from "@angular/common";
import { LoginService } from '../shared/login/login.service';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import { User } from '../shared/login/User.model';
import { PlantService } from '../shared/plant/plant.service';
import { Itemwiserej } from '../shared/dailyProduction/itemwiserej.model';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {
  public myChart: Chart;
  typename: any;
  plantcode: any;
  canvas: any;
  ctx: any;
  public daylist: string[] = [];
  public inspectionvalue: number[] = [];
  public inspectiontotal: number;
  public Okvalue: number[] = [];
  public rejectvalue: number[] = [];
  public Rejectper: number[] = [];
  public loading = false;
  yearlyData: any[];
  currentUser: User;
  public selectedchart: Home[] = [];
  startdate: any;
  enddate: any;
  monthNames: any;
  monthNames2: any;
  inspectionqtySum: number;
  inspectionvalueSum: number;
  okqtySum: number = 0;
  okvalueSum: number = 0;
  rejectqtySum: number= 0;
  rejectvalueSum: number= 0;
  rejperSum: number= 0;
  holdvalueSum: number = 0;
  holdQtySum: number = 0;
  buffingvalueSum: number = 0;
  buffingQtySum: number = 0;
  monthname: any;
  constructor(
    public service: HomeService, public lservice: LoginService, public plantservice: PlantService,
    public dpservice: DailyproductionService,

  ) {
    this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]; this.monthNames2 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
      'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    this.plantcode = '1010';
    this.typename = "PLATING";
    const date = new Date();

    this.monthname = this.monthNames[date.getMonth()];

    this.startdate = (new Date()).getFullYear() + "-01-01";
    this.enddate = (new Date()).getFullYear() + "-12-31";
  }

  ngOnInit() {
    const me = this;
    const namedChartAnnotation = ChartAnnotation;
    namedChartAnnotation['id'] = 'annotation';
    Chart.pluginService.register(namedChartAnnotation);
    this.plantservice.getPlantData(this.currentUser.id);

    this.loadchart1();

  }
  getselectedtype(ev) {
    this.typename = ev;
    if (this.myChart) this.myChart.destroy();
    this.ctx.clearRect(0, 0, this.canvas.weight, this.canvas.height);
    this.loadchart1();
  }

  selectedGrid(ev) {
    this.plantcode = ev;
    if (this.myChart) this.myChart.destroy();
    this.ctx.clearRect(0, 0, this.canvas.weight, this.canvas.height);
    this.loadchart1();
  }
  loadchart1() {
    let me = this;
    this.daylist = [];
    this.inspectionvalue = [];
    this.Okvalue = [];
    this.rejectvalue = [];
    this.Rejectper = [];
    this.loading = true;
    // this.loadchart();


    const month = new Date().getMonth();
    const monthName = this.monthNames2[month];

    this.dpservice.getprochartsummary(this.plantcode, 'M', monthName);

    this.service.getData(this.plantcode, this.startdate, this.enddate)
      .toPromise()
      .then(res => {
        me.selectedchart = res as Home[];
        me.sumAllData();

        for (const xx of me.selectedchart) {

          me.daylist.push(xx.mname);
          me.inspectionvalue.push(xx.inspectionvalue);
          me.Okvalue.push(xx.okvalue);
          me.rejectvalue.push(xx.rejectvalue);
          me.Rejectper.push(xx.rejper);
        }
        me.loadchart();
        me.loading = false;
      });
  }
  loadchart() {
    const typevalue = this.typename;
    Chart.defaults.global.legend.display = false;
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');



    var purple_orange_gradient = this.ctx.createLinearGradient(0, 0, 0, 600);
    purple_orange_gradient.addColorStop(0, '#75b1f1');
    purple_orange_gradient.addColorStop(1, '#84d3d4');

    this.myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: this.daylist,
        datasets: [
          {
            label: 'Total Inspection',
            type: 'bar',
            backgroundColor: '#73b4fa', //'#b8edf0',
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


  sumAllData() {

    this.inspectionqtySum = 0;
    this.inspectionvalueSum = 0;
    this.okqtySum = 0;
    this.okvalueSum = 0;
    this.rejectqtySum = 0;
    this.rejectvalueSum = 0;
    this.rejperSum = 0;
    this.holdvalueSum = 0;
    this.holdQtySum = 0;
    this.buffingvalueSum = 0;
    this.buffingQtySum = 0;
    console.log(this.buffingvalueSum);

    for (const rq of this.dpservice.dailyreportsummary) {
      console.log(rq);
      this.rejectvalueSum += rq.rejectvalue;
      this.rejectqtySum += rq.rejectqty;

      this.inspectionvalueSum += rq.producevalue;
      this.inspectionqtySum += rq.inspection_qty;

      this.holdvalueSum = this.holdvalueSum + rq.holdvalue;

      this.holdQtySum += rq.holdqty;

      this.buffingvalueSum = this.buffingvalueSum + rq.buffingvalue;
      this.buffingQtySum += rq.buffingqty;

      this.okvalueSum += rq.okvalue;
      this.okqtySum += rq.okqty;

      this.rejperSum += rq.rejper;
    }
    // this.rejperPerSum2 = (this.rejperPerSum / this.dpservice.itemwiserejlist.length)
  }
}
