import { Component, OnInit } from "@angular/core";
import { ActionplanService } from "../shared/inbox/actionplan.service";
import { LoginService } from "../shared/login/login.service";
import { User } from "../shared/login/User.model";
import { InboxService } from "../shared/inbox/inbox.service";
import { Router } from "@angular/router";
import { Action } from "@fullcalendar/core";
import { Actionplan } from "../shared/inbox/actionplan.model";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"]
})
export class TaskComponent implements OnInit {
  public currentUser: User;
  public description: string;

  constructor(
    public service: ActionplanService,
    public lservice: LoginService,
    public iservice: InboxService,
    private route: Router
  ) {
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
  }

  ngOnInit() {
    this.service.getTaskDatabyid(this.currentUser.id);
  }
  opendetail(id) {
    // this.iservice.messageid = id;
    this.service.id = id;
    this.iservice.uid = this.currentUser.id;
    this.route.navigate(["/task-detail"]);
  }
}
