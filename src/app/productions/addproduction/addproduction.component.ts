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
import { Productions } from 'src/app/shared/productions/productions.model';
import { ItemmstsService } from 'src/app/shared/itemmsts/itemmsts.service';

@Component({
  selector: "app-addproduction",
  templateUrl: "./addproduction.component.html",
  styleUrls: ["./addproduction.component.css"],
  providers: [DatePipe],
  styles: [
    `
    :host >>> .ui-autocomplete .ui-autocomplete-input {
    width: 93% !important;
    height: 26px;
    padding: .15rem .65rem;
    font-size: 0.8rem;
  }
  :host :: input.ng-tns-c5-0.ui-inputtext.ui-widget.ui-state-default.ui-corner-all.ui-autocomplete-input.ng-star-inserted {
    padding: 0.2em;
}
  `
  ]
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

  filteredCountries: any[];
  public insOrdeno: number;
  constructor(
    private toastr: ToastrService,
    private route: Router,
    private datePipe: DatePipe,
    public productionsService: ProductionsService,
    public iservice: InboxService,
    public itmService: ItemmstsService,
    public plantservice: PlantService,

    public lservice: LoginService
  ) {
    const me = this;
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));

    this.itmService.getallData();

  }

  filterCountry(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.itmService.itemmstsList.length; i++) {
      let country = this.itmService.itemmstsList[i];
      if (country.itemname.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredCountries = filtered;
  }
  valueM(v) {
    if (this.productionsService.productionData.itemname2) {
      this.productionsService.productionData.itemname = this.productionsService.productionData.itemname2.itemname;
      this.productionsService.productionData.itemcode = this.productionsService.productionData.itemname2.itemcode.toString();
      this.productionsService.productionData.plantcode = this.productionsService.productionData.itemname2.plant.toString();
      this.productionsService.productionData.stprs = this.productionsService.productionData.itemname2.price;
      this.productionsService.productionData.size = this.productionsService.productionData.itemname2.ctype;
      if (this.productionsService.productionData.itemname2.itemtype = "Chrome") {
        this.productionsService.productionData.type = "ZCRM";
      } else if (this.productionsService.productionData.itemname2.itemtype = "Moulded") {
        this.productionsService.productionData.type = "ZMLD";
      } else if (this.productionsService.productionData.itemname2.itemtype = "Satin") {
        this.productionsService.productionData.type = "ZSAT";
      }
      this.selectedcode = this.productionsService.productionData.plantcode;
      this.randomData();
    }
  }
  randomData() {
    const minm = 10;
    const maxm = 99;
    const value = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    const date = this.datePipe.transform(new Date(), "ddMMyyyy");

    this.insOrdeno = parseInt(this.selectedcode + "" + date + "" + value);
    if (this.productionsService.productionData) {
      this.productionsService.productionData.insplot = this.insOrdeno;
      this.productionsService.productionData.orderno = this.insOrdeno;
    }
  }
  plantcodeChange() {
    this.selectedcode = this.productionsService.productionData.plantcode;
    this.randomData();
  }
  ngOnInit() {
    const me = this;
    this.date = this.datePipe.transform(new Date(), "yyyy-MM-dd");

    const date = this.datePipe.transform(new Date(), "ddMMyyyy");

    this.plantservice
      .sgetPlantData(me.currentUser.id)
      .toPromise()
      .then(res => {
        me.plantservice.splantlist = [];
        const splantlist = res as Plant[];
        splantlist.forEach(splant => {
          if (splant.plantcode == "1040" || splant.plantcode == "1050") {
            me.plantservice.splantlist.push(splant);
            // me.selectedcode = ''//me.plantservice.splantlist[0].plantcode;
          }
        });
        // this.productionsService.productionData = [];
        me.selectedcode = me.plantservice.splantlist[0].plantcode;


        if (me.productionsService.id) {
          me.productionsService.productionbyid(me.productionsService.id)
            .toPromise()
            .then((res: any) => {
              this.productionsService.productionData = res; //as Productions[];
              this.productionsService.productionData.pstngdate = this.datePipe.transform(this.productionsService.productionData.pstngdate, "yyyy-MM-dd");
              this.productionsService.productionData.itemname2 = { 'itemname': this.productionsService.productionData.itemname }
              me.randomData();

            });
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
            itemname2: null,
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
          me.randomData();
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
  }
  rejectQtyChange(qty, row) {
    if (this.productionsService.id) {
      return;
    }
    var number = parseInt(qty);
    var n = 34;

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
      //row.stprs = values[23];
      row.plating = values[23];
      row.moulding = values[24];
      row.mechfail = values[25];
      row.tooldef = values[26];
      row.others = values[27];
      row.shadevar = values[28];
      row.platingpeel = values[29];
      row.flowmark = values[30];
      row.chemicalmark = values[31];
      row.tottooldef = values[32];
      row.totothers = values[33];
    }
  }
  countQty() {
    const qty = this.productionsService.productionData.okqty + this.productionsService.productionData.holdqty + this.productionsService.productionData.rejectionqty + this.productionsService.productionData.buffingqty;
    this.productionsService.productionData.qty = qty.toString();
    /* if (parseInt(this.productionsService.productionData.qty) == qty) {
       return false;
     } else {
       return true;
     }*/
  }
  countRejQty() {
    //  this.productionsService.productionData.stprs +
    this.productionsService.productionData.rejectionqty = this.productionsService.productionData.pitting + this.productionsService.productionData.pinhole + this.productionsService.productionData.patchmark +
      this.productionsService.productionData.nickle + this.productionsService.productionData.crburning + this.productionsService.productionData.skipplating +
      this.productionsService.productionData.dent + this.productionsService.productionData.handmouldingrej + this.productionsService.productionData.scratchmark +
      this.productionsService.productionData.roughness + this.productionsService.productionData.silver + this.productionsService.productionData.mouldingrej +
      this.productionsService.productionData.warpage + this.productionsService.productionData.copperburning + this.productionsService.productionData.whitemark +
      this.productionsService.productionData.dotplastic + this.productionsService.productionData.watermark + this.productionsService.productionData.blister +
      this.productionsService.productionData.jigdamage + this.productionsService.productionData.otheR1 + this.productionsService.productionData.otheR2 +
      this.productionsService.productionData.otheR3 + this.productionsService.productionData.otheR4 +
      this.productionsService.productionData.mechfail +
      this.productionsService.productionData.tooldef + this.productionsService.productionData.others + this.productionsService.productionData.shadevar +
      this.productionsService.productionData.platingpeel + this.productionsService.productionData.flowmark + this.productionsService.productionData.chemicalmark;

    //this.productionsService.productionData.plating +  this.productionsService.productionData.moulding +this.productionsService.productionData.tottooldef +   +
    // this.productionsService.productionData.totothers
    this.countQty();
    /*if (this.productionsService.productionData.rejectionqty == qty) {
      return false;
    } else {
      return true;
    }*/
  }
  sumoffields() {
    this.productionsService.productionData.plating = (this.productionsService.productionData.pinhole + this.productionsService.productionData.skipplating + this.productionsService.productionData.whitemark
      + this.productionsService.productionData.dotplastic + this.productionsService.productionData.crburning + this.productionsService.productionData.copperburning + this.productionsService.productionData.nickle
      + this.productionsService.productionData.roughness + this.productionsService.productionData.blister + this.productionsService.productionData.watermark + this.productionsService.productionData.shadevar +
      this.productionsService.productionData.platingpeel + this.productionsService.productionData.chemicalmark);

    this.productionsService.productionData.moulding = (this.productionsService.productionData.silver + this.productionsService.productionData.dent + this.productionsService.productionData.handmouldingrej
      + this.productionsService.productionData.mouldingrej + this.productionsService.productionData.patchmark + this.productionsService.productionData.pitting + this.productionsService.productionData.flowmark);

    this.productionsService.productionData.tottooldef = (this.productionsService.productionData.tooldef + this.productionsService.productionData.jigdamage);

    this.productionsService.productionData.totothers = (this.productionsService.productionData.warpage + this.productionsService.productionData.scratchmark + this.productionsService.productionData.otheR1 + this.productionsService.productionData.otheR2);
  }
  onComplete(form: NgForm) {
    this.validQtyError = false;
    this.sumoffields();
    //console.log("this.productionsService.productionData", this.productionsService.productionData);
    //return;

    if (this.actionvalue === "Save") {

      /* this.validQtyError = this.countQty();
       if (this.validQtyError) {
         return;
       }
       this.validRejQtyError = false;
 
       /* this.validRejQtyError = this.countRejQty();
        if (this.validRejQtyError) {
          return;
        }*/

      this.loading = true;

      if (this.productionsService.productionData.id > 0) {
        this.productionsService.productionData.createddate = this.datePipe.transform(this.productionsService.productionData.createddate, "yyyy-MM-dd");

        this.productionsService.updateProduction(this.productionsService.productionData.id).subscribe(res => {
          this.resetForm(form);
          this.toastr.success(
            "Successfully Updated.",
            "Production"
          );
          this.route.navigate(["./productions"]);
        }, err => {
          console.log(err);
        });
      } else {
        this.productionsService.productionData.createddate = this.datePipe.transform(this.date, "yyyy-MM-dd");

        this.productionsService.saveProduction().subscribe(res => {
          this.resetForm(form);
          this.toastr.success(
            "Successfully Saved.",
            "Production"
          );
          this.route.navigate(["./productions"]);
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
