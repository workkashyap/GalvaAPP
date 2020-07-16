import { Component, OnInit } from "@angular/core";
import { User } from "../shared/login/User.model";
import { Router } from "@angular/router";
import { LoginService } from "../shared/login/login.service";
import { ActionplanService } from "../shared/inbox/actionplan.service";
import * as moment from "moment";
import { DatePipe } from "@angular/common";
import { InboxService } from "../shared/inbox/inbox.service";
import { PagesService } from "../shared/pages/pages.service";
import { Actionplan } from "../shared/inbox/actionplan.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
  providers: [DatePipe]
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  User: string;
  public days: number;
  public cDate: string;
  public loading = false;
  cpage: any;

  constructor(
    private authenticationService: LoginService,
    public service: ActionplanService,
    public iservice: InboxService,
    public pageservice: PagesService,
    private route: Router,
    private datePipe: DatePipe,
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );


  }

  ngOnInit() {
    this.loading = true;
    this.service
      .getPendingApprovals()
      .toPromise()
      .then(res => {
        this.service.allpendinglist = res as Actionplan[];
      });

    if (this.authenticationService.currentUser) {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
      this.service.getPendingApprovals();
      this.cDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    }
    if (this.currentUser) {
      this.pageservice.getPagesDetail(this.currentUser.id);
    }
  }

  logout() {
    this.authenticationService.logout();
    this.route.navigate(["/login"]);
  }

  getdays(currentdate, actiondate) {
    this.days = Math.abs(moment(actiondate).diff(moment(currentdate), "days"));
    return this.days;
  }

  opendetail(id, loginid) {
    this.service.id = id;
    this.service.userid = loginid;
    this.route.navigate(["/pending-task-detail"]);
  }
}
