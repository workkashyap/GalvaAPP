import { Component, OnInit } from '@angular/core';
import { User } from "../shared/login/User.model";
import { RoundhoursService } from "../shared/roundhours/roundhours.service";
import { Roundhours } from "../shared/roundhours/roundhours.model";
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-roundhours',
  templateUrl: './roundhours.component.html',
  styleUrls: ['./roundhours.component.css'],
  providers: [DatePipe],
  styles: [
    `
      :host ::ng-deep .ui-table .ui-table-thead > tr > th {
        font-size:7px;
      }
      :host ::ng-deep .ui-table-resizable>.ui-table-wrapper {
          overflow-x: unset;
      }
      :host ::ng-deep ::-webkit-scrollbar {
        width: 10px;
      }
      /* Track */
      :host ::ng-deep ::-webkit-scrollbar-track {
        background: #f1f1f1; 
      }
       
      /* Handle */
      :host ::ng-deep ::-webkit-scrollbar-thumb {
        background: #c1c1c1; 
      }
      
      /* Handle on hover */
      :host ::ng-deep ::-webkit-scrollbar-thumb:hover {
        background: #c1c1c1; 
      }
    `
  ]
})

export class RoundhoursComponent implements OnInit {
  public currentUser: User;
  cols: any[];
  public loading = false;
  roundHours: any;
  selectedItemrej: Roundhours;

  constructor(
    public toastr: ToastrService, public datePipe: DatePipe,
    public rhservice: RoundhoursService, public route: Router) {
  }

  ngOnInit() {
    let me = this;

    this.cols = [
      { field: "edit", header: "Action" },
      { field: "pstng_date", header: "Date" },
      { field: "total", header: "Total" },
      { field: "plant", header: "Plant" },
      { field: "rtype", header: "Type" },
      //{ field: "shiftaname", header: "Shift A" },
      { field: "r7to8", header: "7-8" },
      { field: "r8to9", header: "8-9" },
      { field: "r9to10", header: "9-10" },
      { field: "r10to11", header: "10-11" },
      { field: "r11to12", header: "11-12" },
      { field: "r12to13", header: "12-13" },
      { field: "r13to14", header: "13-14" },
      { field: "r14to15", header: "14-15" },
      // { field: "shiftbname", header: "Shift B" },
      { field: "r15to16", header: "15-16" },
      { field: "r16to17", header: "16-17" },
      { field: "r17to18", header: "17-18" },
      { field: "r18to19", header: "18-19" },
      { field: "r19to20", header: "19-20" },
      { field: "r20to21", header: "20-21" },
      { field: "r21to22", header: "21-22" },
      { field: "r22to23", header: "22-23" },
      //{ field: "shiftcname", header: "Shift C" },
      { field: "r23to24", header: "23-24" },
      { field: "r1to2", header: "1-2" },
      { field: "r2to3", header: "2-3" },
      { field: "r3to4", header: "3-4" },
      { field: "r4to5", header: "4-5" },
      { field: "r5to6", header: "5-6" },
      { field: "r6to7", header: "6-7" },
    ];
    this.refreshList();
  }
  refreshList() {
    let me = this;
    this.loading = true;
    me.roundHours = [];
    this.rhservice.roundHoursList().toPromise().then(res => {
      const roundHours = res as Roundhours[];
      if (roundHours && roundHours != null) {
        roundHours.forEach(roundHour => {
          roundHour.total = roundHour.r7to8 + roundHour.r8to9 + roundHour.r9to10 + roundHour.r10to11 + roundHour.r11to12 + roundHour.r12to13 + roundHour.r13to14 + roundHour.r14to15 + roundHour.r15to16 + roundHour.r16to17 + roundHour.r17to18 + roundHour.r18to19 + roundHour.r19to20 + roundHour.r20to21 + roundHour.r21to22 + roundHour.r22to23 + roundHour.r23to24 + roundHour.r24to1 + roundHour.r1to2 + roundHour.r2to3 + roundHour.r3to4 + roundHour.r4to5 + roundHour.r5to6 + roundHour.r6to7;
          me.roundHours.push(roundHour);
        });
      }
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }
  removeData(data) {
    console.log("removeData", data);
    this.rhservice.deleteRoundHour(data.id).toPromise().then(res => {
      this.refreshList();
    });
  }

  editData(data) {
    console.log(data);
    this.rhservice.date = data.pstng_date;
    this.rhservice.plant = data.plant;
    this.rhservice.rtype = data.rtype;

    this.route.navigate(["./addroundhour"]);

  }
  addRoundHour() {

    this.rhservice.date = null;
    this.rhservice.plant = null;
    this.rhservice.rtype = null;
    // this.iservice.uid = this.currentUser.id;
    this.route.navigate(["./addroundhour"]);
  }
}
