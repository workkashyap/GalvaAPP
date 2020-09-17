import { Component, OnInit } from "@angular/core";
import { LoginService } from "../shared/login/login.service";
import { User } from "../shared/login/User.model";

import { DatePipe } from "@angular/common";
import { ItemmstsService } from "../shared/itemmsts/itemmsts.service";
import { Router } from "@angular/router";
import { InboxService } from "../shared/inbox/inbox.service";
import { ToastrService } from "ngx-toastr";
import { itemmsts } from '../shared/itemmsts/itemmsts.model';

@Component({
  selector: "app-itemmsts",
  templateUrl: "./itemmsts.component.html",
  styleUrls: ["./itemmsts.component.css"],
  providers: [DatePipe]
})
export class ItemmstsComponent implements OnInit {
  public cDate: string;
  public currentUser: User;
  public loading = false;

  selectedItemrej: itemmsts;

  id: number;
  itemmstslist: any[];
  cols: any;
  constructor(
    private toastr: ToastrService,
    public lservice: LoginService,
    public itmService: ItemmstsService,
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
      { field: 'itemcode', header: 'Itemcode' },
      { field: "plant", header: "Plant" },
      { field: "ctype", header: "Ctype" },
      { field: "itemname", header: "Itemname" },
      { field: "itemtype", header: "Itemtype" },
      { field: "price", header: "Price" },
    ];
    this.itmService.getallData();
    this.loading = false;
  }

  opendetail(id) {
    this.itmService.id = id;
    // this.iservice.uid = this.currentUser.id;
    this.route.navigate(["/newItm"]);
  }

  addNewMaterial() {
    // this.iservice.uid = this.currentUser.id;
    this.itmService.id = 0;
    this.route.navigate(["./newItm"]);
  }

  deleteSelected(id) {
    this.itmService.id = id;
    this.loading = true;
    this.itmService.deleteItem(id).subscribe(
      res => {
        this.toastr.success(
          "Successfully Deleted Record.",
          "Item Data"
        );
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    );
    this.loading = false;
  }
}
