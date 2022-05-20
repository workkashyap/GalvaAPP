import { Component, OnInit } from "@angular/core";
import { LoginService } from "../shared/login/login.service";
import { User } from "../shared/login/User.model";
import { RejectionreviewService } from '../shared/rejectionreview/rejectionreview.service';
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { InboxService } from "../shared/inbox/inbox.service";
import { ToastrService } from "ngx-toastr";
import { Rejectionreview } from '../shared/rejectionreview/rejectionreview.model';

@Component({
  selector: 'app-rejectionreviewview',
  templateUrl: './rejectionreviewview.component.html',
  styleUrls: ['./rejectionreviewview.component.css'],
  providers: [DatePipe]
})
export class RejectionreviewviewComponent implements OnInit {

  public cDate: string;
  public currentUser: User;
  public loading = false;

  selectedRejectionreview: Rejectionreview;
  cols: any;

  constructor(
    private toastr: ToastrService,
    public lservice: LoginService,
    public rejectionreviewservice: RejectionreviewService,
    public iservice: InboxService,
    private route: Router
  ) { }

  ngOnInit() {
    const me = this;
    this.loading = true;
    this.cols = [
      { field: "view", header: "Action" },
      { field: "reviewdate", header: "Review Date" },
      { field: "plant", header: "Plant" },
      { field: "reasonForReview", header: "Reason For Review" },
      { field: "materialName", header: "Material Name" },
      { field: "materialCode", header: "Material Code" },
      { field: "inspectedParts", header: "Inspected Parts" },
      { field: "okParts", header: "Ok Parts" },
      { field: "sellPrice", header: "Sell Price" },
      { field: "inspectValue", header: "Inspect Name" },
      { field: "okValue", header: "Ok Value" },
      { field: "rejectValue", header: "Reject Value" },
    ];
    this.rejectionreviewservice.getallData();
    this.loading = false;
  }

  opendetail(id) {
    this.rejectionreviewservice.id = id;
    this.route.navigate(["/rejectionreview"]);
  }

  addNewMaterial() {
    this.rejectionreviewservice.id = 0;
    this.route.navigate(["./rejectionreview"]);
  }

}
