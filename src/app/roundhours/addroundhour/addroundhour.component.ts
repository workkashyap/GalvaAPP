import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { NgForm } from "@angular/forms";
import { RoundhoursService } from 'src/app/shared/roundhours/roundhours.service';
import { PlantService } from 'src/app/shared/plant/plant.service';
import { Plant } from 'src/app/shared/plant/plant.model';
import { User } from 'src/app/shared/login/User.model';
import { LoginService } from 'src/app/shared/login/login.service';
import { parse } from 'querystring';

@Component({
  selector: "app-addroundhour",
  templateUrl: "./addroundhour.component.html",
  styleUrls: ["./addroundhour.component.css"],
  providers: [DatePipe]
})
export class AddroundhourComponent implements OnInit {
  public currentUser: User;

  public selectedcode: string;

  public date: string;
  public actionvalue: string;
  public loading = false;
  constructor(
    private toastr: ToastrService,
    private route: Router,
    private datePipe: DatePipe,
    public rhService: RoundhoursService,
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
        me.selectedcode = me.plantservice.splantlist[0].plantcode;
      });

    if (me.rhService.date && me.rhService.plant) {
      this.rhService.date = this.datePipe.transform(this.rhService.date, "yyyy-MM-dd");
      this.date = this.rhService.date;
      me.rhService.getRoundHour(me.rhService.date, me.rhService.plant);
      this.selectedcode = "" + this.rhService.roundhourInfo.plant;

    } else {
      me.rhService.roundhourInfo = {
        id: 0,
        shifta: "A",
        shiftb: "B",
        shiftc: "C",
        r7to8: 0,
        r8to9: 0,
        r9to10: 0,
        r10to11: 0,
        r11to12: 0,
        r12to13: 0,
        r13to14: 0,
        r14to15: 0,
        r15to16: 0,
        r16to17: 0,
        r17to18: 0,
        r18to19: 0,
        r19to20: 0,
        r20to21: 0,
        r21to22: 0,
        r22to23: 0,
        r23to24: 0,
        r24to1: 0,
        r1to2: 0,
        r2to3: 0,
        r3to4: 0,
        r4to5: 0,
        r5to6: 0,
        r6to7: 0,
        plant: 0,
        shiftaname: "",
        shiftbname: "",
        shiftcname: "",
        pstng_date: "",
      };
    }
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }
  }
  onComplete(form: NgForm) {
    //console.log("form", this.productionsService.productionData);
    this.loading = true;
    this.rhService.roundhourInfo.plant = parseInt(this.selectedcode);
    if (this.actionvalue === "Save") {

      this.rhService.roundhourInfo.pstng_date = this.datePipe.transform(this.date, "yyyy-MM-dd");

      if (this.rhService.roundhourInfo.id > 0) {
        console.log("update data", this.rhService.roundhourInfo);
        this.rhService.updateRoundHour(this.rhService.roundhourInfo.id).subscribe(res => {
          this.resetForm(form);
          this.loading = false;

          this.toastr.success(
            "Successfully Updated.",
            "Round Hours"
          );
          this.route.navigate(["./roundhours"]);
        }, err => {
          console.log(err);
          this.loading = false;

        });
      } else {
        this.rhService.roundhourInfo.pstng_date = this.datePipe.transform(this.date, "yyyy-MM-dd");
        this.loading = false;

        this.rhService.saveRoundHour().subscribe(res => {
          this.resetForm(form);
          this.toastr.success(
            "Successfully Saved.",
            "Round Hours"
          );
          this.route.navigate(["./roundhours"]);
        }, err => {
          console.log(err);
          this.loading = false;

        });
      }
    } else {
      this.loading = false;

      this.backtoProduction();
    }
  }
  getTotalA() {
    return this.rhService.roundhourInfo.r7to8 + this.rhService.roundhourInfo.r8to9 + this.rhService.roundhourInfo.r9to10 + this.rhService.roundhourInfo.r10to11 + this.rhService.roundhourInfo.r11to12 + this.rhService.roundhourInfo.r12to13 + this.rhService.roundhourInfo.r13to14 + this.rhService.roundhourInfo.r14to15;
  }

  getTotalb() {
    return this.rhService.roundhourInfo.r15to16 + this.rhService.roundhourInfo.r16to17 + this.rhService.roundhourInfo.r17to18 + this.rhService.roundhourInfo.r18to19 + this.rhService.roundhourInfo.r19to20 + this.rhService.roundhourInfo.r20to21 + this.rhService.roundhourInfo.r21to22 + this.rhService.roundhourInfo.r22to23;

  }
  compliance() {
    const total = this.getTotal();
    return total / 160;
  }
  getTotalC() {
    return this.rhService.roundhourInfo.r23to24 + this.rhService.roundhourInfo.r24to1 + this.rhService.roundhourInfo.r1to2 + this.rhService.roundhourInfo.r2to3 + this.rhService.roundhourInfo.r3to4 + this.rhService.roundhourInfo.r4to5 + this.rhService.roundhourInfo.r5to6 + this.rhService.roundhourInfo.r6to7;
  }
  getTotal() {
    return this.rhService.roundhourInfo.r7to8 + this.rhService.roundhourInfo.r8to9 + this.rhService.roundhourInfo.r9to10 + this.rhService.roundhourInfo.r10to11 + this.rhService.roundhourInfo.r11to12 + this.rhService.roundhourInfo.r12to13 + this.rhService.roundhourInfo.r13to14 + this.rhService.roundhourInfo.r14to15
      + this.rhService.roundhourInfo.r15to16 + this.rhService.roundhourInfo.r16to17 + this.rhService.roundhourInfo.r17to18 + this.rhService.roundhourInfo.r18to19 + this.rhService.roundhourInfo.r19to20 + this.rhService.roundhourInfo.r20to21 + this.rhService.roundhourInfo.r21to22 + this.rhService.roundhourInfo.r22to23
      + this.rhService.roundhourInfo.r23to24 + this.rhService.roundhourInfo.r24to1 + this.rhService.roundhourInfo.r1to2 + this.rhService.roundhourInfo.r2to3 + this.rhService.roundhourInfo.r3to4 + this.rhService.roundhourInfo.r4to5 + this.rhService.roundhourInfo.r5to6 + this.rhService.roundhourInfo.r6to7;

  }
  onSaveClick() {
    this.actionvalue = "Save";
  }
  onCancelClick() {
    this.actionvalue = "Cancel";
  }
  backtoProduction() {
    this.route.navigate(["./roundhours"]);
  }
}
