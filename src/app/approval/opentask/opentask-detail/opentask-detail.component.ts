import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { User } from "src/app/shared/login/User.model";
import { ActionplanService } from "src/app/shared/inbox/actionplan.service";
import { ToastrService } from "ngx-toastr";
import { LoginService } from "src/app/shared/login/login.service";
import { InboxService } from "src/app/shared/inbox/inbox.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-opentask-detail",
  templateUrl: "./opentask-detail.component.html",
  styleUrls: ["./opentask-detail.component.css"],
  providers: [DatePipe]
})
export class OpentaskDetailComponent implements OnInit {
  public currentUser: User;
  public actionvalue: string;
  public cDate: string;
  public newactiondate: string;
  public loading = false;

  constructor(
    public service: ActionplanService,
    private toastr: ToastrService,
    public lservice: LoginService,
    public iservice: InboxService,
    private route: Router,
    private datePipe: DatePipe
  ) {}
  backtoopentask() {
    this.iservice.uid = this.currentUser.id;
    this.route.navigate(["./open-task"]);
  }
  ngOnInit() {
    this.loading = true;
    this.cDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.resetForm();
    console.log(this.iservice.uid);
    console.log(this.service.id);
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    this.service.getTaskDetailbyid(this.service.id);
    this.loading = false;
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
