import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { JobworkmaterialService } from "src/app/shared/jobworkmaterial/jobworkmaterial.service";
import { InboxService } from "src/app/shared/inbox/inbox.service";
import { LoginService } from "src/app/shared/login/login.service";
import { User } from "src/app/shared/login/User.model";
import { NgForm } from "@angular/forms";
import { ItemmstsService } from 'src/app/shared/itemmsts/itemmsts.service';

@Component({
  selector: "app-new-itm",
  templateUrl: "./new-itm.component.html",
  styleUrls: ["./new-itm.component.css"],
  providers: [DatePipe]
})
export class NewItmComponent implements OnInit {
  public currentUser: User;
  public cDate: string;
  public actionvalue: string;
  public rateINR: number;
  public loading = false;

  constructor(
    private toastr: ToastrService,
    private route: Router,
    private datePipe: DatePipe,
    public itmService: ItemmstsService,
    public iservice: InboxService,
    public lservice: LoginService
  ) { }

  ngOnInit() {
    this.cDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    const me = this;
    if (form != null) {
      form.form.reset();
    }
    if (this.itmService.id) {
      me.itmService.getDataById(me.itmService.id)
        .toPromise()
        .then((res: any) => {
          this.itmService.itemmstsData = res; //as Productions[];
        });

    } else {
      this.itmService.itemmstsData = {
        id: 0,
        itemcode: 0,
        plant: 0,
        ctype: "",
        itemtype: "",
        itemname: "",
        price: 0,
      };
    }
  }
  onComplete(form: NgForm) {
    if (this.actionvalue === "Save") {
      this.loading = true;
      if (this.itmService.itemmstsData.id > 0) {

        this.itmService.updateItm(this.itmService.itemmstsData.id).subscribe(
          res => {
            this.resetForm(form);
            this.toastr.success(
              "Successfully Saved Record.",
              "Item Data"
            );
            this.route.navigate(["./itemmsts"]);
            // this.ngOnInit();
            // this.service.refreshList();
          },
          err => {
            console.log(err);
          }
        );
      } else {
        this.itmService.insertItm().subscribe(
          res => {
            this.resetForm(form);
            this.toastr.success(
              "Successfully  Record Updated.",
              "Item Data"
            );
            this.route.navigate(["./itemmsts"]);
            // this.ngOnInit();
            // this.service.refreshList();
          },
          err => {
            console.log(err);
          }
        );

      }
      this.loading = false;
    } else {
      this.backtoJobWorkMaterial();
    }
  }

  onSaveClick() {
    this.actionvalue = "Save";
  }
  onCancelClick() {
    this.actionvalue = "Cancel";
  }
  backtoJobWorkMaterial() {
    this.iservice.uid = this.currentUser.id;
    this.route.navigate(["./itemmsts"]);
  }
}
