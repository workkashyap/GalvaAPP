import { Component, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { ProductionsService } from "src/app/shared/productions/productions.service";
import { Router } from "@angular/router";
import { InboxService } from "src/app/shared/inbox/inbox.service";
import { NgForm } from "@angular/forms";
import { ItemmstsService } from 'src/app/shared/itemmsts/itemmsts.service';
import { User } from "src/app/shared/login/User.model";
import { LoginService } from "src/app/shared/login/login.service";
import { PlantService } from 'src/app/shared/plant/plant.service';
import { Plant } from 'src/app/shared/plant/plant.model';
import { QualityService } from '../shared/quality/quality.service';

@Component({
  selector: 'app-qualitymst',
  templateUrl: './qualitymst.component.html',
  styleUrls: ['./qualitymst.component.css'],
  providers: [DatePipe]
})
export class QualitymstComponent implements OnInit {

  public currentUser: User;
  public selectedcode: any;
  public date: string;
  public insOrdeno: number;
  public actionvalue: string;
  public loading = false;
  public validQtyError: boolean = false;
  public validRejQtyError: boolean = false;

  filteredCountries: any[];

  constructor(
    private route: Router,
    private datePipe: DatePipe,
    public productionsService: ProductionsService,
    public iservice: InboxService,
    public itmService: ItemmstsService,
    public lservice: LoginService,
    public plantservice: PlantService,
    public qualityservice: QualityService,
    private toastr: ToastrService) {
      const me = this;
      this.lservice.currentUser.subscribe(x => (this.currentUser = x));

      this.itmService.getallData();
     }

  ngOnInit() {
    console.log(this.productionsService.productionData)
    const me = this;
    this.date = this.datePipe.transform(new Date(), "yyyy-MM-dd");

    const date = this.datePipe.transform(new Date(), "ddMMyyyy");
      
    me.qualityservice.qualityData = {
      insplot: 0,
      orderno: 0,
      roundno: "",
      InspQty: 0,
      InspValue: 0,
      plantcode: "",
      shift: "",
      itemcode: "",
      itemname: "",
      size: "",
      OrderType: "",
      okqty: 0,
      okvalue: 0,
      holdqty: 0,
      holdvalue: 0,
      buffingqty: 0,
      buffingvalue: 0,
      rejectionqty: 0,
      rejectionvalue: 0,
      MouldingRejQty: 0,
      MouldingRejValue: 0,
      JigingRejQty: 0,
      JigingRejValue: 0,
      PlatingRejQty: 0,
      PlatingRejValue: 0,
      OtherRejQty: 0,
      OtherRejValue: 0,
      StdPrice: 0,
      SellPrice: 0,
      TotalRejQty: 0,
      TotalRejValue: 0,
      DE01Q: 0,
      DE02Q: 0,
      DE03Q: 0,
      DE04Q: 0,
      DE05Q: 0,
      DE06Q: 0,
      DE07Q: 0,
      DE08Q: 0,
      DE09Q: 0,
      DE10Q: 0,
      DE11Q: 0,
      DE12Q: 0,
      DE13Q: 0,
      DE14Q: 0,
      DE15Q: 0,
      DE16Q: 0,
      DE17Q: 0,
      DE18Q: 0,
      DE19Q: 0,
      DE20Q: 0,
      DE21Q: 0,
      DE22Q: 0,
      DE23Q: 0,
      DE24Q: 0,
      DE25Q: 0,
      DE26Q: 0,
      DE27Q: 0,
      DE28Q: 0,
      DE29Q: 0,
      DE30Q: 0,
      DE31Q: 0,
      DE32Q: 0,
      DE33Q: 0,
      DE34Q: 0,
      DE35Q: 0,
      DE36Q: 0,
      DE37Q: 0,
      DE38Q: 0,
      DE39Q: 0,
      DE40Q: 0,
      DE41Q: 0,
      DE42Q: 0,
      DE43Q: 0,
      DE44Q: 0,
      DE45Q: 0,
      DE46Q: 0,
      DE47Q: 0,
      DE48Q: 0,
      DE49Q: 0,
      DE50Q: 0,
      createddate: me.date,
      pstngdate: me.date,
    };
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }
  }

  onComplete(form: NgForm) {
    this.validQtyError = false;

    if (this.actionvalue === "Save") {

      this.loading = true;
      this.qualityservice.qualityData.createddate = this.datePipe.transform(this.date, "yyyy-MM-dd");

      this.qualityservice.saveQuality().subscribe(res => {
        this.resetForm(form);
        this.toastr.success(
          "Successfully Saved.",
          "Production"
        );
        this.route.navigate(["./qualitymst"]);
      }, err => {
        console.log(err);
      });
    }
  }

  onSaveClick() {
    this.actionvalue = "Save";
    console.log(this.qualityservice.qualityData)
  }

  back() {
    this.iservice.uid = this.currentUser.id;
    this.route.navigate(["./qaulitymst"]);
  }

  countQty() {
     this.qualityservice.qualityData.InspQty = this.qualityservice.qualityData.okqty + this.qualityservice.qualityData.holdqty + this.qualityservice.qualityData.rejectionqty + this.qualityservice.qualityData.buffingqty;
  }

  countRejQty() {
    this.qualityservice.qualityData.rejectionqty = this.qualityservice.qualityData.DE01Q + this.qualityservice.qualityData.DE02Q + this.qualityservice.qualityData.DE03Q + this.qualityservice.qualityData.DE04Q + this.qualityservice.qualityData.DE05Q + this.qualityservice.qualityData.DE06Q + this.qualityservice.qualityData.DE07Q + this.qualityservice.qualityData.DE08Q + this.qualityservice.qualityData.DE09Q + this.qualityservice.qualityData.DE10Q
                         + this.qualityservice.qualityData.DE11Q + this.qualityservice.qualityData.DE12Q + this.qualityservice.qualityData.DE13Q + this.qualityservice.qualityData.DE14Q + this.qualityservice.qualityData.DE15Q + this.qualityservice.qualityData.DE16Q + this.qualityservice.qualityData.DE17Q + this.qualityservice.qualityData.DE18Q + this.qualityservice.qualityData.DE19Q + this.qualityservice.qualityData.DE20Q
                         + this.qualityservice.qualityData.DE21Q + this.qualityservice.qualityData.DE22Q + this.qualityservice.qualityData.DE23Q + this.qualityservice.qualityData.DE24Q + this.qualityservice.qualityData.DE25Q + this.qualityservice.qualityData.DE26Q + this.qualityservice.qualityData.DE27Q + this.qualityservice.qualityData.DE28Q + this.qualityservice.qualityData.DE29Q + this.qualityservice.qualityData.DE30Q
                         + this.qualityservice.qualityData.DE31Q + this.qualityservice.qualityData.DE32Q + this.qualityservice.qualityData.DE33Q + this.qualityservice.qualityData.DE34Q + this.qualityservice.qualityData.DE35Q + this.qualityservice.qualityData.DE36Q + this.qualityservice.qualityData.DE37Q + this.qualityservice.qualityData.DE38Q + this.qualityservice.qualityData.DE39Q + this.qualityservice.qualityData.DE40Q
                         + this.qualityservice.qualityData.DE41Q + this.qualityservice.qualityData.DE42Q + this.qualityservice.qualityData.DE43Q + this.qualityservice.qualityData.DE44Q + this.qualityservice.qualityData.DE45Q + this.qualityservice.qualityData.DE46Q + this.qualityservice.qualityData.DE47Q + this.qualityservice.qualityData.DE48Q + this.qualityservice.qualityData.DE49Q + this.qualityservice.qualityData.DE50Q; 

     this.countQty();
  }

  totRejValue(){
    this.qualityservice.qualityData.TotalRejValue = this.qualityservice.qualityData.SellPrice * this.qualityservice.qualityData.TotalRejQty; 
  }


}
