import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/login/User.model';
import { Inbox } from 'src/app/shared/inbox/inbox.model';
import { ActionplanService } from 'src/app/shared/inbox/actionplan.service';
import { LoginService } from 'src/app/shared/login/login.service';
import { InboxService } from 'src/app/shared/inbox/inbox.service';
import { DatePipe } from '@angular/common';

import { UserService } from 'src/app/shared/user/user.service';
import { PlantService } from 'src/app/shared/plant/plant.service';
import { HrcalService } from '../shared/hrcal/hrcal.service';
import { Hrcal } from '../shared/hrcal/hrcal.model';
import { AttendancesummaryService } from '../shared/hr/attendancesummary.service';
import { Attendancesummary } from '../shared/hr/attendancesummary.model';
import { Plant } from '../shared/plant/plant.model';

@Component({
  selector: 'app-hrcal',
  templateUrl: './hrcal.component.html',
  styleUrls: ['./hrcal.component.css'],
  providers: [DatePipe],
  styles: [
    `
      :host ::ng-deep .ui-table .ui-table-thead > tr > th {
        position: -webkit-sticky;
        position: sticky;
        background: blue;
        color: white;
        font-size:8px;
        top: 0px;
        z-index: 1;
      }

      :host ::ng-deep .ui-table-resizable > .ui-table-wrapper {
        overflow-x: initial !important;
      }

      :host ::ng-deep .ui-table-resizable .ui-resizable-column {
        position: sticky !important;
      }

      @media screen and (max-width: 64em) {
        :host ::ng-deep .ui-table .ui-table-thead > tr > th {
          top: 0px;
        }
      }
    `
  ]
})
export class HrcalComponent implements OnInit {
  public currentUser: User;
  public loading = false;
  public cDate: string;
  public todayDate: Date;

  public Fromdate: string;
  public Todate: string;
  public selectedPlant: string;
  public selectedloc: any = 'ALL';

  cols: any[];

  selectedItemrej: Hrcal;
  selectedItemrejarray: Hrcal[] = [];
  filterItemrejarray: Hrcal[] = [];

  iv: number;
  filterenable = false;

  totalHours = 0;
  wopOvertime = 0;
  hpOvertime = 0;
  povertime = 0;

  total_wkd_hrs = 0;

  pdays = 0;
  wopdays = 0;
  hpdays = 0;
  tpresent = 0;

  incentive = 0;
  p_day_hrs = 0;
  ot_hrs = 0;
  basic = 0;
  hra = 0;
  ot_pay = 0;
  total_pay = 0;
  incentivetotal = 0;

  monthName: any;
  public monthNames: any;
  month: any;
  public date: any;
  selectedah: any = 'All';

  constructor(
    public asservice: AttendancesummaryService,
    public hrcalservice: HrcalService,
    private lservice: LoginService,
    public service: InboxService,
    public uservice: UserService,
    private datePipe: DatePipe,
    public plantservice: PlantService
  ) {
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    this.cDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    // this.selectedPlant = "Gujarat";
    this.monthNames = ['--', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
      'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];
  }
  ngOnInit() {
    const me = this;
    this.Fromdate = this.cDate;
    this.Todate = this.cDate;

    this.date = new Date();
    this.month = this.date.getMonth() + 1;
    this.monthName = this.monthNames[this.month];
    const year = new Date().getFullYear();
    const month = this.monthName;
    const a = '1-' + month + '-' + year;
    const date = new Date(a);
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const current_month_startdate = this.datePipe.transform(firstDay, 'yyyy-MM-dd');

    this.plantservice
      .sgetPlantData(me.currentUser.id)
      .toPromise()
      .then(res => {
        me.plantservice.splantlist = res as Plant[];
      });

    this.cols = [
      // { field: 'id', header: 'ID' },
      { field: 'employeeCode', header: 'Employee Code' },
      { field: 'employeeName', header: 'Employee Name' },
      { field: 'employementType', header: 'Category' },
      { field: 'doj', header: 'Doj' },
      // { field: "gender", header: "Gender" },
      // { field: "locationName", header: "Location" },
      // { field: "companyFName", header: "Company" },
      // { field: "departmentFName", header: "Department" },
      // { field: "designationsName", header: "Designations" },
      { field: 'totalDays', header: 'No of Days As on' },

      { field: 'totalHours', header: 'P-days Hrs' },
      { field: 'wopOvertime', header: 'WOP Hrs' },
      { field: 'hpOvertime', header: 'HP-Hrs' },
      { field: 'povertime', header: 'P-OT' },

      { field: 'total_wkd_hrs', header: 'Total Wkd Hrs' },

      { field: 'pdays', header: 'P Days' },
      { field: 'wopdays', header: 'WOP Days' },
      { field: 'hpdays', header: 'HP Days' },
      { field: 'tpresent', header: 'Total Present' },
      { field: 'rate', header: 'Rate' },

      { field: 'incentive', header: 'Incentive' },
      { field: 'p_day_hrs', header: 'P Day Hrs' },
      { field: 'ot_hrs', header: 'OT Hrs' },
      { field: 'basic', header: 'Basic' },
    //  { field: "hra", header: "HRA" },
      { field: 'ot_pay', header: 'OT Pay' },
      { field: 'total_pay', header: 'Total Pay' },
      { field: 'incentivetotal', header: 'Total Incentive' },
      { field: 'attendance_bonus', header: 'Attendance Bonus' },
    ];

    this.asservice
      .getallHRsumcont(current_month_startdate, me.Todate, 'All')
      .toPromise()
      .then(res => {
        me.asservice.attendancesummary = res as Attendancesummary[];
        me.selectedPlant = me.asservice.attendancesummary[0].companyFName;
        this.getData();

      });
  }
  refreshDropdown() {
    const me = this;
    this.asservice
      .getallHRsumcont(me.Fromdate, me.Todate, 'All')
      .toPromise()
      .then(res => {
        me.asservice.attendancesummary = res as Attendancesummary[];
        me.selectedPlant = me.asservice.attendancesummary[0].companyFName;
        me.getData();
      });
  }
  selectedAh(ev) {
    this.selectedah = ev;
    this.getData();
  }
  selectedGrid(ev) {
    this.selectedPlant = ev;
    this.getData();
  }
  selectedlocation(ev) {
  this.selectedloc = ev;
  this.getData();

  }
  getData() {
    const me = this;
    this.filterenable = false;
    me.loading = true;
    me.hrcalservice.hrcalList = [];
    this.hrcalservice
      .getallData(me.Fromdate, me.Todate, me.selectedPlant, this.selectedloc, this.selectedah)
      .toPromise()
      .then(res => {
        me.hrcalservice.hrcalList = res as Hrcal[];
        const hrcalList = res as Hrcal[];
        me.hrcalservice.hrcalList.forEach(hrcal => {
          if (!hrcal.pdays) {
            hrcal.pdays = 0;
          }
          if (!hrcal.wopdays) {
            hrcal.wopdays = 0;
          }
          if (!hrcal.hpdays) {
            hrcal.hpdays = 0;
          }
          // total_wkd_hrs
          if (!hrcal.totalHours) {
            hrcal.totalHours = 0;
          }
          if (!hrcal.povertime) {
            hrcal.povertime = 0;
          }
          if (hrcal.wopOvertime == null) {
            hrcal.wopOvertime = 0;
          }
          hrcal.total_wkd_hrs = hrcal.totalHours + hrcal.povertime + hrcal.wopOvertime;
          if (!hrcal.total_wkd_hrs) {
            hrcal.total_wkd_hrs = 0;
          }
          if (hrcal.hpOvertime == null) {
            hrcal.hpOvertime = 0;
          }
          // incentive
          if (!hrcal.totalDays) {
            hrcal.totalDays = 0;
          }
          hrcal.incentive = 0;

          if (hrcal.totalDays <= 89) {
            hrcal.incentive = 0;
          } else if (hrcal.totalDays >= 90 && hrcal.totalDays <= 179) {
            hrcal.incentive = 10;
          } else if (hrcal.totalDays >= 180 && hrcal.totalDays <= 269) {
            hrcal.incentive = 15;
          } else if (hrcal.totalDays >= 270 && hrcal.totalDays <= 364) {
            hrcal.incentive = 20;
          } else if (hrcal.totalDays >= 365 && hrcal.totalDays <= 394) {
            hrcal.incentive = 25;
          } else if (hrcal.totalDays >= 395 && hrcal.totalDays <= 424) {
            hrcal.incentive = 30;
          } else if (hrcal.totalDays >= 425 && hrcal.totalDays <= 454) {
            hrcal.incentive = 35;
          } else if (hrcal.totalDays >= 455 && hrcal.totalDays <= 484) {
            hrcal.incentive = 40;
          } else if (hrcal.totalDays >= 485 && hrcal.totalDays <= 514) {
            hrcal.incentive = 45;
          } else if (hrcal.totalDays >= 515 && hrcal.totalDays <= 544) {
            hrcal.incentive = 50;
          } else if (hrcal.totalDays >= 545 && hrcal.totalDays <= 575) {
            hrcal.incentive = 55;
          } else if (hrcal.totalDays >= 575) {
            hrcal.incentive = 55;
          }



          hrcal.p_day_hrs = 8 * (hrcal.pdays + hrcal.wopdays);
          // ot_hrs
          hrcal.ot_hrs = hrcal.total_wkd_hrs - hrcal.p_day_hrs;
          // basic
          hrcal.basic = hrcal.rate * (hrcal.pdays + hrcal.wopdays);

          // hra
          // if (hrcal.basic > 8550)
          // {
          //   hrcal.hra = hrcal.basic - 8450;
          // }
          // else
          // {
          //   hrcal.hra =  8450 - hrcal.basic;
          // }
          // ot_pay
          hrcal.ot_pay = (hrcal.ot_hrs / 8) * hrcal.rate;
          hrcal.ot_pay = Math.round(hrcal.ot_pay);
          // total_pay
          hrcal.total_pay = hrcal.basic + hrcal.ot_pay;
          hrcal.total_pay = Math.round(hrcal.total_pay);

          //incentivetotal -Old code
          hrcal.incentivetotal = (hrcal.total_wkd_hrs - hrcal.povertime) * hrcal.incentive;
          // change on 12-06-2021   
          //hrcal.incentivetotal = hrcal.pdays * hrcal.incentive;
          
          hrcal.incentivetotal = Math.round(hrcal.incentivetotal);

          hrcal.incentivetotal = (hrcal.incentivetotal / 8);

          // tpresent
          hrcal.tpresent = hrcal.pdays + hrcal.wopdays + hrcal.hpdays;
          // me.hrcalservice.hrcalList.push(hrcal);

          hrcal.attendance_bonus = 0;
          if (hrcal.tpresent >= 26) {
            hrcal.attendance_bonus = 500;
          }

        });
        me.sumOfvalues();
        me.loading = false;
      }, error => {
        me.loading = false;
      });
  }
  loadper(ev, dt) {
    this.filterenable = true;
    this.selectedItemrejarray = dt.value;
    this.iv = 0;
    this.filterItemrejarray = [];
    // console.log(this.selectedItemrejarray[0].id);
    for (const c of this.selectedItemrejarray) {
      if (
        c.employeeCode.toString().includes(ev.toString()) ||
        c.employeeName.toString().includes(ev.toString()) ||
        c.doj.toString().includes(ev.toString()) ||
        c.employementType.toString().includes(ev.toString())
      ) {
        this.filterItemrejarray.push(this.selectedItemrejarray[this.iv]);
        this.iv += 1;
      } else {
        this.iv += 1;
      }
    }
    this.sumOfvalues();
  }
  sumOfvalues() {

    this.totalHours = 0;
    this.wopOvertime = 0;
    this.hpOvertime = 0;
    this.povertime = 0;

    this.total_wkd_hrs = 0;

    this.pdays = 0;
    this.wopdays = 0;
    this.hpdays = 0;
    this.tpresent = 0;

    this.incentive = 0;
    this.p_day_hrs = 0;
    this.ot_hrs = 0;
    this.basic = 0;
    this.hra = 0;
    this.ot_pay = 0;
    this.total_pay = 0;
    this.incentivetotal = 0;

    if (this.filterenable === true) {


      this.filterItemrejarray.forEach(element => {

        this.totalHours += element.totalHours;
        this.wopOvertime += element.wopOvertime;
        this.hpOvertime += element.hpOvertime;
        this.povertime += element.povertime;

        this.total_wkd_hrs += element.total_wkd_hrs;

        this.pdays += element.pdays;
        this.wopdays += element.wopdays;
        this.hpdays += element.hpdays;
        this.tpresent += element.tpresent;

        this.incentive += element.incentive;
        this.p_day_hrs += element.p_day_hrs;
        this.ot_hrs += element.ot_hrs;
        this.basic += element.basic;
      //  this.hra += element.hra;
        this.ot_pay += element.ot_pay;
        this.total_pay += element.total_pay;
        this.incentivetotal += element.incentivetotal;
      });
      return;
    }

    this.hrcalservice.hrcalList.forEach(element => {
      this.totalHours += element.totalHours;
      this.wopOvertime += element.wopOvertime;
      this.hpOvertime += element.hpOvertime;
      this.povertime += element.povertime;

      this.total_wkd_hrs += element.total_wkd_hrs;

      this.pdays += element.pdays;
      this.wopdays += element.wopdays;
      this.hpdays += element.hpdays;
      this.tpresent += element.tpresent;

      this.incentive += element.incentive;
      this.p_day_hrs += element.p_day_hrs;
      this.ot_hrs += element.ot_hrs;
      this.basic += element.basic;
   //   this.hra += element.hra;
      this.ot_pay += element.ot_pay;
      this.total_pay += element.total_pay;
      this.incentivetotal += element.incentivetotal;
    });
  }
}
