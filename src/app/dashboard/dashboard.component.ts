import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { DailyproductionService } from '../shared/dailyProduction/dailyproduction.service';
import { DailyReportDisplay } from '../shared/dailyProduction/dailyreportdisplay.model';
import { DailyReportSummary } from '../shared/dailyProduction/dailyreportsummary.model';
import { User } from '../shared/login/User.model';
import { PlantService } from '../shared/plant/plant.service';
import { LoginService } from '../shared/login/login.service';
import { Top5Rejection } from '../shared/dailyProduction/top5rejection.model';
import { DailyReportDisplayChrome } from '../shared/dailyProduction/dailyreportdisplaychrome.model';
import { TopDefectsummary } from '../shared/dailyProduction/TopDefectssummary.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = 'Chart';
  public myChart: Chart;
  canvas: any;
  ctx: any;

  public myChartcrm: Chart;
  canvascrm: any;
  ctxcrm: any;

  public myChartdef: Chart;
  canvasdef: any;
  ctxdef: any;

  public selectedchart: Top5Rejection[] = [];
  public selectedcharttot: Top5Rejection[] = [];
  public selectedchrome: DailyReportDisplayChrome[] = [];
  public selecteddefectsummary: TopDefectsummary[] = [];
  
  public itemlist: string[] = [];
  public inspectionvalue: number[] = [];
  public rejectvalue: number[] = [];
  public rejectper: number[] = [];


  public defectlist: string[] = [];
  public rejectvaluedefect: number[] = [];

  public daylistch: string[] = [];
  public inspectionvaluech: number[] = [];
  public inspectiontotalch: number;
  public Okvaluech: number[] = [];
  public rejectvaluech: number[] = [];
  public Rejectperch: number[] = [];


  public Month: string;
  public Week: string;
  public Day: string;

  public selectedPlant: string;
  public monthname: string;
  public typename: string;

  public cv: number;
  public loading = false;
  public monthNames: any;
  public d: any;
  currentUser: User;

  constructor(public service: DailyproductionService, public plantservice: PlantService, public lservice: LoginService) {
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));

  }

  ngOnInit() {
    this.plantservice.getPlantData(this.currentUser.id);
    this.service.plantcode = '1010';
    this.loading = true;
    this.itemlist = [];
    this.cv = 0;
    this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
  'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
  ];
    this.d = new Date();
    this.monthname = this.monthNames[this.d.getMonth()];
    this.typename = 'CHROME';
    this.loadchart1();
    this.loadchartcrm();
    this.loadchartdefect();
  }

  getselectedtype(ev) {
    this.Month = 'a';
    this.typename = ev;
      if (this.myChart) this.myChart.destroy();
    this.ctx.clearRect(0 , 0, this.canvas.weight, this.canvas.height);
    this.loadchart1();
    this.loadchartcrm();
    this.loadchartdefect();
  }
  selectedGrid(ev) {
    this.Month = 'a';
    this.service.plantcode = ev;
    if (this.myChart) this.myChart.destroy();
    this.ctx.clearRect(0 , 0, this.canvas.weight, this.canvas.height);
    this.loadchart1();
    this.loadchartcrm();
    this.loadchartdefect();
  }
  getselectedmonth() {
    this.Month = 'a';
    if (this.myChart) this.myChart.destroy();
    this.ctx.clearRect(0 , 0, this.canvas.weight, this.canvas.height);
    this.loadchart1();
    this.loadchartcrm();
    this.loadchartdefect();
  }
  monthclick() {
    this.Month = 'M';
    if (this.myChart) this.myChart.destroy();
    this.ctx.clearRect(0 , 0, this.canvas.weight, this.canvas.height);
    this.loadchart1();
    this.loadchartcrm();
    this.loadchartdefect();
  }
  weekclick() {
    this.Month = 'W';
    if (this.myChart) this.myChart.destroy();
    this.ctx.clearRect(0 , 0, this.canvas.weight, this.canvas.height);
    this.loadchart1();
    this.loadchartcrm();
    this.loadchartdefect();
  }
  dayclick() {
    this.Month = 'D';
    if (this.myChart) this.myChart.destroy();
    this.ctx.clearRect(0 , 0, this.canvas.weight, this.canvas.height);
    this.loadchart1();
    this.loadchartcrm();
    this.loadchartdefect();
  }
  loadchart() {
    // if (this.canvas) this.ctx.destroy(); //destroy prev chart instance
    // Chart.defaults.global.legend.display = false;
     this.canvas = document.getElementById('myChart');
     this.ctx = this.canvas.getContext('2d');
     this.myChart = new Chart(this.ctx, {
   type: 'bar',
   data: {
     labels: this.itemlist,
     datasets: [
       {
         label: 'Produce Value',
         type: 'bar',
         backgroundColor: '#5cb85c',
         data: this.inspectionvalue
       },
       {
        label: 'Rejection Value',
        type: 'bar',
        backgroundColor: '#d9534f',
        data: this.rejectvalue
      },
      {
        label: 'Reject %',
        type: 'line',
       // backgroundColor: '#FFFFFF',
        data: this.rejectper
      }
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
        this.data.datasets.forEach(function(dataset, i) {
          if (dataset.type === 'line') {
            const meta = chartInstance.controller.getDatasetMeta(i);
            // tslint:disable-next-line:only-arrow-functions
            meta.data.forEach(function(bar, index) {
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
   loadchart1() {
    this.itemlist = [];
    this.inspectionvalue = [];
    this.rejectvalue = [];
    this.rejectper = [];
    this.loading = true;
    if (this.Month === 'M')
    {
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
    this.service.gettop5rejection(this.service.plantcode, this.Month, this.monthname)
    .toPromise()
    .then(res => {
      this.selectedchart = res as Top5Rejection[];
      for (const xx of this.selectedchart) {
       
          this.itemlist.push(xx.itemname);
          this.inspectionvalue.push(xx.producevalue);
          this.rejectvalue.push(xx.rejectvalue);
          this.rejectper.push(xx.rejectper);
      }
      this.loadchart();
      this.loading = false;
    });
  }

  setchartchrome() {
    // if (this.canvas) this.ctx.destroy(); //destroy prev chart instance
     Chart.defaults.global.legend.display = false;
     this.canvascrm = document.getElementById('myChartcrm');
     this.ctxcrm = this.canvascrm.getContext('2d');
     this.myChartcrm = new Chart(this.ctxcrm, {
   type: 'bar',
   data: {
     labels: this.daylistch,
     datasets: [
       {
         label: 'Total Inspection',
         type: 'bar',
         backgroundColor: '#0275d8',
         data: this.inspectionvaluech
       },
       {
         label: 'Ok Value',
         type: 'bar',
         backgroundColor: '#5cb85c',
         data: this.Okvaluech
       },
       {
         label: 'Reject Value',
         type: 'bar',
         backgroundColor: '#d9534f',
         data: this.rejectvaluech
       },
       {
         label: 'Reject %',
         type: 'line',
        // backgroundColor: '#FFFFFF',
         data: this.Rejectperch
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
         borderColor: 'rgb(75, 192, 192)',
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
   }
 });
   }
   loadchartcrm() {
    this.daylistch = [];
    this.inspectionvaluech = [];
    this.Okvaluech = [];
    this.rejectvaluech = [];
    this.Rejectperch = [];
    this.loading = true;
    if (this.Month === 'M')
    {
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
    // this.service.getprochartsummary(this.service.plantcode, this.Month, this.monthname);
    if (this.typename === 'CHROME')
    {
      if (this.myChartcrm) this.myChartcrm.destroy();
      this.daylistch = [];
      this.inspectionvaluech = [];
      this.Okvaluech = [];
      this.rejectvaluech = [];
      this.Rejectperch = [];
      this.service.getprochartchrome(this.service.plantcode, this.Month, this.monthname)
      .toPromise()
      .then(res => {
        this.selectedchrome = res as DailyReportDisplayChrome[];
        for (const xx of this.selectedchrome) {
            this.daylistch.push(xx.inspectiondate.replace('T00:00:00', ''));
            this.inspectionvaluech.push(xx.inspectionvalue);
            this.Okvaluech.push(xx.okvalue);
            this.rejectvaluech.push(xx.rejectvalue);
            this.Rejectperch.push(xx.rejper);
        }
        this.setchartchrome();
        this.loading = false;
      });
    }
    else
    {
      if (this.myChartcrm) this.myChartcrm.destroy();
      this.daylistch = [];
      this.inspectionvaluech = [];
      this.Okvaluech = [];
      this.rejectvaluech = [];
      this.Rejectperch = [];
  
      this.service.getprochartsatin(this.service.plantcode, this.Month, this.monthname)
      .toPromise()
      .then(res => {
        this.selectedchrome = res as DailyReportDisplayChrome[];
        for (const xx of this.selectedchrome) {
            this.daylistch.push(xx.inspectiondate.replace('T00:00:00', ''));
            this.inspectionvaluech.push(xx.inspectionvalue);
            this.Okvaluech.push(xx.okvalue);
            this.rejectvaluech.push(xx.rejectvalue);
            this.Rejectperch.push(xx.rejper);
        }
        this.setchartchrome();
        this.loading = false;
      });
    }
   
  }

  setchartdefect() {
    // if (this.canvas) this.ctx.destroy(); //destroy prev chart instance
     Chart.defaults.global.legend.display = false;
     this.canvasdef = document.getElementById('myChartdefect');
     this.ctxdef = this.canvasdef.getContext('2d');
     this.myChartdef = new Chart(this.ctxdef, {
   type: 'bar',
   data: {
     labels: this.defectlist,
     datasets: [
       {
         label: 'Total Rejection',
         type: 'bar',
         backgroundColor: '#d9534f',
         data: this.rejectvaluedefect
       }
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
   }
 });
   }

   loadchartdefect() {
    this.defectlist = [];
    this.rejectvaluedefect = [];
    this.loading = true;
    if (this.Month === 'M')
    {
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
    // this.service.getprochartsummary(this.service.plantcode, this.Month, this.monthname);
    if (this.typename === 'CHROME')
    {
      if (this.myChartdef) this.myChartdef.destroy();
      this.defectlist = [];
      this.rejectvaluedefect = [];
      this.service.getprochartdefect(this.service.plantcode, 'ZCRM', this.monthname)
      .toPromise()
      .then(res => {
        this.selecteddefectsummary = res as TopDefectsummary[];
        for (const xx of this.selecteddefectsummary) {
            this.defectlist.push(xx.defect);
            this.rejectvaluedefect.push(xx.rejvalue);
        }
        this.setchartdefect();
        this.loading = false;
      });
    }
    else
    {
      if (this.myChartdef) this.myChartdef.destroy();
      this.defectlist = [];
      this.rejectvaluedefect = [];
      this.service.getprochartdefect(this.service.plantcode, 'ZSAT', this.monthname)
      .toPromise()
      .then(res => {
        this.selecteddefectsummary = res as TopDefectsummary[];
        for (const xx of this.selecteddefectsummary) {
            this.defectlist.push(xx.defect);
            this.rejectvaluedefect.push(xx.rejvalue);
        }
        this.setchartdefect();
        this.loading = false;
      });
    }
   
  }
}
