import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DatePipe } from '@angular/common';

import { HrcalendarService } from '../../shared/hr/hrcalendar.service';
import { LoginService } from '../../shared/login/login.service';
import { Hrcalendar } from '../../shared/hr/hrcalendar.model';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { User } from 'src/app/shared/login/User.model';
import { PlantService } from 'src/app/shared/plant/plant.service';
import { Plant } from 'src/app/shared/plant/plant.model';


@Component({
  selector: 'app-hrcalendar',
  templateUrl: './hrcalendar.component.html',
  styleUrls: ['./hrcalendar.component.css'],
  providers: [DatePipe]

})
export class HrcalendarComponent implements OnInit {
  month: any;
  monthName: any;
  public monthNames: any;
  public date: any;

  public cDate: string;
  public sDate: Date;
  public lDate: Date;
  public startdate: string;
  public company_name: string;
  public loading = false;
  public loading2 = false;
  i: number = 0;
  calendarPlugins = [dayGridPlugin];
  @ViewChild('calendar', { static: false })
  calendarComponent: FullCalendarComponent;
  calendarApi: any;
  options: any;
  colors: any = [];
  cols: any;
  companies: any = [];
  public selected_eventdate: any;
  totalhours: number = 0;


  public currentUser: User;

  public selectedcode: string = "All";
  public selected_plantname: string;

  constructor(
    private lservice: LoginService,
    public plantservice: PlantService,
    public datePipe: DatePipe,
    public hrcalendarService: HrcalendarService
  ) {
    this.monthNames = ['--', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
      'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];
    this.lservice.currentUser.subscribe(x => this.currentUser = x);

    this.colors = ['bg-success', 'bg-warning', 'bg-primary', 'bg-info', 'bg-orange', 'bg-dark',]
  }
  ngOnInit() {
    const me = this;
    /*
    this.date = new Date();
    this.month = this.date.getMonth() + 1;
    console.log("this.month : ", this.month);*/
    this.monthName = this.monthNames[this.month];

    this.startdate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    var date = new Date();

    this.month = date.getMonth() + 1;

    this.sDate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.lDate = new Date(me.sDate.getFullYear(), me.sDate.getMonth() + 1, 0);

    this.options = {
      editable: true,
      aspectRatio: 3.5,
      header: {
        left: '',
        center: 'title',
        right: ''
        //'dayGridMonth,dayGridWeek',

      },
      contentHeight: '500px',

      plugins: [dayGridPlugin],
    };

    this.plantservice
      .sgetPlantData(me.currentUser.id)
      .toPromise()
      .then(res => {
        me.plantservice.splantlist = res as Plant[];
        me.getData();
        me.topData();
      });

  }

  Next() {
    this.calendarApi = this.calendarComponent.getApi();
    this.calendarApi.next();
    this.sDate = this.calendarApi.getDate();
    this.startdate = this.datePipe.transform(this.sDate, 'yyyy-MM-dd');
    this.lDate = new Date(this.sDate.getFullYear(), this.sDate.getMonth() + 1, 0);

    this.month = this.lDate.getMonth() + 1;
    this.monthName = this.monthNames[this.month];
    this.getData();
    this.topData();
  }
  Previous() {
    this.calendarApi = this.calendarComponent.getApi();
    this.calendarApi.prev();
    this.sDate = this.calendarApi.getDate();
    this.startdate = this.datePipe.transform(this.sDate, 'yyyy-MM-dd');
    this.lDate = new Date(this.sDate.getFullYear(), this.sDate.getMonth() + 1, 0);
    this.month = this.lDate.getMonth() + 1;
    this.monthName = this.monthNames[this.month];
    this.getData();
    this.topData();
  }

  getData() {
    this.loading = true;
    this.hrcalendarService.hrcalendarlist = [];
    this.hrcalendarService.getallHRcal(this.month, this.selectedcode).toPromise().then((res: any) => {
      this.hrcalendarService.hrcalendarlist = res as Hrcalendar[];
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }
  topData() {
    this.loading = true;
    const me = this;
    //all manpower
    me.companies = [];
    me.i = 0;
    this.hrcalendarService.getallHRsumcont(this.month, this.selectedcode).toPromise().then((res: any) => {
      const totalHours = res as Hrcalendar[];

      this.hrcalendarService.getallHRempcont(this.month, this.selectedcode).toPromise().then((res: any) => {
        const manpowers = res as Hrcalendar[];
        //Manpower working:
        this.hrcalendarService.getallHRwempcont(this.month, this.selectedcode).toPromise().then((res: any) => {
          const manpowerWorking = res as Hrcalendar[];


          if (manpowers && manpowerWorking && totalHours) {
            totalHours.forEach(totalHour => {

              me.companies.push({
                companyFName: manpowers[me.i].companyFName,
                amount: (totalHours[me.i].amount) ? totalHours[me.i].amount : 0,
                totalHours: (totalHours[me.i].totalHours) ? totalHours[me.i].totalHours : 0,
                manpowerWorking: 0,
                manpower: 0,
                color: me.colors[me.i]
              });

              if (!manpowerWorking[me.i]) {
                me.companies[me.i].manpowerWorking = 0;
              } else if (!manpowers[me.i]) {
                me.companies[me.i].manpower = 0
              }
              if (manpowerWorking[me.i].companyFName == manpowers[me.i].companyFName && totalHours[me.i].companyFName == manpowers[me.i].companyFName) {
                me.companies[me.i].companyFName = manpowers[me.i].companyFName;
                me.companies[me.i].manpowerWorking = manpowerWorking[me.i].totalEmp;
                me.companies[me.i].manpower = manpowers[me.i].totalEmp;
                me.companies[me.i].amount = (totalHours[me.i].amount) ? totalHours[me.i].amount : 0,
                me.companies[me.i].totalHours = (totalHours[me.i].totalHours) ? totalHours[me.i].totalHours : 0;
                me.companies[me.i].color = me.colors[me.i];
              }
              me.i = me.i + 1;
            });
          }

          this.loading = false;
        });
      });
    }, error => {
      this.loading = false;
    });
  }
  selectedMonth() {
    this.getData();
    this.topData();
  }
  selectedGrid(ev) {
    this.selectedcode = ev;
    this.getData();
    this.topData();
  }
  detail(companyFName) {
    this.company_name = companyFName;
    this.selected_eventdate = '';
    this.hrcalendarService.hrcalendarEventData = [];

    this.totalhours = 0;
    this.cols = [
      //{ field: 'item_type', header: 'Type' },
      { field: 'employeeName', header: 'Employee Name' },
      { field: 'gender', header: 'Gender' },
      { field: 'locationName', header: 'Location' },
      { field: 'companyFName', header: 'Company' },
      { field: 'departmentFName', header: 'Department' },
      { field: 'designationsName', header: 'Designations' },
      { field: 'status', header: 'Status' },
      { field: 'ava_hours', header: 'Avg. Hours' },
      { field: 'totalHours', header: 'Tot. Hours' },
      { field: 'rate', header: 'Rate' },
    ];

    $('#basicExampleModal').modal('show');
    this.loading2 = true;
    this.hrcalendarService.getallBoxClickData(this.month, companyFName, this.selectedcode)
      .toPromise()
      .then(res => {
        this.hrcalendarService.hrcalendarEventData = res as Hrcalendar[];
        this.hrcalendarService.hrcalendarEventData.forEach(row => {
          this.totalhours = this.totalhours + row.totalHours;
        });
        if (this.totalhours > 0) {
          this.totalhours = this.totalhours * 325;
        }
        this.loading2 = false;
      }, error => {
        this.loading2 = false;

      });
  }
  eventClick(model) {

    this.company_name = '';
    this.hrcalendarService.hrcalendarEventData = [];

    this.totalhours = 0;
    this.cols = [
      //{ field: 'item_type', header: 'Type' },
      { field: 'employeeName', header: 'Employee Name' },
      { field: 'gender', header: 'Gender' },
      { field: 'locationName', header: 'Location' },
      { field: 'companyFName', header: 'Company' },
      { field: 'departmentFName', header: 'Department' },
      { field: 'designationsName', header: 'Designations' },
      { field: 'status', header: 'Status' },
      { field: 'pdate', header: 'Pdate' },
      { field: 'ava_hours', header: 'Avg. Hours' },
      { field: 'totalHours', header: 'Tot. Hours' },
      { field: 'rate', header: 'Rate' },

    ];

    $('#basicExampleModal').modal('show');
    this.selected_eventdate = this.datePipe.transform(model.event.start, 'yyyy-MM-dd');
    this.loading2 = true;
    this.hrcalendarService.getallHRcalDetail(this.month, this.selected_eventdate, this.selectedcode)
      .toPromise()
      .then(res => {
        this.hrcalendarService.hrcalendarEventData = res as Hrcalendar[];
        this.hrcalendarService.hrcalendarEventData.forEach(row => {
          this.totalhours = this.totalhours + row.totalHours;
        });
        if (this.totalhours > 0) {
          this.totalhours = this.totalhours * 325;
        }
        this.loading2 = false;
      }, error => {
        this.loading2 = false;

      });
  }
}
