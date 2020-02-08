import { Component, OnInit } from "@angular/core";
import { ActionplanService } from "../../shared/inbox/actionplan.service";
import { LoginService } from "../../shared/login/login.service";
import { User } from "../../shared/login/User.model";
import { InboxService } from "../../shared/inbox/inbox.service";
import { Router } from "@angular/router";
import { Action } from "@fullcalendar/core";
import { Actionplan } from "../../shared/inbox/actionplan.model";
import * as moment from "moment";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-task",
  templateUrl: "./pendingtask.component.html",
  styleUrls: ["./pendingtask.component.css"],
  providers: [DatePipe]
})
export class PendingtaskComponent implements OnInit {
  public currentUser: User;

  public description: string;
  public days: number;
  public cDate: string;
  cpage: {};
  constructor(
    public service: ActionplanService,
    public lservice: LoginService,
    public iservice: InboxService,
    private route: Router,
    private datePipe: DatePipe
  ) {
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
  }

  ngOnInit() {
    console.log(this.service.userid);
    if (this.service.userid != null) {
      this.service.pendingapproval(this.service.userid);
    }
    this.cDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  }
  getdays(currentdate, actiondate) {
    this.days = Math.abs(moment(actiondate).diff(moment(currentdate), "days"));
    return this.days;
  }

  opendetail(id) {
    this.service.id = id;
    this.iservice.uid = this.currentUser.id;
    this.route.navigate(["/pending-task-detail"]);
  }
}
