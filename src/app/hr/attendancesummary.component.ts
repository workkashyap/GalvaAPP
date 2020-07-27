import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

import { AttendancesummaryService } from '../shared/hr/attendancesummary.service';
import { LoginService } from '../shared/login/login.service';
import { Attendancesummary } from '../shared/hr/attendancesummary.model';
import { User } from '../shared/login/User.model';
import { PlantService } from '../shared/plant/plant.service';
import { Plant } from '../shared/plant/plant.model';


@Component({
  selector: 'app-attendancesummary',
  templateUrl: './attendancesummary.component.html',
  styleUrls: ['./attendancesummary.component.css'],
})
export class AttendancesummaryComponent implements OnInit {
  month: any;
  public date: any;
  monthName: any;
  public monthNames: any;
  public sales: any = [];
  companies: any[];
  subtitle: any = [];
  public loading = false;
  public productions: any = [];
  brand: any = [];
  totempworked: any = [];
  totempworked2: any = [];
  i: number = 0;
  wk: number = 0;
  tk: number = 0;

  public currentUser: User;

  public selectedcode: string;
  public selected_plantname: string;

  constructor(
    public plantservice: PlantService,
    private lservice: LoginService,
    public attenSummary: AttendancesummaryService
  ) {
    this.monthNames = ['--', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
      'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];
    this.lservice.currentUser.subscribe(x => this.currentUser = x);

    this.brand =
      ["ETP", "JIGGING", "LAB", "MAINTENANCE", "MOULDING", "MOULDING QUALITY", "PLATING", "QUALITY", "STORE", "IQC/PDI", "JIG MFG", "MOULDING T", "QUALITY ASSEMBLY", "SAP", "HK & DRIVER"];
  }

  ngOnInit() {
    const me = this;
    this.date = new Date();
    this.month = this.date.getMonth() + 1;
    console.log("this.month : ", this.month);
    this.monthName = this.monthNames[this.month];
    this.plantservice
      .sgetPlantData(me.currentUser.id)
      .toPromise()
      .then(res => {
        me.plantservice.splantlist = res as Plant[];
        me.selectedcode = me.plantservice.splantlist[0].plantcode;
        me.selected_plantname = me.plantservice.splantlist[0].plantshortname;
        me.getData();
      });

  }
  selectedMonth(ev) {
    this.month=ev;
    this.getData();
  }
  selectedGrid(ev) {
    this.selectedcode=ev;
    this.getData();
  }
  getData() {
    const me = this;
    //all companies
    me.productions = [];
    me.subtitle = [];
    me.totempworked = [];
    me.totempworked2 = [];
    me.i = 0;
    this.attenSummary.getallHRsumcont(this.month).toPromise()
      .then(res => {
        me.companies = res as Attendancesummary[];

        //list data
        this.attenSummary.getallHRwdept(this.month).toPromise()
          .then(res => {
            me.productions = res as Attendancesummary[];

            for (let j = 0; j < me.companies.length; j++) {
              me.subtitle.push('Manpower (Nos.)');
              me.subtitle.push('Manhours Worked');
            }

            for (let j = 0; j < me.brand.length; j++) {
              const newArr = [];
              const newArrWorking = [];
              const newArrTempworking = [];
              const newArrBrandWorking = [];

              const newArrBrandTempworking = [];

              //  me.makearray(me.brand[j]);
              for (let m = 0; m < me.productions.length; m++) {
                if (me.productions[m].departmentFName == me.brand[j] && me.productions[m].status == "working") {
                  newArrWorking.push(me.productions[m].totempworked);
                  newArrBrandWorking.push(me.productions[m].status);
                }
                if (me.productions[m].departmentFName == me.brand[j] && me.productions[m].status == "totmanpower") {
                  newArrTempworking.push(me.productions[m].totempworked);
                  newArrBrandTempworking.push(me.productions[m].status);
                }

              }
              const finalArr = [];
              const finalBrands = [];
              me.wk = 0;
              me.tk = 0;
              for (let m = 0; m < me.productions.length; m++) {
                if (m % 2 == 0) {
                  if (newArrWorking[me.wk]) {
                    finalArr.push(newArrWorking[me.wk]);
                    finalBrands.push(newArrBrandWorking[me.wk]);
                  }
                  me.wk++;
                } else {
                  if (newArrTempworking[me.wk]) {
                    finalArr.push(newArrTempworking[me.wk]);
                    finalBrands.push(newArrBrandTempworking[me.wk]);
                  }
                  me.tk++;
                }
              }
              me.sales.push({ brand: me.brand[j], data: finalArr, brands: finalBrands });
            }
            console.log(me.sales);

          });
      });

    /*this.sales = [
      { brand: 'Apple', data: ['working', 'totmanpower', 'working', 'totmanpower', 'working', 'totmanpower'] },
      { brand: 'Samsung', data: ['working', 'totmanpower', 'working', 'totmanpower', 'working', 'totmanpower'] },
      { brand: 'Microsoft',data: ['working', 'totmanpower', 'working', 'totmanpower', 'working', 'totmanpower']},
      { brand: 'Toshiba', data: ['working', 'totmanpower', 'working', 'totmanpower', 'working', 'totmanpower'] }
    ];*/
  }

}
