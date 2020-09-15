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
  public validQtyError: boolean = false;
  public validRejQtyError: boolean = false;

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
        //me.plantservice.splantlist = res as Plant[];
        console.log("splantlist", me.plantservice.splantlist);
        me.plantservice.splantlist = [];
        const splantlist = res as Plant[];
        splantlist.forEach(splant => {
          if (splant.plantcode == "1040" || splant.plantcode == "1050") {
            me.plantservice.splantlist.push(splant);
            // me.selectedcode = ''//me.plantservice.splantlist[0].plantcode;
          }
        });

        me.selectedcode = me.plantservice.splantlist[0].plantcode;

        if (me.productionsService.id) {
          me.productionsService.productionbyid(me.productionsService.id);
        } else {
          me.productionsService.productionData = {
            id: 0,
            insplot: 0,
            orderno: 0,
            roundno: "",
            qty: "0",
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
            mandt: '',
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
  qtyChange(qty, row) {
    if (this.productionsService.id) {
      return;
    }
    console.log("qty : ", qty);
    var number = parseInt(qty);
    var n = 4;

    var values = [];
    while (number > 0 && n > 0) {
      var a = Math.floor(number / n);
      number -= a;
      n--;
      values.push(a);
    }  //
    if (values && values.length) {
      row.okqty = values[0];
      row.holdqty = values[1];
      row.buffingqty = values[2];
      row.rejectionqty = values[3];
      this.rejectQtyChange(row.rejectionqty, row);
    }
    console.log("values : ", values);
  }
  rejectQtyChange(qty, row) {
    if (this.productionsService.id) {
      return;
    }
    console.log("reject qty : ", qty);
    var number = parseInt(qty);
    var n = 35;

    var values = [];
    while (number > 0 && n > 0) {
      var a = Math.floor(number / n);
      number -= a;
      n--;
      values.push(a);
    }  //
    if (values && values.length) {
      row.pitting = values[0];
      row.pinhole = values[1];
      row.patchmark = values[2];
      row.nickle = values[3];
      row.crburning = values[4];
      row.skipplating = values[5];
      row.dent = values[6];
      row.handmouldingrej = values[7];
      row.scratchmark = values[8];
      row.roughness = values[9];
      row.silver = values[10];
      row.mouldingrej = values[11];
      row.warpage = values[12];
      row.copperburning = values[13];
      row.whitemark = values[14];
      row.dotplastic = values[15];
      row.watermark = values[16];
      row.blister = values[17];
      row.jigdamage = values[18];
      row.otheR1 = values[19];
      row.otheR2 = values[20];
      row.otheR3 = values[21];
      row.otheR4 = values[22];
      row.stprs = values[23];
      row.plating = values[24];
      row.moulding = values[25];
      row.mechfail = values[26];
      row.tooldef = values[27];
      row.others = values[28];
      row.shadevar = values[29];
      row.platingpeel = values[30];
      row.flowmark = values[31];
      row.chemicalmark = values[32];
      row.tottooldef = values[33];
      row.totothers = values[34];
    }
    console.log("values : ", values);
  }
  countQty() {
    const qty = this.productionsService.productionData.okqty + this.productionsService.productionData.holdqty + this.productionsService.productionData.rejectionqty + this.productionsService.productionData.buffingqty;
    //console.log(qty);
    ///console.log(parseInt(this.productionsService.productionData.qty));
    if (parseInt(this.productionsService.productionData.qty) == qty) {
      return false;
    } else {
      return true;
    }
  }
  countRejQty() {
    const qty = this.productionsService.productionData.pitting + this.productionsService.productionData.pinhole + this.productionsService.productionData.patchmark +
      this.productionsService.productionData.nickle + this.productionsService.productionData.crburning + this.productionsService.productionData.skipplating +
      this.productionsService.productionData.dent + this.productionsService.productionData.handmouldingrej + this.productionsService.productionData.scratchmark +
      this.productionsService.productionData.roughness + this.productionsService.productionData.silver + this.productionsService.productionData.mouldingrej +
      this.productionsService.productionData.warpage + this.productionsService.productionData.copperburning + this.productionsService.productionData.whitemark +
      this.productionsService.productionData.dotplastic + this.productionsService.productionData.watermark + this.productionsService.productionData.blister +
      this.productionsService.productionData.jigdamage + this.productionsService.productionData.otheR1 + this.productionsService.productionData.otheR2 +
      this.productionsService.productionData.otheR3 + this.productionsService.productionData.otheR4 + this.productionsService.productionData.stprs +
      this.productionsService.productionData.plating + this.productionsService.productionData.moulding + this.productionsService.productionData.mechfail +
      this.productionsService.productionData.tooldef + this.productionsService.productionData.others + this.productionsService.productionData.shadevar +
      this.productionsService.productionData.platingpeel + this.productionsService.productionData.flowmark + this.productionsService.productionData.chemicalmark +
      this.productionsService.productionData.tottooldef + this.productionsService.productionData.totothers;

    console.log(qty);

    console.log(this.productionsService.productionData.rejectionqty);

    if (this.productionsService.productionData.rejectionqty == qty) {
      return false;
    } else {
      return true;
    }
  }
  onComplete(form: NgForm) {
    //console.log("form", this.productionsService.productionData);
    this.validQtyError = false;
    if (this.actionvalue === "Save") {

      this.validQtyError = this.countQty();
      if (this.validQtyError) {
        return;
      }
      this.validRejQtyError = false;

      this.validRejQtyError = this.countRejQty();
      if (this.validRejQtyError) {
        return;
      }

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
