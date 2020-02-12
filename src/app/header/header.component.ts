import { Component, OnInit } from "@angular/core";
import { User } from "../shared/login/User.model";
import { Router } from "@angular/router";
import { LoginService } from "../shared/login/login.service";
import { ActionplanService } from "../shared/inbox/actionplan.service";
import * as moment from "moment";
import { DatePipe } from "@angular/common";
import { InboxService } from "../shared/inbox/inbox.service";
import { PagesService } from "../shared/pages/pages.service";

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

  constructor(
    private router: Router,
    private authenticationService: LoginService,
    public service: ActionplanService,
    public iservice: InboxService,
    public pageservice: PagesService,
    private route: Router,
    private datePipe: DatePipe
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  ngOnInit() {
    if (this.authenticationService.currentUser) {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
      this.service.getPendingApprovals();
      this.cDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    }
    this.pageservice.getPagesDetail();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
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
