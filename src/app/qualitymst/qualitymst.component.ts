import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ProductionsService } from 'src/app/shared/productions/productions.service';
import { Router } from '@angular/router';
import { InboxService } from 'src/app/shared/inbox/inbox.service';
import { NgForm } from '@angular/forms';
import { ItemmstsService } from 'src/app/shared/itemmsts/itemmsts.service';
import { User } from 'src/app/shared/login/User.model';
import { LoginService } from 'src/app/shared/login/login.service';
import { PlantService } from 'src/app/shared/plant/plant.service';
import { Plant } from 'src/app/shared/plant/plant.model';
import { QualityService } from '../shared/quality/quality.service';

@Component({
  selector: 'app-qualitymst',
  templateUrl: './qualitymst.component.html',
  styleUrls: ['./qualitymst.component.css'],
  providers: [DatePipe],
//   styles: [
//     `
//     :host >>> .ui-autocomplete .ui-autocomplete-input {
//     width: 10% !important;
//     height: 26px;
//     padding: .15rem .65rem;
//     font-size: 0.8rem;
//   }
//   :host :: input.ng-tns-c5-0.ui-inputtext.ui-widget.ui-state-default.ui-corner-all.ui-autocomplete-input.ng-star-inserted {
//     padding: 0.2em;
// }
//   `]
})
export class QualitymstComponent implements OnInit {

  public currentUser: User;
  public selectedcode: any;
  public date: string;
  public insOrdeno: number;
  public actionvalue: string;
  public loading = false;
  public validQtyError = false;
  public validRejQtyError = false;

  filteredCountries: any[];
  brands: string[] = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo', 'VW'];
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
          }
        });
        me.selectedcode = me.plantservice.splantlist[0].plantcode;


        if (me.qualityservice.id) {
          me.qualityservice.qualitybyid(me.qualityservice.id)
            .toPromise()
            .then((res: any) => {
              this.qualityservice.qualityData = res; //as Productions[];
              this.qualityservice.qualityData.pstngdate = this.datePipe.transform(this.qualityservice.qualityData.pstngdate, "yyyy-MM-dd");
              me.randomData();
            });
        } else {
          me.qualityservice.qualityData = {
            insplot: 0,
            orderno: 0,
            roundno: '',
            inspQty: 0,
            inspValue: 0,
            plantcode: '',
            shift: '',
            itemcode: '',
            itemname: '',
            size: '',
            orderType: '',
            okqty: 0,
            okvalue: 0,
            holdqty: 0,
            holdvalue: 0,
            buffingqty: 0,
            buffingvalue: 0,
            rejectionqty: 0,
            rejectionvalue: 0,
            mouldingRejQty: 0,
            mouldingRejValue: 0,
            jigingRejQty: 0,
            jigingRejValue: 0,
            platingRejQty: 0,
            platingRejValue: 0,
            otherRejQty: 0,
            otherRejValue: 0,
            stdPrice: 0,
            sellPrice: 0,
            totRejQty: 0,
            totRejValue: 0,
            dE01Q: 0,
            dE02Q: 0,
            dE03Q: 0,
            dE04Q: 0,
            dE05Q: 0,
            dE06Q: 0,
            dE07Q: 0,
            dE08Q: 0,
            dE09Q: 0,
            dE10Q: 0,
            dE11Q: 0,
            dE12Q: 0,
            dE13Q: 0,
            dE14Q: 0,
            dE15Q: 0,
            dE16Q: 0,
            dE17Q: 0,
            dE18Q: 0,
            dE19Q: 0,
            dE20Q: 0,
            dE21Q: 0,
            dE22Q: 0,
            dE23Q: 0,
            dE24Q: 0,
            dE25Q: 0,
            dE26Q: 0,
            dE27Q: 0,
            dE28Q: 0,
            dE29Q: 0,
            dE30Q: 0,
            dE31Q: 0,
            dE32Q: 0,
            dE33Q: 0,
            dE34Q: 0,
            dE35Q: 0,
            dE36Q: 0,
            dE37Q: 0,
            dE38Q: 0,
            dE39Q: 0,
            dE40Q: 0,
            dE41Q: 0,
            dE42Q: 0,
            dE43Q: 0,
            dE44Q: 0,
            dE45Q: 0,
            dE46Q: 0,
            dE47Q: 0,
            dE48Q: 0,
            dE49Q: 0,
            dE50Q: 0,
            createddate: me.date,
            pstngdate: me.date,
          };
          me.randomData();
        }

      });
    this.resetForm();
  }

  filterCountry(event) {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < this.itmService.itemmstsList.length; i++) {
      const country = this.itmService.itemmstsList[i];
      if (country.itemname.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(country);
      }
    }
    this.filteredCountries = filtered;
  }

  countQty() {
     this.qualityservice.qualityData.inspQty = this.qualityservice.qualityData.okqty + this.qualityservice.qualityData.holdqty + this.qualityservice.qualityData.rejectionqty + this.qualityservice.qualityData.buffingqty;
  }

  countRejQty() {
    this.qualityservice.qualityData.rejectionqty = this.qualityservice.qualityData.dE01Q + this.qualityservice.qualityData.dE02Q + this.qualityservice.qualityData.dE03Q + this.qualityservice.qualityData.dE04Q + this.qualityservice.qualityData.dE05Q + this.qualityservice.qualityData.dE06Q + this.qualityservice.qualityData.dE07Q + this.qualityservice.qualityData.dE08Q + this.qualityservice.qualityData.dE09Q + this.qualityservice.qualityData.dE10Q
                         + this.qualityservice.qualityData.dE11Q + this.qualityservice.qualityData.dE12Q + this.qualityservice.qualityData.dE13Q + this.qualityservice.qualityData.dE14Q + this.qualityservice.qualityData.dE15Q + this.qualityservice.qualityData.dE16Q + this.qualityservice.qualityData.dE17Q + this.qualityservice.qualityData.dE18Q + this.qualityservice.qualityData.dE19Q + this.qualityservice.qualityData.dE20Q
                         + this.qualityservice.qualityData.dE21Q + this.qualityservice.qualityData.dE22Q + this.qualityservice.qualityData.dE23Q + this.qualityservice.qualityData.dE24Q + this.qualityservice.qualityData.dE25Q + this.qualityservice.qualityData.dE26Q + this.qualityservice.qualityData.dE27Q + this.qualityservice.qualityData.dE28Q + this.qualityservice.qualityData.dE29Q + this.qualityservice.qualityData.dE30Q
                         + this.qualityservice.qualityData.dE31Q + this.qualityservice.qualityData.dE32Q + this.qualityservice.qualityData.dE33Q + this.qualityservice.qualityData.dE34Q + this.qualityservice.qualityData.dE35Q + this.qualityservice.qualityData.dE36Q + this.qualityservice.qualityData.dE37Q + this.qualityservice.qualityData.dE38Q + this.qualityservice.qualityData.dE39Q + this.qualityservice.qualityData.dE40Q
                         + this.qualityservice.qualityData.dE41Q + this.qualityservice.qualityData.dE42Q + this.qualityservice.qualityData.dE43Q + this.qualityservice.qualityData.dE44Q + this.qualityservice.qualityData.dE45Q + this.qualityservice.qualityData.dE46Q + this.qualityservice.qualityData.dE47Q + this.qualityservice.qualityData.dE48Q + this.qualityservice.qualityData.dE49Q + this.qualityservice.qualityData.dE50Q;

    this.countQty();
  }

  totRejValue() {
    this.qualityservice.qualityData.totRejValue = this.qualityservice.qualityData.sellPrice * this.qualityservice.qualityData.totRejQty;
  }

  valueM(v) {
      this.qualityservice.qualityData.itemname = v.itemname;
      this.qualityservice.qualityData.itemcode = v.itemcode.toString();
      this.qualityservice.qualityData.plantcode = v.plant.toString();
      this.qualityservice.qualityData.size = v.ctype;
      this.qualityservice.qualityData.stdPrice = v.price;
      if (v.itemtype === "Chrome") {
        this.qualityservice.qualityData.orderType = "ZCRM";
      }else if (v.itemtype === "Moulding")  {
        this.qualityservice.qualityData.orderType = "ZMLD";
      }else if (v.itemtype === "Satin")  {
        this.qualityservice.qualityData.orderType = "ZSAT";
      }

      this.selectedcode = this.qualityservice.qualityData.plantcode;
      this.randomData();
    }

    randomData() {
      const minm = 10;
      const maxm = 99;
      const value = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
      const date = this.datePipe.transform(new Date(), "ddMMyyyy");
  
      this.insOrdeno = parseInt(this.selectedcode + "" + date + "" + value);
      if (this.qualityservice.qualityData) {
        this.qualityservice.qualityData.insplot = this.insOrdeno;
        this.qualityservice.qualityData.orderno = this.insOrdeno;
      }
    }

    plantcodeChange() {
      this.selectedcode = this.qualityservice.qualityData.plantcode;
      this.randomData();
    }

    addDefects(){
      this.qualityservice.qualityData.mouldingRejQty = this.qualityservice.qualityData.dE01Q + this.qualityservice.qualityData.dE02Q + this.qualityservice.qualityData.dE03Q + this.qualityservice.qualityData.dE04Q + this.qualityservice.qualityData.dE05Q + this.qualityservice.qualityData.dE06Q + this.qualityservice.qualityData.dE07Q + this.qualityservice.qualityData.dE08Q + this.qualityservice.qualityData.dE09Q + this.qualityservice.qualityData.dE10Q +
                                                       this.qualityservice.qualityData.dE11Q + this.qualityservice.qualityData.dE12Q + this.qualityservice.qualityData.dE13Q + this.qualityservice.qualityData.dE14Q + this.qualityservice.qualityData.dE15Q;
      
      this.qualityservice.qualityData.jigingRejQty = this.qualityservice.qualityData.dE16Q + this.qualityservice.qualityData.dE17Q + this.qualityservice.qualityData.dE18Q + this.qualityservice.qualityData.dE19Q + this.qualityservice.qualityData.dE20Q + this.qualityservice.qualityData.dE21Q;                                                 
    
      this.qualityservice.qualityData.platingRejQty = this.qualityservice.qualityData.dE22Q + this.qualityservice.qualityData.dE23Q + this.qualityservice.qualityData.dE24Q + this.qualityservice.qualityData.dE25Q + this.qualityservice.qualityData.dE26Q + this.qualityservice.qualityData.dE27Q + this.qualityservice.qualityData.dE28Q + this.qualityservice.qualityData.dE29Q +
                                                      this.qualityservice.qualityData.dE30Q + this.qualityservice.qualityData.dE31Q + this.qualityservice.qualityData.dE32Q + this.qualityservice.qualityData.dE33Q + this.qualityservice.qualityData.dE34Q + this.qualityservice.qualityData.dE35Q + this.qualityservice.qualityData.dE36Q + this.qualityservice.qualityData.dE37Q + this.qualityservice.qualityData.dE38Q + this.qualityservice.qualityData.dE39Q +
                                                      this.qualityservice.qualityData.dE40Q + this.qualityservice.qualityData.dE41Q + this.qualityservice.qualityData.dE42Q + this.qualityservice.qualityData.dE43Q;
      
      this.qualityservice.qualityData.otherRejQty = this.qualityservice.qualityData.dE44Q + this.qualityservice.qualityData.dE45Q + this.qualityservice.qualityData.dE46Q + this.qualityservice.qualityData.dE47Q + this.qualityservice.qualityData.dE48Q;  
    }

    valuesStd(){
      this.qualityservice.qualityData.okvalue = this.qualityservice.qualityData.okqty * this.qualityservice.qualityData.stdPrice;
      this.qualityservice.qualityData.holdvalue = this.qualityservice.qualityData.holdqty * this.qualityservice.qualityData.stdPrice;
      this.qualityservice.qualityData.buffingvalue = this.qualityservice.qualityData.buffingqty * this.qualityservice.qualityData.stdPrice;
      this.qualityservice.qualityData.rejectionvalue = this.qualityservice.qualityData.rejectionqty * this.qualityservice.qualityData.stdPrice;

      this.qualityservice.qualityData.mouldingRejValue = this.qualityservice.qualityData.mouldingRejQty * this.qualityservice.qualityData.stdPrice;
      this.qualityservice.qualityData.jigingRejValue = this.qualityservice.qualityData.jigingRejQty * this.qualityservice.qualityData.stdPrice;
      this.qualityservice.qualityData.platingRejValue = this.qualityservice.qualityData.platingRejQty * this.qualityservice.qualityData.stdPrice;
      this.qualityservice.qualityData.otherRejValue = this.qualityservice.qualityData.otherRejQty * this.qualityservice.qualityData.stdPrice;

      this.qualityservice.qualityData.totRejQty = this.qualityservice.qualityData.buffingqty + this.qualityservice.qualityData.holdqty + this.qualityservice.qualityData.rejectionqty; 
      this.qualityservice.qualityData.totRejValue = this.qualityservice.qualityData.totRejQty * this.qualityservice.qualityData.stdPrice;

    }

    valuesSell(){
      this.qualityservice.qualityData.okvalue = this.qualityservice.qualityData.okqty * this.qualityservice.qualityData.sellPrice;
      this.qualityservice.qualityData.holdvalue = this.qualityservice.qualityData.holdqty * this.qualityservice.qualityData.sellPrice;
      this.qualityservice.qualityData.buffingvalue = this.qualityservice.qualityData.buffingqty * this.qualityservice.qualityData.sellPrice;
      // tslint:disable-next-line:max-line-length
      this.qualityservice.qualityData.rejectionvalue = this.qualityservice.qualityData.rejectionqty * this.qualityservice.qualityData.sellPrice;

      this.qualityservice.qualityData.mouldingRejValue = this.qualityservice.qualityData.mouldingRejQty * this.qualityservice.qualityData.sellPrice;
      this.qualityservice.qualityData.jigingRejValue = this.qualityservice.qualityData.jigingRejQty * this.qualityservice.qualityData.sellPrice;
      this.qualityservice.qualityData.platingRejValue = this.qualityservice.qualityData.platingRejQty * this.qualityservice.qualityData.sellPrice;
      this.qualityservice.qualityData.otherRejValue = this.qualityservice.qualityData.otherRejQty * this.qualityservice.qualityData.sellPrice;

      this.qualityservice.qualityData.totRejQty = this.qualityservice.qualityData.buffingqty + this.qualityservice.qualityData.holdqty + this.qualityservice.qualityData.rejectionqty; 
      this.qualityservice.qualityData.totRejValue = this.qualityservice.qualityData.totRejQty * this.qualityservice.qualityData.sellPrice;
      
    }

    allCalculations() {
      if (this.qualityservice.qualityData.sellPrice === 0){
        this.countQty();
        this.countRejQty();
        this.addDefects();
        this.valuesStd();
      }else{
        this.countQty();
        this.countRejQty();
        this.addDefects();
        this.valuesSell();
      }
    }

    resetForm(form?: NgForm) {
      if (form != null) {
        form.form.reset();
      }
    }
  
    onComplete(form: NgForm) {
      this.validQtyError = false;

      if (this.qualityservice.qualityData.itemname.length === 0 || this.qualityservice.qualityData.plantcode.length === 0 || this.qualityservice.qualityData.stdPrice === 0) {
        this.toastr.error(
          "Save Failed.",
          "Add Required Fields."
        );
      }else{
        if (this.actionvalue === 'Save') {
  
          this.loading = true;
  
          if (this.qualityservice.qualityData.id > 0) {
            this.qualityservice.qualityData.createddate = this.datePipe.transform(this.qualityservice.qualityData.createddate, "yyyy-MM-dd");
    
            this.qualityservice.updatequality(this.qualityservice.qualityData.id).subscribe(res => {
              this.resetForm(form);
              this.toastr.success(
                "Successfully Updated.",
                "Production"
              );
              this.route.navigate(["./qualityview"]);
            }, err => {
              console.log(err);
            });
          }else{
            this.qualityservice.qualityData.createddate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    
            this.qualityservice.saveQuality().subscribe(res => {
              console.log(this.qualityservice.qualityData);
              this.resetForm(form);
              this.toastr.success(
                'Successfully Saved.',
                'Production'
              );
              this.route.navigate(['./qualityview']);
            }, err => {
              console.log(err);
            });
          } 
        }else{
          this.back();
        }
      }

    }
  
    onSaveClick() {
      this.actionvalue = 'Save';
    }
  
    back() {
      this.iservice.uid = this.currentUser.id;
      this.route.navigate(['./qualityview']);
    }
  }

