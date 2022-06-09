import { Component, OnInit } from "@angular/core";
import { LoginService } from "../shared/login/login.service";
import { User } from "../shared/login/User.model";
import { CaputilsService } from '../shared/caputils/caputils.service';
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { InboxService } from "../shared/inbox/inbox.service";

@Component({
  selector: 'app-caputilsview',
  templateUrl: './caputilsview.component.html',
  styleUrls: ['./caputilsview.component.css'],
  providers: [DatePipe]
})
export class CaputilsviewComponent implements OnInit {

  public currentUser: User;
  public loading = false;

  selectedCaputils: CaputilsService;
  cols: any;
  
  constructor(
    public lservice: LoginService,
    public caputilsservice: CaputilsService,
    public iservice: InboxService,
    private route: Router
  ) { }

  ngOnInit() {
    const me = this;
    this.loading = true;
    this.cols = [
      { field: "view", header: "Action" },
      { field: "entrydate", header: "Entry Date" },
      { field: "plantcode", header: "Plant" },
      { field: "linetype", header: "Line Type" },
      { field: "plantround", header: "Plan Round" },

    ];
    this.caputilsservice.getallData();
    this.loading = false;
  }

  opendetail(id) {
    this.caputilsservice.id = id;
    this.route.navigate(["/caputils"]);
  }

  addNewMaterial() {
    this.caputilsservice.id = 0;
    this.route.navigate(["./caputils"]);
  }

}
