import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { JobworkmaterialService } from "src/app/shared/jobworkmaterial/jobworkmaterial.service";
import { InboxService } from "src/app/shared/inbox/inbox.service";
import { LoginService } from "src/app/shared/login/login.service";
import { User } from "src/app/shared/login/User.model";
import { NgForm } from "@angular/forms";
import { HrbillsService } from 'src/app/shared/hrbills/hrbills.service';
import { merge } from "rxjs-compat/operator/merge";

@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.css'],
  providers: [DatePipe]
})
export class NewBillComponent implements OnInit {

  public currentUser: User;
  public cDate: string;
  public actionvalue: string;
  public loading = false;

  constructor(
    private toastr: ToastrService,
    private route: Router,
    private datePipe: DatePipe,
    public hrbillsService: HrbillsService,
    public iservice: InboxService,
    public lservice: LoginService
  ) { }

  ngOnInit() {
    this.cDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    const cDate = this.datePipe.transform(new Date(), "ddMMyyyy");
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    const me = this;
    if (form != null) {
      form.form.reset();
    }
    if (me.hrbillsService.id) {
      me.hrbillsService.getDataById(me.hrbillsService.id)
        .toPromise()
        .then((res: any) => {
          this.hrbillsService.hrbillsData = res; //as Hrbills[];
          this.hrbillsService.hrbillsData.createddate = this.datePipe.transform(this.hrbillsService.hrbillsData.createddate, "yyyy-MM-dd");
        });

    } else {
      me.hrbillsService.hrbillsData = {
        id: 0,
        monthyear: "2021-01",
        contractor: " ",
        basic: 0,
        hra: 0,
        conveyence: 0,
        supervicercharge: 0,
        adcharge1: 0,
        adcharge2: 0,
        adcharge3: 0,
        total: 0,
        pftot: 0,
        gsttot: 0,
        nettotal: 0,
        createddate: me.cDate
      };
    }
  }
  onComplete(form: NgForm) {
    if (this.actionvalue === "Save") {
      this.loading = true;
      if (this.hrbillsService.hrbillsData.id > 0) {

        this.hrbillsService.updatebill(this.hrbillsService.hrbillsData.id).subscribe(
          res => {
            this.resetForm(form);
            this.toastr.success(
              "Successfully Saved Record.",
              "Item Data"
            );
            this.route.navigate(["./hrbills"]);
            // this.ngOnInit();
            // this.service.refreshList();
          },
          err => {
            console.log(err);
          }
        );
      } else {
        this.hrbillsService.insertbill().subscribe(
          res => {
            this.resetForm(form);
            this.toastr.success(
              "Successfully  Record Updated.",
              "Item Data"
            );
            this.route.navigate(["./hrbills"]);
            // this.ngOnInit();
            // this.service.refreshList();
          },
          err => {
            console.log(err);
          }
        );

      }
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
    this.route.navigate(["./hrbills"]);
  }

}
