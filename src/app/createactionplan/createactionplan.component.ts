import { Component, OnInit } from '@angular/core';
import { User } from "../shared/login/User.model";
import { CreateactionplanService } from "../shared/createactionplan/createactionplan.service";
import { LoginService } from "../shared/login/login.service";
import { Createactionplan } from "../shared/createactionplan/createactionplan.model";
import { PlantService } from '../shared/plant/plant.service';
import { ToastrService } from 'ngx-toastr';
import { DownloadfileService } from 'src/app/shared/Downloadfile.service';
import { NewTaskComponent } from '../task/new-task/new-task.component';

@Component({
  selector: 'app-createactionplan',
  templateUrl: './createactionplan.component.html',
  styleUrls: ['./createactionplan.component.css']
})
export class CreateactionplanComponent implements OnInit {
  public currentUser: User;
  department: any = 'Plating';
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
    public toastr: ToastrService,
    public fservice: DownloadfileService, public plantservice: PlantService,
    public apservice: CreateactionplanService) {
    this.selectedtype = "1010";


    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    //console.log("currentUser : ", this.currentUser.username);
  }
  getWeeksInMonth(month, year) {
    console.log(month, year);
    console.log(new Date(year, month, 1));

    var weeks = [],
      firstDate = new Date(year, month, 1),

      lastDate = new Date(year, month + 1, 0),
      numDays = lastDate.getDate();

    var start = 1;
    var end = 7 - firstDate.getDay();
    while (start <= numDays) {
      weeks.push({ start: start, end: end });
      start = end + 1;
      end = end + 7;
      if (end > numDays)
        end = numDays;
    }
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
    this.plantservice.getPlantData(this.currentUser.id);
    this.cols = [
      // { field: "id", header: "ID" },
      //  { field: "sHash", header: "S#", width: "50px" },
      { field: "weeks", header: "Weeks", width: "80px" },
      { field: "materialCode", header: "Code", width: "80px" },
      { field: "materialDescription", header: "Description", width: "80px" },
      //{ field: "project", header: "Project", width: "80px" },
      //{ field: "responsibility", header: "Responsibility", width: "90px" },
      { field: "targetdateofcompletion", header: "Target date", width: "80px" },
      { field: "actionPlan", header: "ActionPlan", width: "80px" },
      { field: "rejper", header: "Reject %", width: "80px" },
      // { field: "actualdateofcompletion", header: "Actual date of completion", width: "80px" },
      // { field: "correctiveactiontaken", header: "Corrective action taken", width: "80px" },
      { field: "result", header: "Result", width: "80px" },
      { field: "progresspercent", header: "Progress", width: "80px" },
      { field: "approvedstatus", header: "Approved status", width: "80px" },
      // { field: "remarks2", header: " Remark 2", width: "80px" },
      { field: "attachment", header: "Attachment", width: "80px" },
      { field: "edit", header: "Action", width: "100px" }
    ];
    this.loading = true;
    this.apservice
      .getActionPlan(this.monthname, this.plantcode, this.currentUser.username)
      .toPromise()
      .then(res => {
        me.allActionPlan = res as Createactionplan[];
        me.loading = false;
      });
  }
  refreshList() {
    let me = this;
    this.apservice
      .getActionPlan(this.monthname, this.plantcode, this.currentUser.username)
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
  onRowEditInit(row: any) {
    this.cols[0].width = "90px";
    this.cols[1].width = "160px";
    this.cols[2].width = "160px";
    this.cols[3].width = "120px";
    this.cols[4].width = "140px";
    this.cols[5].width = "120px";
    this.cols[6].width = "120px";
    this.cols[7].width = "120px";
    this.cols[8].width = "120px";
    this.cols[9].width = "240px";
    row.targetdateofcompletion = this.formatDate(new Date(row.targetdateofcompletion));
    row.actualdateofcompletion = this.formatDate(new Date(row.actualdateofcompletion));
    console.log(row);
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
  myValidation(val) {
    console.log(val);
    this.errorInput = '';
    if (val > 100) {
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
    row.currentDate = new Date();
    row.monthName = this.monthname;
    row.plantNo = this.plantcode;
    row.responsibility = this.currentUser.username;
    row.department = this.department;
    //row.actualdateofcompletion = '';
    row.targetdateofcompletion = new Date(row.targetdateofcompletion);
    row.actualdateofcompletion = new Date(row.currentDate);

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
    this.cols[0].width = "80px";
    this.cols[1].width = "80px";
    this.cols[2].width = "80px";
    //  this.cols[3].width = "80px";
    this.cols[3].width = "80px";
    this.cols[4].width = "90px";
    //  this.cols[6].width = "80px";
    // this.cols[7].width = "80px";
    this.cols[5].width = "80px";
    this.cols[6].width = "80px";
    this.cols[7].width = "80px";
    this.cols[8].width = "120px";
    this.cols[9].width = "240px";

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
    this.cols[0].width = "160px";
    this.cols[1].width = "120px";
    this.cols[2].width = "160px";
    // this.cols[3].width = "120px";
    this.cols[3].width = "140px";
    this.cols[4].width = "140px";
    //this.cols[6].width = "140px";
    //this.cols[7].width = "200px";
    this.cols[5].width = "120px";
    this.cols[6].width = "100px";
    this.cols[7].width = "140px";
    this.cols[8].width = "120px";
    this.cols[9].width = "240px";
    return {
      "id": 0,
      "sHash": "",
      "weeks": "",
      "department": "",
      "materialCode": "",
      "materialDescription": "",
      "rejper": "",
      "project": "",
      "responsibility": "",
      "targetdateofcompletion": "",
      "actualdateofcompletion": "",
      "correctiveactiontaken": "",
      "result": "",
      "progresspercent": '0',
      "approvedstatus": "",
      "remarks2": "",
      "attachment": "",
      "approvalid": 14,
      "ActionPlan": "",
      "edit": false
    }
  }
}