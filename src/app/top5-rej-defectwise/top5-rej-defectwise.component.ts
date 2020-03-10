import { Component, OnInit } from '@angular/core';
import { DailyproductionService } from '../shared/dailyProduction/dailyproduction.service';
import { PlantService } from '../shared/plant/plant.service';
import { LoginService } from '../shared/login/login.service';
import * as Chart from 'chart.js';
import { User } from '../shared/login/User.model';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import { DailyReportDisplay } from '../shared/dailyProduction/dailyreportdisplay.model';
import { Top5rejectiondefectwise } from '../shared/dailyProduction/top5rejectiondefectwise.model';

@Component({
  selector: 'app-top5-rej-defectwise',
  templateUrl: './top5-rej-defectwise.component.html',
  styleUrls: ['./top5-rej-defectwise.component.css']
})
export class Top5RejDefectwiseComponent implements OnInit {
  title = 'Chart';
  public myChart: Chart;
  canvas: any;
  ctx: any;

  public itemlist: string[] = [];
  public pitting: number[] = [];
  public PINHOLE: number[] = [];
  public PATCHMARK: number[] = [];
  public NICKLE: number[] = [];
  public CRBURNING: number[] = [];
  public SKIPPLATING: number[] = [];
  public DENT: number[] = [];
  public HANDMOULDINGREJ: number[] = [];
  public SCRATCHMARK: number[] = [];
  public ROUGHNESS: number[] = [];
  public SILVER: number[] = [];
  public MOULDINGREJ: number[] = [];
  public WARPAGE: number[] = [];
  public COPPERBURNING: number[] = [];
  public WHITEMARK: number[] = [];
  public DOTPLASTIC: number[] = [];
  public WATERMARK: number[] = [];
  public BLISTER: number[] = [];
  public JIGDAMAGE: number[] = [];
  public OTHER1: number[] = [];
  public OTHER2: number[] = [];
  public OTHER3: number[] = [];
  public OTHER4: number[] = [];
  public rejectqty: number[] = [];
  public rejectper: number[] = [];
  public rejectvalue: number[] = [];
  public producevalue: number[] = [];

  public selectedchartDef: Top5rejectiondefectwise[] = [];

  public monthname: string;
  public typename: string;

  public cv: number;
  public Month: string;
  public Week: string;
  public Day: string;

  public loading = false;
  public monthNames: any;
  public d: any;
  currentUser: User;

  constructor(
    public service: DailyproductionService,
    public plantservice: PlantService,
    public lservice: LoginService
  ) {
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
    this.itemlist = [];
    this.cv = 0;
    this.monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec'
    ];
    this.d = new Date();
    this.monthname = this.monthNames[this.d.getMonth()];
    this.typename = 'ZCRM';
    this.loadchart1();
  }

  loadchart1() {
    this.itemlist = [];
    this.pitting = [];
    this.PINHOLE = [];
    this.PATCHMARK = [];
    this.NICKLE = [];
    this.CRBURNING = [];
    this.SKIPPLATING = [];
    this.DENT = [];
    this.HANDMOULDINGREJ = [];
    this.SCRATCHMARK = [];
    this.ROUGHNESS = [];
    this.SILVER = [];
    this.MOULDINGREJ = [];
    this.WARPAGE = [];
    this.COPPERBURNING = [];
    this.WHITEMARK = [];
    this.DOTPLASTIC = [];
    this.WATERMARK = [];
    this.BLISTER = [];
    this.JIGDAMAGE = [];
    this.OTHER1 = [];
    this.OTHER2 = [];
    this.OTHER3 = [];
    this.OTHER4 = [];
    this.rejectqty = [];
    this.rejectper = [];
    this.rejectvalue = [];
    this.producevalue = [];
    this.loading = true;
    if (this.Month === 'M') {
      this.Month = 'M';
      this.monthname = this.monthNames[this.d.getMonth()];
    } else if (this.Month === 'W') {
      this.Month = 'W';
      this.monthname = this.monthNames[this.d.getMonth()];
    } else if (this.Month === 'D') {
      this.Month = 'D';
      this.monthname = this.monthNames[this.d.getMonth()];
    } else {
      this.Month = 'a';
      // this.monthname = this.monthNames[this.d.getMonth()];
    }

    this.service
      .gettop5rejectiondefectwise(
        this.service.plantcode,
        this.typename,
        this.monthname
      )
      .toPromise()
      .then(res => {
        this.selectedchartDef = res as Top5rejectiondefectwise[];
        for (const xx of this.selectedchartDef) {
          this.itemlist.push(xx.itemname);

          this.pitting.push(xx.pitting);

          this.PINHOLE.push(xx.pinhole);

          this.PATCHMARK.push(xx.patchmark);
          this.NICKLE.push(xx.nickle);

          this.CRBURNING.push(xx.crburning);

          this.SKIPPLATING.push(xx.skipplating);

          this.DENT.push(xx.dent);

          this.HANDMOULDINGREJ.push(xx.handmouldingrej);

          this.SCRATCHMARK.push(xx.scratchmark);

          this.ROUGHNESS.push(xx.roughness);

          this.SILVER.push(xx.silver);

          this.MOULDINGREJ.push(xx.mouldingrej);

          this.WARPAGE.push(xx.warpage);

          this.COPPERBURNING.push(xx.copperburning);

          this.WHITEMARK.push(xx.whitemark);

          this.DOTPLASTIC.push(xx.dotplastic);

          this.WATERMARK.push(xx.watermark);

          this.BLISTER.push(xx.blister);

          this.JIGDAMAGE.push(xx.jigdamage);

          this.OTHER1.push(xx.otheR1);

          this.OTHER2.push(xx.otheR2);

          this.OTHER3.push(xx.otheR3);

          this.OTHER4.push(xx.otheR4);

          this.rejectqty.push(xx.rejectqty);

          this.rejectper.push(xx.rejectper);

          this.rejectvalue.push(xx.rejectvalue);

          this.producevalue.push(xx.producevalue);
        }
        this.loadchart();
        this.loading = false;
      });
  }
  loadchart() {
    const typevalue = this.typename;
    Chart.defaults.global.legend.display = false;
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    this.myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: this.itemlist,
        datasets: [
          {
            label: 'PITTING',
            type: 'bar',
            backgroundColor: '#0275d8',
            data: this.pitting
          },
          {
            label: 'PINHOLE',
            type: 'bar',
            backgroundColor: '#5cb85c',
            data: this.PINHOLE
          },

          {
            label: 'PATCHMARK',
            type: 'bar',
            backgroundColor: '#5bc0de',
            data: this.PATCHMARK
          },
          {
            label: 'NICKLE',
            type: 'bar',
            backgroundColor: '#f0ad4e',
            data: this.NICKLE
          },
          {
            label: 'CRBURNING',
            type: 'bar',
            backgroundColor: '#d9534f',
            data: this.CRBURNING
          },
          {
            label: 'SKIPPLATING',
            type: 'bar',
            backgroundColor: '#292b2c',
            data: this.SKIPPLATING
          },
          {
            label: 'DENT',
            type: 'bar',
            backgroundColor: '#0d47a1',
            data: this.DENT
          },
          {
            label: 'HANDMOULDINGREJ',
            type: 'bar',
            backgroundColor: '#007E33',
            data: this.HANDMOULDINGREJ
          },
          {
            label: 'SCRATCHMARK',
            type: 'bar',
            backgroundColor: '#00C851',
            data: this.SCRATCHMARK
          },
          {
            label: 'ROUGHNESS',
            type: 'bar',
            backgroundColor: '#FF8800',
            data: this.ROUGHNESS
          },
          {
            label: 'SILVER',
            type: 'bar',
            backgroundColor: '#CC0000',
            data: this.SILVER
          },
          {
            label: 'MOULDINGREJ',
            type: 'bar',
            backgroundColor: '#a1887f',
            data: this.MOULDINGREJ
          },
          {
            label: 'WARPAGE',
            type: 'bar',
            backgroundColor: '#59698d',
            data: this.WARPAGE
          },
          {
            label: 'COPPERBURNING',
            type: 'bar',
            backgroundColor: '#01579b',
            data: this.COPPERBURNING
          },
          {
            label: 'WHITEMARK',
            type: 'bar',
            backgroundColor: '#1e88e5',
            data: this.WHITEMARK
          },
          {
            label: 'DOTPLASTIC',
            type: 'bar',
            backgroundColor: '#f50057',
            data: this.DOTPLASTIC
          },
          {
            label: 'WATERMARK',
            type: 'bar',
            backgroundColor: '#bf360c',
            data: this.WATERMARK
          },
          {
            label: 'BLISTER',
            type: 'bar',
            backgroundColor: '#6d4c41',
            data: this.BLISTER
          },
          {
            label: 'JIGDAMAGE',
            type: 'bar',
            backgroundColor: '#90a4ae',
            data: this.JIGDAMAGE
          },
          {
            label: 'OTHER1',
            type: 'bar',
            backgroundColor: '#4caf50',
            data: this.OTHER1
          },
          {
            label: 'OTHER2',
            type: 'bar',
            backgroundColor: '#009688',
            data: this.OTHER2
          },
          {
            label: 'OTHER3',
            type: 'bar',
            backgroundColor: '#3F729B',
            data: this.OTHER3
          },
          {
            label: 'OTHER4',
            type: 'bar',
            backgroundColor: '#ffbb33',
            data: this.OTHER4
          }
          // {
          //   label: "Reject Qty",
          //   type: "bar",
          //   backgroundColor: "#d9534f",
          //   data: this.rejectqty
          // },

          // {
          //   label: "Reject Value",
          //   type: "bar",
          //   backgroundColor: "#d9534f",
          //   data: this.rejectvalue
          // }
          // {
          //   label: "Produce Value",
          //   type: "bar",
          //   backgroundColor: "#d9534f",
          //   data: this.producevalue
          // },
          // {
          //   label: "Reject %",
          //   type: "line",
          //   // backgroundColor: "#d9534f",
          //   data: this.rejectper
          // }
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
        barValueSpacing: 10,
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
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: ''
                // maxTicksLimit: 5
              }
            }
          ]
        },
        animation: {
          duration: 1,
          onComplete: function() {
            const chartInstance = this.chart;
            this.ctx = chartInstance.ctx;
            this.font = Chart.helpers.fontString(
              Chart.defaults.global.defaultFontSize,
              Chart.defaults.global.defaultFontStyle,
              Chart.defaults.global.defaultFontFamily
            );
            this.textAlign = 'center';
            this.textBaseline = 'bottom';
            // tslint:disable-next-line:only-arrow-functions
            this.data.datasets.forEach(function(dataset, i) {
              if (dataset.type === 'line') {
                const meta = chartInstance.controller.getDatasetMeta(i);
                // tslint:disable-next-line:only-arrow-functions
                meta.data.forEach(function(bar, index) {
                  const data = dataset.data[index];
                  if (data !== '0.00') {
                    chartInstance.ctx.fillStyle = '#dc3545';
                    chartInstance.ctx.font = 'italic bold 8pt verdana';
                    chartInstance.ctx.fillText(
                      data + ' %',
                      bar._model.x,
                      bar._model.y - 5
                    );
                  }
                });
              }
            });
          }
        }
      }
    });
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

  selectedPlant() {
    const me = this;
    if (
      this.plantservice &&
      this.plantservice.plantlist &&
      this.service.plantcode
    ) {
      this.plantservice.plantlist.forEach(function(element, i) {
        if (element.plantcode == me.service.plantcode) {
          me.service.plantshortname = element.plantshortname;
        }
      });
    }
  }
}
