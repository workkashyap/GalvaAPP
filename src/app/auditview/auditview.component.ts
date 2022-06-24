import { Component, OnInit } from "@angular/core";
import { LoginService } from "../shared/login/login.service";
import { User } from "../shared/login/User.model";
import { AuditService } from '../shared/audit/audit.service';
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { InboxService } from "../shared/inbox/inbox.service";
import { ToastrService } from "ngx-toastr";
import { Audit } from '../shared/audit/audit.model';

@Component({
  selector: 'app-auditview',
  templateUrl: './auditview.component.html',
  styleUrls: ['./auditview.component.css'],
  providers: [DatePipe]
})
export class AuditviewComponent implements OnInit {

  public cDate: string;
  public currentUser: User;
  public loading = false;

  selectedAudit: AuditService;
  cols: any;

  getColor(result){
    switch (result) {
      case 5:
        return 'green';
      case 3:
        return 'yellow';
      case 0:
        return 'red';
    }

  }

  constructor(
    private toastr: ToastrService,
    public lservice: LoginService,
    public auditservice: AuditService,
    public iservice: InboxService,
    private route: Router
  ) { }

  ngOnInit() {
    const me = this;
    this.loading = true;
    this.cols = [
      { field: "view", header: "Action" },
      { field: "audit_date", header: "Audit Date" },
      { field: "plantcode", header: "Plant" },
      { field: "customer", header: "Customer" },
      { field: "result", header: "Result" },
    ];
    this.auditservice.getallData();
    console.log(this.auditservice.auditList);
    this.loading = false;
  }

  opendetail(id) {
    this.auditservice.id = id;
    this.route.navigate(["/audit"]);
  }

  addNewMaterial() {
    this.auditservice.id = 0;
    this.route.navigate(["./audit"]);
  }

}
