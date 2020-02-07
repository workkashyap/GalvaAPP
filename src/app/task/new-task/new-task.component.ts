import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NgForm } from "@angular/forms";
import { ActionplanService } from "src/app/shared/inbox/actionplan.service";
import { InboxService } from "src/app/shared/inbox/inbox.service";
import { DatePipe } from "@angular/common";
import { User } from "src/app/shared/login/User.model";
import { LoginService } from "src/app/shared/login/login.service";
import { UserService } from "src/app/shared/user/user.service";

@Component({
  selector: "app-new-task",
  templateUrl: "./new-task.component.html",
  styleUrls: ["./new-task.component.css"],
  providers: [DatePipe]
})
export class NewTaskComponent implements OnInit {
  public cDate: string;
  currentUser: User;

  constructor(
    public toastr: ToastrService,
    public acservice: ActionplanService,
    public route: Router,
    public lservice: LoginService,
    public iservice: InboxService,
    public datePipe: DatePipe,
    public uservice: UserService
  ) {}

  ngOnInit() {
    this.resetForm();
    this.cDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.acservice.actionplanData.createddate = this.cDate;
    console.log(this.acservice.actionplanData.createddate);
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    this.uservice.getuserbyid(this.currentUser.id);
    console.log(this.currentUser.id);
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }
    this.acservice.actionplanData = {
      id: 0,
      description: "",
      messageid: 0,
      loginid: 0,
      actiondate: "",
      createddate: this.cDate,
      closedate: '',
      isopen: "1",
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

  setPlan(value) {
    //if you're on older versions of ES, use for-in instead
    var plan = this.uservice.userlist.find(p => (p.id = value));

    if (plan) {
      this.acservice.actionplanData.loginid = Number(plan.id);
      console.log(this.acservice.actionplanData.loginid);
    }
  }
}
