import { Component, OnInit } from '@angular/core';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import * as Chart from 'chart.js';
import { QualityService } from '../shared/quality/quality.service';
import { PlantService } from '../shared/plant/plant.service';
import { Plant } from '../shared/plant/plant.model';
import { LoginService } from '../shared/login/login.service';

@Component({
  selector: 'app-defectwisereport',
  templateUrl: './defectwisereport.component.html',
  styleUrls: ['./defectwisereport.component.css']
})
export class DefectwisereportComponent implements OnInit {

  public selectedtype: string;
  public currentUser: any;

  public myChart: Chart;
  canvas: any;
  ctx: any;
  rowData: any;

  public loading = false;
  public monthname: any;
  public Yearname: any;
  public plantcode: any;
  public d: any;

  public rejvalue: number[] = [];
  public rejqty: number[] = [];
  public name: number[] = [];

  constructor(
    public service: QualityService,
    public plantservice: PlantService,
    public lservice: LoginService) {
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

    this.selectedtype = "ZCRM"

    const namedChartAnnotation = ChartAnnotation;
    namedChartAnnotation['id'] = 'annotation';
    Chart.pluginService.register(namedChartAnnotation);
    this.loading = true;

    this.d = new Date();
    let cyear: any = new Date().toLocaleDateString('en', { year: '2-digit' });
    let cmonth = this.d.getMonth();
    this.monthname = this.d.toLocaleDateString('default', { month: 'long' });
    if (cmonth < 3) {
      this.Yearname = (cyear - 1) + '-' + cyear;
    } else {
      this.Yearname = cyear + '-' + (cyear + 1);
    }

    this.getChartData();
  }

  async getChartData() {
    this.rejvalue = [];
    this.name = [];
    this.rejqty = [];
    await this.service.getDefectWiseReport(this.plantcode, this.selectedtype, this.Yearname).
      toPromise().then(res => {
        this.rowData = res;
        let array = this.rowData.filter(x => x.monthName == this.monthname);
        array.forEach(e => {
          this.name.push(e.name);
          this.rejqty.push(e.rejqty);
          this.rejvalue.push(e.rejvalue);
        });
      });
    this.loadchart();
  }

  loadchart() {
    this.loading = false;
    Chart.defaults.global.legend.display = false;
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let rejqty = this.rejqty;
    this.myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: this.name,
        datasets: [
          {
            label: 'Rejection Value',
            type: 'bar',
            backgroundColor: '#73b4fa',
            data: this.rejvalue,
            barPercentage: 0.5
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
              var multistringText = ["Value : " + tooltipItems.yLabel];
              multistringText.push("Quantity : " + rejqty[tooltipItems.index]);
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
              scaleLabel: {
                display: true,
                labelString: 'Value In Lakhs'
              }
            },
          ]
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
          }
        }
      }
    });
    this.myChart.update();
  }

  getselectedyear() {
    this.loading = true;
    if (this.myChart) this.myChart.destroy();
    this.ctx.clearRect(0, 0, this.canvas.weight, this.canvas.height);
    this.getChartData();
  }

  getselectedmonth() {
    this.loading = true;
    this.rejvalue = [];
    this.name = [];
    this.rejqty = [];
    if (this.myChart) this.myChart.destroy();
    this.ctx.clearRect(0, 0, this.canvas.weight, this.canvas.height);
    let array = this.rowData.filter(x => x.monthName == this.monthname);
    array.forEach(e => {
      this.name.push(e.name);
      this.rejqty.push(e.rejqty);
      this.rejvalue.push(e.rejvalue);
    });
    this.loadchart();
  }

  selectedGrid(plantcode) {
    this.loading = true;
    this.plantcode = plantcode;
    if (this.myChart) this.myChart.destroy();
    this.ctx.clearRect(0, 0, this.canvas.weight, this.canvas.height);
    this.getChartData();
  }

  onselecttype(prodtype) {
    this.loading = true;
    this.selectedtype = prodtype;
    if (this.myChart) this.myChart.destroy();
    this.ctx.clearRect(0, 0, this.canvas.weight, this.canvas.height);
    this.getChartData();
  }

}

