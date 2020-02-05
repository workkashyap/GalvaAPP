import { Component, OnInit } from "@angular/core";
import { ActionplanService } from "src/app/shared/inbox/actionplan.service";
import { LoginService } from "src/app/shared/login/login.service";
import { InboxService } from "src/app/shared/inbox/inbox.service";
import { Router } from "@angular/router";
import { User } from "src/app/shared/login/User.model";
import { create } from "domain";

@Component({
  selector: "app-task-detail",
  templateUrl: "./task-detail.component.html",
  styleUrls: ["./task-detail.component.css"]
})
export class TaskDetailComponent implements OnInit {
  public currentUser: User;

  constructor(
    public service: ActionplanService,
    public lservice: LoginService,
    public iservice: InboxService,
    private route: Router
  ) {}

  ngOnInit() {
    console.log(this.iservice.uid);
    console.log(this.service.id);
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    // this.iservice.messagebyid(this.iservice.messageid);
    this.service.getTaskDetailbyid(this.service.id);
  }
}
