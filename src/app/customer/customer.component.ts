import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { User } from "../shared/login/User.model";
import { ToastrService } from "ngx-toastr";
import { LoginService } from "../shared/login/login.service";
import { InboxService } from "../shared/inbox/inbox.service";
import { Router } from "@angular/router";
import { CustomerMasterService } from "../shared/customer/customer-master.service";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"],
  providers: [DatePipe]
})
export class CustomerComponent implements OnInit {
  public cDate: string;
  public currentUser: User;
  public loading = false;
  jobworkMlist: any[];
  cpage: number;

  constructor(
    private toastr: ToastrService,
    public lservice: LoginService,
    private datePipe: DatePipe,
    public custService: CustomerMasterService,
    public iservice: InboxService,
    private route: Router
  ) {}

  ngOnInit() {
    const me = this;
    this.loading = true;

    this.custService.getCustomerList();
    this.loading = false;
  }

  opendetail(id) {
    this.custService.custid = id;
    // this.iservice.uid = this.currentUser.id;
    this.route.navigate(["/Customer-detail"]);
  }
  addNewCustomer() {
    // this.iservice.uid = this.currentUser.id;
    this.route.navigate(["/new-Customer"]);
  }

  deleteSelected(id) {
    this.custService.custid = id;
    this.loading = true;
    this.custService.deleteCustomerbyid(id).subscribe(
      res => {
        // this.resetForm(form);
        this.toastr.success("Successfully Deleted Record.", "Customer Data");
        this.route.navigate(["./Customer"]);
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
