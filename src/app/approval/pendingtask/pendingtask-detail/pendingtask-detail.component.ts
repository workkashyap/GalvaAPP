import { Component, OnInit } from "@angular/core";
import { ActionplanService } from "src/app/shared/inbox/actionplan.service";
import { LoginService } from "src/app/shared/login/login.service";
import { InboxService } from "src/app/shared/inbox/inbox.service";
import { Router } from "@angular/router";
import { User } from "src/app/shared/login/User.model";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-task-detail",
  templateUrl: "./pendingtask-detail.component.html",
  styleUrls: ["./pendingtask-detail.component.css"],
  providers: [DatePipe]
})
export class PendingtaskdetailComponent implements OnInit {
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

  backtotask() {
    this.route.navigate(["./task"]);
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

  onComplete(form: NgForm) {
    if (this.actionvalue === "Submit") {
      this.service.taskdata.isopen = "4";
      this.service.taskdata.closedate = this.cDate;
      this.service.putTaskData().subscribe(
        res => {
          this.resetForm(form);
          this.toastr.success("Completed", "Approved task");
          this.route.navigate(["./task-approve"]);
          // this.ngOnInit();
          // this.service.refreshList();
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.service.taskdata.isopen = "1";
      this.service.taskdata.actiondate = this.newactiondate;
      this.service.putTaskData().subscribe(
        res => {
          this.resetForm(form);
          this.toastr.warning("Reopen task", "Reopen task");
          this.route.navigate(["./task-approve"]);
          // this.ngOnInit();
          // this.service.refreshList();
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  onSubmitClick() {
    this.actionvalue = "Submit";
  }
  onReopenClick() {
    this.actionvalue = "Reopen";
  }
}
