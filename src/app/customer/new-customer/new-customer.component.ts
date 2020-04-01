import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { User } from "src/app/shared/login/User.model";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { CustomerMasterService } from "src/app/shared/customer/customer-master.service";
import { InboxService } from "src/app/shared/inbox/inbox.service";
import { LoginService } from "src/app/shared/login/login.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-new-customer",
  templateUrl: "./new-customer.component.html",
  styleUrls: ["./new-customer.component.css"],
  providers: [DatePipe]
})
export class NewCustomerComponent implements OnInit {
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
      this.custService.postCustomer().subscribe(
        res => {
          this.resetForm(form);
          this.toastr.success("Successfully Saved Record.", "Customer Data");
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
