import { Component, OnInit } from "@angular/core";
import { LoginService } from "../shared/login/login.service";
import { User } from "../shared/login/User.model";
import { AuditService } from '../shared/audit/audit.service';
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { InboxService } from "../shared/inbox/inbox.service";
import { ToastrService } from "ngx-toastr";
import { Audit } from '../shared/audit/audit.model';
import { Observable } from "rxjs";

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
  public monthname: string;
  public selectedcode: any;
  public year: string;
  public yearname: string;
  public plantcode: any;
  public date: string;
  public Month: string;
  public x: number;
  public isReadOnly: boolean;
  public green: number;
  public red: number;
  public yellow: number;
  public index: string;
  public actionvalue: string;
  public avgPer: any;
  public validQtyError = false;

  public monthNames: any;
  public d: any;

  selectedAudit: AuditService;
  cols: any;
  rowData: Observable<Audit[]>;

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

  async ngOnInit() {
    const me = this;
    this.loading = true;
    this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    this.plantcode = 1010
    this.d = new Date();
    this.monthname = this.monthNames[this.d.getMonth()];
    this.yearname = this.d.getFullYear();
    this.x = this.monthNames.indexOf(this.monthname) + 1;
    this.index = this.x.toString();
    this.cols = [
      { field: "view", header: "Action" },
      { field: "audit_date", header: "Audit Date" },
      { field: "plantcode", header: "Plant" },
      { field: "customer", header: "Customer" },
      { field: "result", header: "Result" },
    ];
    await this.auditservice.getallData(this.yearname, this.index);
    this.getColorCount();
    this.loading = false;
  }

  opendetail(id) {
    this.auditservice.id = id;
    this.route.navigate(["/audit"]);
  }

  getColorCount(){
    this.green = 0;
    this.red = 0;
    this.yellow = 0;
    this.auditservice.auditList.forEach(element => {
      if(element.result === 0){
        this.red = this.red + 1;
        console.log("red " + this.red);
      }
      else if(element.result === 3){
        this.yellow = this.yellow + 1;
        console.log("yellow " + this.yellow);
      }
      else{
        this.green = this.green + 1;
        console.log("green " + this.green);
      }
    });
    console.log(this.green);
    console.log(this.yellow);
    console.log(this.red);
  }

  getAvgColor(){
    if(this.red > 0){
      return 'red';
    }
    else{
      if(this. green >= this.yellow){
        return 'green';
      }
      else {
        return 'yellow'
      }
    }
  }

  addNewMaterial() {
    this.auditservice.id = 0;
    this.route.navigate(["./audit"]);
  }

  async getselectedyear() {
    this.year = this.yearname;
    await this.auditservice.getallData(this.year, this.index);
    this.getColorCount();
  }

  async getselectedmonth() {
    this.Month = this.monthname;
    this.x = this.monthNames.indexOf(this.Month) + 1;
    this.index = this.x.toString();
    await this.auditservice.getallData(this.yearname, this.index);
    this.getColorCount();
  }
}
