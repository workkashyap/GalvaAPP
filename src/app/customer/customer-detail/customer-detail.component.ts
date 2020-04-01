import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { User } from "src/app/shared/login/User.model";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { CustomerMasterService } from "src/app/shared/customer/customer-master.service";
import { InboxService } from "src/app/shared/inbox/inbox.service";
import { LoginService } from "src/app/shared/login/login.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-customer-detail",
  templateUrl: "./customer-detail.component.html",
  styleUrls: ["./customer-detail.component.css"],
  providers: [DatePipe]
})
export class CustomerDetailComponent implements OnInit {
  public currentUser: User;
  public cDate: string;
  public actionvalue: string;
  public rateINR: number;
  public loading = false;

  constructor(
    private toastr: ToastrService,
    private route: Router,
    private datePipe: DatePipe,
    public custService: CustomerMasterService,
    public iservice: InboxService,
    public lservice: LoginService
  ) {}

  ngOnInit() {
    this.cDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.resetForm();
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    this.custService.getCustomersbyid(this.custService.custid);
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }
    this.custService.custData = {
      id: this.custService.custid,
      customer: 0,
      customerName: ""
    };
  }

  onComplete(form: NgForm) {
    if (this.actionvalue === "Save") {
      this.loading = true;
      this.custService.putCustomer().subscribe(
        res => {
          this.resetForm(form);
          this.toastr.success("Successfully Updated Record.", "Customer Data");
          this.route.navigate(["./Customer"]);
          this.ngOnInit();
          // this.service.refreshList();
        },
        err => {
          console.log(err);
        }
      );
      this.loading = false;
    } else {
      this.backtoCustomer();
    }
  }

  onSaveClick() {
    this.actionvalue = "Save";
  }

  backtoCustomer() {
    this.iservice.uid = this.currentUser.id;
    this.route.navigate(["./Customer"]);
  }
}
