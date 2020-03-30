import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { JobworkmaterialService } from "src/app/shared/jobworkmaterial/jobworkmaterial.service";
import { InboxService } from "src/app/shared/inbox/inbox.service";
import { LoginService } from "src/app/shared/login/login.service";
import { User } from "src/app/shared/login/User.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-new-jobwm",
  templateUrl: "./new-jobwm.component.html",
  styleUrls: ["./new-jobwm.component.css"],
  providers: [DatePipe]
})
export class NewJobwmComponent implements OnInit {
  public currentUser: User;
  public cDate: string;
  public actionvalue: string;
  public rateINR: number;
  public loading = false;

  constructor(
    private toastr: ToastrService,
    private route: Router,
    private datePipe: DatePipe,
    public jobService: JobworkmaterialService,
    public iservice: InboxService,
    public lservice: LoginService
  ) {}

  ngOnInit() {
    this.cDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }
    this.jobService.jobworkMData = {
      id: 0,
      materialNumber: 0,
      materialDesc: "",
      rateINR: 0.0
    };
  }
  onComplete(form: NgForm) {
    if (this.actionvalue === "Save") {
      this.loading = true;
      this.jobService.insertJobWorkMaterial().subscribe(
        res => {
          this.resetForm(form);
          this.toastr.success(
            "Successfully Saved Record.",
            "Job Work Material Data"
          );
          this.route.navigate(["./jobWorkMaterial"]);
          // this.ngOnInit();
          // this.service.refreshList();
        },
        err => {
          console.log(err);
        }
      );
      this.loading = false;
    } else {
      this.backtoJobWorkMaterial();
    }
  }

  onSaveClick() {
    this.actionvalue = "Save";
  }
  onCancelClick() {
    this.actionvalue = "Cancel";
  }
  backtoJobWorkMaterial() {
    this.iservice.uid = this.currentUser.id;
    this.route.navigate(["./jobWorkMaterial"]);
  }
}
