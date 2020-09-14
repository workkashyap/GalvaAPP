import { Component, OnInit } from "@angular/core";
import { User } from "src/app/shared/login/User.model";
import { Inbox } from "src/app/shared/inbox/inbox.model";
import { ActionplanService } from "src/app/shared/inbox/actionplan.service";
import { LoginService } from "src/app/shared/login/login.service";
import { InboxService } from "src/app/shared/inbox/inbox.service";
import { DatePipe } from "@angular/common";

import { UserService } from "src/app/shared/user/user.service";
import { PlantService } from "src/app/shared/plant/plant.service";
import { HrcalService } from '../shared/hrcal/hrcal.service';
import { Hrcal } from '../shared/hrcal/hrcal.model';
import { AttendancesummaryService } from '../shared/hr/attendancesummary.service';
import { Attendancesummary } from '../shared/hr/attendancesummary.model';

@Component({
  selector: "app-hrcal",
  templateUrl: "./hrcal.component.html",
  styleUrls: ["./hrcal.component.css"],
  providers: [DatePipe],
  styles: [
    `
      :host ::ng-deep .ui-table .ui-table-thead > tr > th {
        position: -webkit-sticky;
        position: sticky;
        background: blue;
        color: white;
        font-size:10px;
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

  cols: any[];

  selectedItemrej: Hrcal;
  selectedItemrejarray: Hrcal[] = [];
  filterItemrejarray: Hrcal[] = [];

  iv: number;
  filterenable = false;

  totalHours: number = 0;
  edays: number = 0;
  totalDays: number = 0;
  rate: number = 0;
  monthName: any;
  public monthNames: any;
  month: any;
  public date: any;

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
    this.cDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    // this.selectedPlant = "Gujarat";
    this.monthNames = ['--', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
      'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];
  }
  ngOnInit() {
    let me = this;
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
    const current_month_startdate = this.datePipe.transform(firstDay, "yyyy-MM-dd");

    this.cols = [
      // { field: 'id', header: 'ID' },
      { field: "employeeCode", header: "Employee Code" },
      { field: "employeeName", header: "Employee Name" },
      { field: "doj", header: "Doj" },
      { field: "gender", header: "Gender" },
      { field: "locationName", header: "Location" },
      { field: "companyFName", header: "Company" },
      { field: "departmentFName", header: "Department" },
      { field: "designationsName", header: "Designations" },

      { field: "pdays", header: "Present Days" },
      { field: "wopdays", header: "WOP Days" },
      { field: "hpdays", header: "HP Days" },

      { field: "tpresent", header: "Total Present" },

      { field: "totalHours", header: "Total Hours" },
      //{ field: "edays", header: "Current month days" },
      { field: "totalDays", header: "Total Days" },
      { field: "rate", header: "Rate" },
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
  selectedGrid(ev) {
    this.selectedPlant = ev;
    this.getData();
  }
  getData() {
    let me = this;
    this.filterenable = false;
    me.loading = true;
    me.hrcalservice.hrcalList = [];
    this.hrcalservice
      .getallData(me.Fromdate, me.Todate, me.selectedPlant)
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
          hrcal.tpresent = hrcal.pdays + hrcal.wopdays + hrcal.hpdays;
          // me.hrcalservice.hrcalList.push(hrcal);
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
        c.gender.toString().includes(ev.toString() ||
          c.locationName.toString().includes(ev.toString()) ||
          c.companyFName.toString().includes(ev.toString()) ||
          c.designationsName.toString().includes(ev.toString()) ||
          c.departmentFName.toString().includes(ev.toString())
        )
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
    this.edays = 0;
    this.totalDays = 0;
    this.rate = 0;

    if (this.filterenable == true) {
      this.filterItemrejarray.forEach(element => {
        this.totalHours += element.totalHours;
        this.edays += element.edays;
        this.totalDays += element.totalDays;
        this.rate += element.rate;
      });
      return;
    }

    this.hrcalservice.hrcalList.forEach(element => {
      this.totalHours += element.totalHours;
      this.edays += element.edays;
      this.totalDays += element.totalDays;
      this.rate += element.rate;
    });
  }
}
