import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { ProductionsService } from "src/app/shared/productions/productions.service";
import { InboxService } from "src/app/shared/inbox/inbox.service";
import { LoginService } from "src/app/shared/login/login.service";
import { User } from "src/app/shared/login/User.model";
import { NgForm } from "@angular/forms";
import { PlantService } from 'src/app/shared/plant/plant.service';
import { Plant } from 'src/app/shared/plant/plant.model';

@Component({
  selector: "app-addproduction",
  templateUrl: "./addproduction.component.html",
  styleUrls: ["./addproduction.component.css"],
  providers: [DatePipe]
})
export class AddproductionComponent implements OnInit {
  public currentUser: User;
  public date: string;
  public actionvalue: string;
  public rateINR: number;
  public loading = false;
  public selectedcode: any;
  constructor(
    private toastr: ToastrService,
    private route: Router,
    private datePipe: DatePipe,
    public productionsService: ProductionsService,
    public iservice: InboxService,
    public plantservice: PlantService,

    public lservice: LoginService
  ) {
    const me = this;
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
  }

  ngOnInit() {
    const me = this;
    this.date = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    console.log("cDate", this.date);

    this.plantservice
      .sgetPlantData(me.currentUser.id)
      .toPromise()
      .then(res => {
        me.plantservice.splantlist = res as Plant[];
        console.log("splantlist", me.plantservice.splantlist);
        me.selectedcode = me.plantservice.splantlist[0].plantcode;

        if (me.productionsService.id) {
          me.productionsService.productionbyid(me.productionsService.id);
        } else {
          me.productionsService.productionData = {
            id: 0,
            insplot: 0,
            orderno: 0,
            roundno: "",
            qty: "",
            plantcode: me.selectedcode,
            shift: "",
            itemcode: "",
            itemname: "",
            size: "",
            type: "",
            okqty: 0,
            holdqty: 0,
            buffingqty: 0,
            rejectionqty: 0,
            pitting: 0,
            pinhole: 0,
            patchmark: 0,
            nickle: 0,
            crburning: 0,
            skipplating: 0,
            dent: 0,
            handmouldingrej: 0,
            scratchmark: 0,
            roughness: 0,
            silver: 0,
            mouldingrej: 0,
            warpage: 0,
            copperburning: 0,
            whitemark: 0,
            dotplastic: 0,
            watermark: 0,
            blister: 0,
            jigdamage: 0,
            otheR1: 0,
            otheR2: 0,
            otheR3: 0,
            otheR4: 0,
            mandt: "0",
            stprs: 0,
            createddate: me.date,
            pstngdate: me.date,
            plating: 0,
            moulding: 0,
            mechfail: 0,
            tooldef: 0,
            others: 0,
            shadevar: 0,
            platingpeel: 0,
            flowmark: 0,
            chemicalmark: 0,
            tottooldef: 0,
            totothers: 0,
          };
        }
      });


    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }
  }
  onComplete(form: NgForm) {
    //console.log("form", this.productionsService.productionData);
    if (this.actionvalue === "Save") {
      this.loading = true;

      this.productionsService.productionData.createddate = this.datePipe.transform(this.productionsService.productionData.createddate, "yyyy-MM-dd");

      if (this.productionsService.productionData.id > 0) {
        this.productionsService.updateProduction(this.productionsService.productionData.id).subscribe(res => {
          this.resetForm(form);
          this.toastr.success(
            "Successfully Updated.",
            "Production"
          );
          this.route.navigate(["./productions"]);
          // this.ngOnInit();
          // this.service.refreshList();
        }, err => {
          console.log(err);
        });
      } else {
        this.productionsService.productionData.createddate = this.datePipe.transform(this.date, "yyyy-MM-dd");

        console.log("Save", this.productionsService.productionData);
        this.productionsService.saveProduction().subscribe(res => {
          this.resetForm(form);
          this.toastr.success(
            "Successfully Saved.",
            "Production"
          );
          this.route.navigate(["./productions"]);
          // this.ngOnInit();
          // this.service.refreshList();
        }, err => {
          console.log(err);
        });
      }
      /*
       
       
       this.loading = false;*/
    } else {
      this.backtoProduction();
    }
  }

  onSaveClick() {
    this.actionvalue = "Save";
  }
  onCancelClick() {
    this.actionvalue = "Cancel";
  }
  backtoProduction() {
    this.iservice.uid = this.currentUser.id;
    this.route.navigate(["./productions"]);
  }
}
