import { Component, OnInit } from "@angular/core";
import { LoginService } from "../shared/login/login.service";
import { User } from "../shared/login/User.model";

import * as moment from "moment";
import { DatePipe } from "@angular/common";
import { JobworkmaterialService } from "../shared/jobworkmaterial/jobworkmaterial.service";
import { jobworkmaterial } from "../shared/jobworkmaterial/jobworkmaterial.model";
import { Router } from "@angular/router";
import { InboxService } from "../shared/inbox/inbox.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-jobworkmaterial",
  templateUrl: "./jobworkmaterial.component.html",
  styleUrls: ["./jobworkmaterial.component.css"],
  providers: [DatePipe]
})
export class JobworkmaterialComponent implements OnInit {
  public cDate: string;
  public currentUser: User;
  public loading = false;
  cpage: number;
  jobworkMlist: any[];

  constructor(
    private toastr: ToastrService,
    public lservice: LoginService,
    private datePipe: DatePipe,
    public jobService: JobworkmaterialService,
    public iservice: InboxService,
    private route: Router
  ) {
    // this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    // this.cDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  }

  ngOnInit() {
    const me = this;
    this.loading = true;

    this.jobService.Getjobworkmaterial();
    this.loading = false;
  }

  opendetail(id) {
    this.jobService.jobid = id;
    // this.iservice.uid = this.currentUser.id;
    this.route.navigate(["/jobworkmaterial-detail"]);
  }

  addNewMaterial() {
    // this.iservice.uid = this.currentUser.id;
    this.route.navigate(["./new-jobworkmaterial"]);
  }

  deleteSelected(id) {
    this.jobService.jobid = id;
    this.loading = true;
    this.jobService.deletejobworkbyid(id).subscribe(
      res => {
        // this.resetForm(form);
        this.toastr.success(
          "Successfully Deleted Record.",
          "Job Work Material Data"
        );
        this.route.navigate(["./jobWorkMaterial"]);
        this.ngOnInit();
        // this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    );
    this.loading = false;
  }
}
