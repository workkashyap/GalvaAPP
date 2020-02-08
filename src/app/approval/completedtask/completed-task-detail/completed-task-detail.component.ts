import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { User } from "src/app/shared/login/User.model";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { InboxService } from "src/app/shared/inbox/inbox.service";
import { LoginService } from "src/app/shared/login/login.service";
import { ToastrService } from "ngx-toastr";
import { ActionplanService } from "src/app/shared/inbox/actionplan.service";

@Component({
  selector: "app-completed-task-detail",
  templateUrl: "./completed-task-detail.component.html",
  styleUrls: ["./completed-task-detail.component.css"],
  providers: [DatePipe]
})
export class CompletedTaskDetailComponent implements OnInit {
  public currentUser: User;
  public actionvalue: string;
  public cDate: string;
  public newactiondate: string;

  constructor(
    public service: ActionplanService,
    private toastr: ToastrService,
    public lservice: LoginService,
    public iservice: InboxService,
    private route: Router,
    private datePipe: DatePipe
  ) {}

  backtocompletedtask() {
    this.iservice.uid = this.currentUser.id;
    this.route.navigate(["./completed-task"]);
  }
  ngOnInit() {
    this.cDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.resetForm();
    console.log(this.iservice.uid);
    console.log(this.service.id);
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    this.service.getTaskDetailbyid(this.service.id);
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }
    this.service.taskdata = {
      id: this.service.id,
      description: "",
      messageid: 0,
      loginid: 0,
      actiondate: "",
      createddate: "",
      closedate: "",
      isopen: "2",
      resolvedesc: ""
    };
  }
}
