import { Component, OnInit } from '@angular/core';
import { LoginService } from "../shared/login/login.service";
import { User } from "../shared/login/User.model";
import { DatePipe } from "@angular/common";
import { HrbillsService } from "../shared/hrbills/hrbills.service";
import { Router } from "@angular/router";
import { InboxService } from "../shared/inbox/inbox.service";
import { ToastrService } from "ngx-toastr";
import { hrbills } from '../shared/hrbills/hrbills.model';

@Component({
  selector: 'app-hrbills',
  templateUrl: './hrbills.component.html',
  styleUrls: ['./hrbills.component.css'],
  providers: [DatePipe]
})
export class HrbillsComponent implements OnInit {
  public cDate: string;
  public currentUser: User;
  public loading = false;

  selectedhrbill: hrbills;

  id: number;
  hrbillslist: any[];
  cols: any;
  constructor(
    private toastr: ToastrService,
    public lservice: LoginService,
    public hrbillsService: HrbillsService,
    public iservice: InboxService,
    private route: Router
  ) {
    // this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    // this.cDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  }

  ngOnInit() {
    const me = this;
    this.loading = true;
    this.cols = [
      { field: "view", header: "Action" },
      { field: 'id', header: 'ID' },
      { field: "monthyear", header: "Month-Year" },
      { field: "contractor", header: "Contractor" },
      { field: "basic", header: "Basic" },
      { field: "hra", header: "HRA" },
      { field: "conveyence", header: "Conveyance" },
      { field: "supervicercharge", header: "Supervisor Charges" },
      { field: "adcharge1", header: "Additional Charges 1" },
      { field: "adcharge2", header: "Additional Charges 2" },
      { field: "adcharge3", header: "Additional Charges 3" },
      { field: "total", header: "Total" },
      { field: "pftot", header: "PF Total" },
      { field: "gsttot", header: "Gst Total" },
      { field: "nettotal", header: "Net Total" },
      { field: "createddate", header: "Date Created" },
    ];
    this.hrbillsService.getallData();
    this.loading = false;
  }

  opendetail(id) {
    this.hrbillsService.id = id;
    // this.iservice.uid = this.currentUser.id;
    this.route.navigate(["/newBill"]);
  }

  addNewMaterial() {
    // this.iservice.uid = this.currentUser.id;
    this.hrbillsService.id = 0;
    this.route.navigate(["./newBill"]);
  }

}