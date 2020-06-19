import { Component, OnInit } from '@angular/core';
import { User } from "../shared/login/User.model";
import { CreateactionplanService } from "../shared/createactionplan/createactionplan.service";
import { LoginService } from "../shared/login/login.service";
import { Createactionplan } from "../shared/createactionplan/createactionplan.model";
import { PlantService } from '../shared/plant/plant.service';
import { ToastrService } from 'ngx-toastr';
import { DownloadfileService } from 'src/app/shared/Downloadfile.service';
import { DatePipe } from '@angular/common';
import * as moment from "moment";
import { Plant } from '../shared/plant/plant.model';
import { UserService } from '../shared/user/user.service';
@Component({
  selector: 'app-createactionplan',
  templateUrl: './createactionplan.component.html',
  styleUrls: ['./createactionplan.component.css'],
  providers: [DatePipe]

})
export class CreateactionplanComponent implements OnInit {
  public currentUser: User;
  department: any = 'Plating';
  mode: any = 'Quality';

  cols: any[];
  public selectedtype: string;
  public loading = false;
  allActionPlan: any;
  clonedData: { [s: string]: any; } = {};
  monthname: any;
  public monthNames: any;
  plantcode: any;
  public date: any;
  totalWeeks: any;
  constructor(
    private lservice: LoginService,
    public service: UserService,
    public toastr: ToastrService, public datePipe: DatePipe,
    public fservice: DownloadfileService, public plantservice: PlantService,
    public apservice: CreateactionplanService) {
    this.selectedtype = "1010";

    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    console.log(" this.lservice.currentUser : ", this.lservice.currentUser);
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.service.getuserbyid(this.currentUser.id);

    //console.log("currentUser : ", this.currentUser.username);
  }
  getWeeksInMonth(month, year) {
    var startDate = moment([year, month]);
    var endDate = moment(startDate).endOf('month');

    var dates = [];
    var weeks = [];

    var per_week = [];
    var difference = endDate.diff(startDate, 'days');

    per_week.push(startDate.toDate())
    var index = 0;
    var last_week = false;
    while (startDate.add(1, 'days').diff(endDate) < 0) {
      if (startDate.day() != 0) {
        per_week.push(startDate.toDate())
      }
      else {
        if ((startDate.clone().add(7, 'days').month() == (month))) {
          weeks.push(per_week)
          per_week = []
          per_week.push(startDate.toDate())
        }
        else if (Math.abs(index - difference) > 0) {
          if (!last_week) {
            weeks.push(per_week);
            per_week = [];
          }
          last_week = true;
          per_week.push(startDate.toDate());
        }
      }
      index += 1;
      if ((last_week == true && Math.abs(index - difference) == 0) ||
        (Math.abs(index - difference) == 0 && per_week.length == 1)) {
        weeks.push(per_week)
      }
      dates.push(startDate.clone().toDate());
    }
    console.log(weeks);
    return weeks;
  }
  errorInput: any = '';
  editing: boolean = false;
  ngOnInit() {
    let me = this;
    this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
      'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];
    this.plantcode = "1010";

    this.date = new Date();

    this.totalWeeks = this.getWeeksInMonth(this.date.getMonth(), new Date().getFullYear());

    this.monthname = this.monthNames[this.date.getMonth()];
    /// this.plantservice.getPlantData(this.currentUser.id);

    this.cols = [
      { field: "weeks", header: "Weeks", width: "75px" },
      { field: "materialCode", header: "Code", width: "75px" },
      { field: "materialDescription", header: "Description", width: "150px" },
      { field: "rejvalue", header: "Rej. Val.", width: "100px" },
      { field: "defect1", header: "Defect 1", width: "100px" },
      { field: "defectval1", header: "Defect Val. 1", width: "100px" },
      { field: "defect2", header: "Defect 2", width: "100px" },
      { field: "defectval2", header: "Defect Val. 2", width: "100px" },
      { field: "defect3", header: "Defect 3", width: "100px" },
      { field: "defectval3", header: "Defect Val. 3", width: "100px" },
      { field: "responsibility", header: "Responsibility", width: "100px" },
      { field: "targetdateofcompletion", header: "Target date", width: "140px" },
      { field: "actionPlan", header: "ActionPlan", width: "160px" },
      { field: "rejper", header: "Reject %", width: "80px" },
      { field: "result", header: "Result", width: "80px" },
      { field: "progresspercent", header: "Progress", width: "100px" },
      { field: "approvedstatus", header: "Status", width: "80px" },
      { field: "attachment", header: "Attachment", width: "240px" },
      { field: "edit", header: "Action", width: "100px" }
    ];
    this.loading = true;

    this.plantservice
      .sgetPlantData(me.currentUser.id)
      .toPromise()
      .then(res => {
        me.plantservice.plantlist = res as Plant[];
        console.log("splantlist", me.plantservice.plantlist);
        me.plantcode = me.plantservice.plantlist[0].plantcode;

        this.apservice
          .getActionPlan(this.monthname, me.plantcode, this.mode, this.department)
          .toPromise()
          .then(res => {
            me.allActionPlan = res as Createactionplan[];
            me.loading = false;
          });

      });

    // for user => this.currentUser.username

  }
  refreshList() {
    let me = this;
    this.apservice
      .getActionPlan(this.monthname, this.plantcode, this.mode, this.department)
      .toPromise()
      .then(res => {
        me.allActionPlan = res as Createactionplan[];
      });
  }

  selectedMonth(monthname) {
    console.log(monthname);
    const month = this.monthNames.indexOf(monthname);
    this.totalWeeks = this.getWeeksInMonth(month, new Date().getFullYear());
    this.refreshList();
  }
  selectedGrid(plantCode) {
    console.log(plantCode);
    this.refreshList();
  }
  selectedept() {
    let me = this;
    this.apservice
      .getActionPlan(this.monthname, this.plantcode, this.mode, this.department)
      .toPromise()
      .then(res => {
        me.allActionPlan = res as Createactionplan[];
      });

  }
  selectedmode() {
    let me = this;
    this.apservice
      .getActionPlan(this.monthname, this.plantcode, this.mode, this.department)
      .toPromise()
      .then(res => {
        me.allActionPlan = res as Createactionplan[];
      });

  }
  getRejectPer(val, rowData) {
    const dateRange = this.totalWeeks[val - 1];
    console.log("dateRange", dateRange);
    const month = this.monthNames.indexOf(this.monthname);

    const startDate = dateRange[0]; //new Date().getFullYear() + '-' + (parseInt(month) + 1) + '-' + dateRange.start;
    const endDate = dateRange[dateRange.length - 1];  //new Date().getFullYear() + '-' + (parseInt(month) + 1) + '-' + dateRange.end;

    const startDate1 = this.datePipe.transform(startDate, "yyyy-MM-dd");
    const endDate1 = this.datePipe.transform(endDate, "yyyy-MM-dd");

    const me = this;
    this.apservice
      .getRejectPer(this.plantcode, startDate1, endDate1)
      .toPromise()
      .then(res => {
        console.log("rejPer : ", res);
        if (res && res.length > 0) {
          rowData.rejper = res[0].rejper;
        } else {
          rowData.rejper = 0;
        }
        this.myValidation(rowData.rejper, rowData)
        //me.allActionPlan = res as Createactionplan[];
      });

  }
  onRowEditInit(row: any) {

    this.cols[0].width = "75px";
    this.cols[1].width = "75px";
    this.cols[2].width = "150px";
    this.cols[3].width = "75px";
    this.cols[4].width = "75px";
    this.cols[5].width = "90px";
    this.cols[6].width = "75px";
    this.cols[7].width = "90px";
    this.cols[8].width = "75px";
    this.cols[9].width = "90px";
    this.cols[10].width = "100px";
    this.cols[11].width = "127px";
    this.cols[12].width = "160px";
    this.cols[13].width = "75px";
    this.cols[14].width = "75px";
    this.cols[15].width = "100px";
    this.cols[16].width = "65px";
    this.cols[17].width = "240px";
    this.cols[18].width = "100px";

    row.targetdateofcompletion = this.formatDate(new Date(row.targetdateofcompletion));
    row.actualdateofcompletion = this.formatDate(new Date(row.actualdateofcompletion));
    console.log(row);

    this.myValidation(row.rejper, row);
    this.clonedData[row.id] = { row };
  }
  formatDate(date) {
    var day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    var month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    var year = date.getFullYear();
    return year + '-' + month + '-' + day; //day + "-" + month + "-" + year;
  }
  myValidation(val, row) {
    console.log(val);
    this.errorInput = '';
    if (val < 15) {
      row.rejPerBg = "greenBg";
    } else if (val >= 15 && val < 20) {
      row.rejPerBg = "orangeBg";
    } else if (val >= 20) {
      row.rejPerBg = "redBg";
    } else if (val > 100) {
      this.errorInput = "errorInput";
      return;
    }
  }
  onRowEditSave(row: any) {
    const me = this;
    //row.id = 0;
    if (this.fservice.fileName) {
      row.attachment = this.fservice.fileName;
    }
    if (row.rejper > 100) {
      return false;
    }
    row.sHash = '';
    row.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    row.monthName = this.monthname;
    row.plantNo = this.plantcode;
    row.actionPlan = row.actionPlan;
    row.materialDescription = row.materialDescription;
    row.result = row.result;
    row.materialCode = row.materialCode;

    //row.responsibility = 'hardik'; // this.currentUser.username;
    row.progresspercent = parseInt(row.progresspercent);
    row.department = this.department;
    row.mode = this.mode;
    //row.actualdateofcompletion = '';
    row.targetdateofcompletion = this.datePipe.transform(new Date(row.targetdateofcompletion), 'yyyy-MM-dd');
    row.actualdateofcompletion = this.datePipe.transform(new Date(row.currentDate), 'yyyy-MM-dd');

    if (row.id) {
      console.log("Update", row);
      this.apservice.updateCreateactionplan(row).subscribe(
        res => {
          me.toastr.success('Updated Successfully', 'Save ActionPlan');
          me.refreshList();
          me.resetColumnWidth();
        },
        err => {
          console.log(err);
        });
    } else {
      console.log("Insert", row);
      this.apservice.insertCreateactionplan(row).subscribe(
        res => {
          me.toastr.success('Submitted Successfully', 'Save ActionPlan');
          console.log('Saved successfully');
          me.refreshList();
          me.resetColumnWidth();
        },
        err => {
          console.log(err);
        });
    }
  }
  onRowDelete(row: any) {

    this.apservice.deleteCreateactionplan(row).subscribe(
      res => {
        this.toastr.success('Deleted Successfully', 'Save ActionPlan');
        this.refreshList();
      },
      err => {
        console.log(err);
      });
  }
  resetColumnWidth() {

    this.cols[0].width = "75px";
    this.cols[1].width = "75px";
    this.cols[2].width = "150px";
    this.cols[3].width = "75px";
    this.cols[4].width = "75px";
    this.cols[5].width = "90px";
    this.cols[6].width = "75px";
    this.cols[7].width = "90px";
    this.cols[8].width = "75px";
    this.cols[9].width = "90px";
    this.cols[10].width = "100px";
    this.cols[11].width = "127px";
    this.cols[12].width = "160px";
    this.cols[13].width = "75px";
    this.cols[14].width = "75px";
    this.cols[15].width = "100px";
    this.cols[16].width = "65px";
    this.cols[17].width = "240px";
    this.cols[18].width = "100px";
  }

  onRowEditCancel(row: any, index: number) {
    // this.allActionPlan[index] = this.clonedData[row.id];
    if (!row.id) {
      this.allActionPlan.splice(index, 1);
    }
    delete this.clonedData[row.id];
    this.resetColumnWidth();
  }
  newRow() {
    this.cols[0].width = "75px";
    this.cols[1].width = "75px";
    this.cols[2].width = "150px";
    this.cols[3].width = "75px";
    this.cols[4].width = "75px";
    this.cols[5].width = "90px";
    this.cols[6].width = "75px";
    this.cols[7].width = "90px";
    this.cols[8].width = "75px";
    this.cols[9].width = "90px";
    this.cols[10].width = "100px";
    this.cols[11].width = "127px";
    this.cols[12].width = "160px";
    this.cols[13].width = "75px";
    this.cols[14].width = "75px";
    this.cols[15].width = "100px";
    this.cols[16].width = "65px";
    this.cols[17].width = "240px";
    this.cols[18].width = "100px";
    return {
      "id": 0,
      "sHash": "",
      "weeks": "",
      "department": "",
      "materialCode": "",
      "materialDescription": "",
      "rejvalue": "",
      "defect1": "",
      "defectval1": "",
      "defect2": "",
      "defectval2": "",
      "defect3": "",
      "defectval3": "",
      "rejper": "",
      "project": "",
      "responsibility": "",
      "targetdateofcompletion": "",
      "actualdateofcompletion": "",
      "correctiveactiontaken": "",
      "result": "",
      "progresspercent": 0,
      "approvedstatus": "",
      "remarks2": "",
      "attachment": "",
      "approvalid": 14,
      "actionPlan": "",
      "edit": false
    }
  }
}
