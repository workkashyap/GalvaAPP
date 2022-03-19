import { Component, OnInit } from "@angular/core";
import { LoginService } from "../shared/login/login.service";
import { User } from "../shared/login/User.model";
import { QualityService } from "../shared/quality/quality.service";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { InboxService } from "../shared/inbox/inbox.service";
import { ToastrService } from "ngx-toastr";
import { Quality } from "../shared/quality/quality.model";

@Component({
  selector: 'app-qualityview',
  templateUrl: './qualityview.component.html',
  styleUrls: ['./qualityview.component.css'],
  providers: [DatePipe]
})
export class QualityviewComponent implements OnInit {

  public cDate: string;
  public currentUser: User;
  public loading = false;

  selectedQuality: Quality;
  cols: any;

  constructor(
    private toastr: ToastrService,
    public lservice: LoginService,
    public qualityservice: QualityService,
    public iservice: InboxService,
    private route: Router
  ) { }

  ngOnInit() {
    const me = this;
    this.loading = true;
    this.cols = [
      { field: "view", header: "Action" },
      { field: 'itemcode', header: 'Itemcode' },
      { field: "plantcode", header: "Plant" },
      { field: "size", header: "Size" },
      { field: "itemname", header: "Itemname" },
      { field: "orderType", header: "Itemtype" },
      { field: "inspQty", header: "Insp Qty" },
      { field: "okqty", header: "Ok Quantity" },
      { field: "totRejValue", header: "Total Rej Value " },
    ];
    this.qualityservice.getallData();
    this.loading = false;
  }

  opendetail(id) {
    this.qualityservice.id = id;
    this.route.navigate(["/qualitymst"]);
  }

  addNewMaterial() {
    this.qualityservice.id = 0;
    this.route.navigate(["./qualitymst"]);
  }

}

