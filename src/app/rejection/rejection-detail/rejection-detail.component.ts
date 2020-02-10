import { Component, OnInit } from "@angular/core";
import { User } from "src/app/shared/login/User.model";
import { Inbox } from "src/app/shared/inbox/inbox.model";
import { ActionplanService } from "src/app/shared/inbox/actionplan.service";
import { ToastrService } from "ngx-toastr";
import { LoginService } from "src/app/shared/login/login.service";
import { ActivatedRoute } from "@angular/router";
import { InboxService } from "src/app/shared/inbox/inbox.service";
import { DatePipe } from "@angular/common";
import { NgForm } from "@angular/forms";

import { Router } from "@angular/router";
import { DailyproductionService } from "src/app/shared/dailyProduction/dailyproduction.service";
import { UserService } from "src/app/shared/user/user.service";

@Component({
  selector: "app-rejection-detail",
  templateUrl: "./rejection-detail.component.html",
  styleUrls: ["./rejection-detail.component.css"],
  providers: [DatePipe]
})
export class RejectionDetailComponent implements OnInit {
  public currentUser: User;
  private loading = false;
  public inbox: Inbox;
  public cDate: string;
  public todayDate: Date;
  public login: string;

  constructor(
    public acservice: ActionplanService,
    private toastr: ToastrService,
    private lservice: LoginService,
    private route: ActivatedRoute,
    public service: InboxService,
    public uservice: UserService,
    public DPservice: DailyproductionService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    this.cDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  }

  ngOnInit() {
    this.resetForm();
    if (this.DPservice.id > 0) {
      this.service.messagebyid(this.DPservice.id);
    }
    this.acservice.actionplanData.messageid = this.DPservice.id;
    this.acservice.actionplanData.isopen = "1";
    this.cDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.acservice.actionplanData.createddate = this.cDate;
    this.acservice.actionplanData.closedate = null;
    this.uservice.getuserbyid(this.currentUser.id);

    console.log(this.service.uid);
    console.log(this.DPservice.id);
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }
    this.acservice.actionplanData = {
      id: 0,
      description: "",
      messageid: 0,
      loginid: Number(this.service.uid),
      actiondate: "",
      createddate: "",
      closedate: "",
      isopen: "",
      resolvedesc: ""
    };
  }
  OnSubmit(form: NgForm) {
    this.acservice.insertActionPlans().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success("Submitted Successfully", "Save ActionPlan");
        console.log("Saved successfully");
        // this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    );
    console.log(form.value);
  }
  backtoRejection() {
    //this.iservice.uid = this.currentUser.id;
    this.router.navigate(["./rejection"]);
  }
}
