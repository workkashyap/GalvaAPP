import { Component, OnInit } from "@angular/core";
import { LoginService } from "../shared/login/login.service";
import { User } from "../shared/login/User.model";
import { ProductionsService } from "../shared/productions/productions.service";
import { Productions } from "../shared/productions/productions.model";

import * as moment from "moment";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { InboxService } from "../shared/inbox/inbox.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-productions",
  templateUrl: "./productions.component.html",
  styleUrls: ["./productions.component.css"],
  providers: [DatePipe]
})
export class ProductionsComponent implements OnInit {
  public cDate: string;
  public currentUser: User;
  public loading = false;
  cpage: number;
  jobworkMlist: any[];
  cols: any = [];
  selectedItemrej: Productions;

  constructor(
    private toastr: ToastrService,
    public lservice: LoginService,
    private datePipe: DatePipe,
    public productionsService: ProductionsService,
    public iservice: InboxService,
    private route: Router
  ) {

  }

  ngOnInit() {
    const me = this;
    this.cols = [
      { field: "view", header: "Action" },
      //  { field: 'id', header: 'ID' },
      { field: "insplot", header: "insplot" },
      { field: "orderno", header: "orderno" },
      { field: "roundno", header: "roundno" },
      { field: "qty", header: "qty" },
      { field: "plantcode", header: "plantcode" },
      { field: "shift", header: "shift" },
      { field: "itemcode", header: "itemcode" },
      { field: "itemname", header: "itemname" },
      { field: "size", header: "size" },

      { field: "type", header: "type" },
      { field: "okqty", header: "okqty" },
      { field: "holdqty", header: "holdqty" },

      { field: 'buffingqty', header: 'buffingqty' },
      { field: 'rejectionqty', header: 'rejectionqty' },

      { field: "pitting", header: "pitting" },
      { field: "pinhole", header: "pinhole" },
      { field: "patchmark", header: "patchmark" },
      { field: "nickle", header: "nickle" },
    ];
    this.getDetail();
  }
  getDetail() {
    this.loading = true;
    this.productionsService.productionlist = [];
    this.productionsService.productions().toPromise().then(res => {
      this.productionsService.productionlist = res as Productions[];
      this.loading = false;
    });
  }
  opendetail(id) {
    this.productionsService.id = id;
    // this.iservice.uid = this.currentUser.id;
    this.route.navigate(["/addproduction"]);
  }
  addNewMaterial() {
    this.productionsService.id = 0;
    // this.iservice.uid = this.currentUser.id;
    this.route.navigate(["./addproduction"]);
  }
}
