import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

import { AttendancesummaryService } from '../shared/hr/attendancesummary.service';
import { LoginService } from '../shared/login/login.service';
import { Attendancesummary } from '../shared/hr/attendancesummary.model';
import { User } from '../shared/login/User.model';
import { PlantService } from '../shared/plant/plant.service';
import { Plant } from '../shared/plant/plant.model';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-attendancesummary',
  templateUrl: './attendancesummary.component.html',
  styleUrls: ['./attendancesummary.component.css'],
  providers: [DatePipe]

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
  company_name: string = "GUJARAT MANPOWER";
  public currentUser: User;

  current_month_startdate: any;
  current_month_enddate: any;

  selected_startdate: any;
  selected_enddate: any;
  selectedah: any = 'All';
  public selectedcode: string = "All";
  public selected_plantname: string;
  totals: any = [];
  grand_total_1: number = 0;
  grand_total_2: number = 0;

  manpowerno: number = 0;
  manhours: number = 0;

  constructor(
    public plantservice: PlantService,
    private datePipe: DatePipe,
    private lservice: LoginService,
    public attenSummary: AttendancesummaryService
  ) {
    this.monthNames = ['--', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
      'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];
    this.lservice.currentUser.subscribe(x => this.currentUser = x);

    /*  this.brand =
        ["ETP", "JIGGING", "LAB", "MAINTENANCE", "MOULDING", "MOULDING QUALITY", "PLATING", "QUALITY", "STORE", "IQC/PDI", "JIG MFG", "MOULDING T", "QUALITY ASSEMBLY", "SAP", "HK & DRIVER"];
    */
  }

  ngOnInit() {
    const me = this;
    this.date = new Date();
    this.month = this.date.getMonth() + 1;
    console.log("this.month : ", this.month);
    this.monthName = this.monthNames[this.month];
    console.log("this.month : ", this.monthName);
    this.selectedMonth(this.month);
    /* */

    /* */
    this.plantservice
      .sgetPlantData(me.currentUser.id)
      .toPromise()
      .then(res => {
        me.plantservice.splantlist = res as Plant[];
        //   me.selectedcode = me.plantservice.splantlist[0].plantcode;
        //  me.selected_plantname = me.plantservice.splantlist[0].plantshortname;
        // me.getData();
      });

  }
  selectedEnddate(ev) {
    this.selected_enddate = ev; // this.datePipe.transform(lastDay, "yyyy-MM-dd");
    this.getData();
  }
  selectedAh(ev) {
    this.selectedah = ev; // this.datePipe.transform(lastDay, "yyyy-MM-dd");
    this.getData();
  }
  selectedStartdate(ev) {
    // this.selected_enddate = this.datePipe.transform(lastDay, "yyyy-MM-dd");
    this.selected_startdate = ev; // this.datePipe.transform(firstDay, "yyyy-MM-dd");
    this.getData();
  }
  selectedMonth(ev) {
    this.month = ev;
    this.monthName = this.monthNames[this.month];
    const year = new Date().getFullYear();
    const month = this.monthName;
    const a = '1-' + month + '-' + year;
    const date = new Date(a);
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    console.log(firstDay);
    console.log(lastDay);

    this.current_month_enddate = this.datePipe.transform(lastDay, "yyyy-MM-dd");
    this.current_month_startdate = this.datePipe.transform(firstDay, "yyyy-MM-dd");

    this.selected_enddate = this.datePipe.transform(lastDay, "yyyy-MM-dd");
    this.selected_startdate = this.datePipe.transform(firstDay, "yyyy-MM-dd");

    console.log(this.current_month_startdate);
    console.log(this.current_month_enddate);

    this.getData();
  }
  selectedGrid(ev) {
    this.selectedcode = ev;
    this.getData();
  }
  getData() {
    const me = this;
    //all companies
    me.productions = [];
    me.subtitle = [];
    me.i = 0;
    me.brand = [];
    me.sales = [];
    me.companies = [];
    me.grand_total_1 = 0;
    me.grand_total_2 = 0;
    me.manpowerno = 0;
    me.manhours = 0;
    // All Company List
    this.attenSummary.getallHRsumcont(this.selected_startdate, this.selected_enddate, me.selectedah).toPromise()
      .then(res => {
        me.companies = res as Attendancesummary[];
        //me.company_name = me.companies[0].companyFName;
        //All Production List
        this.attenSummary.getallHRwdept(this.selected_startdate, me.selected_enddate, me.selectedah).toPromise()
          .then(res => {
            me.productions = res as Attendancesummary[];

            // Find Unique Dept. List
            me.productions.forEach(production => {
              me.brand.push(production.departmentFName);
              me.brand = me.brand.filter((v, i, a) => a.indexOf(v) === i);
            });
            // console.log(me.productions);
            if (me.companies) {
              for (let indexCompany = 0; indexCompany < me.companies.length; indexCompany++) {
                me.subtitle.push({ title: 'Head Count', total: 0, status: '1', });

                me.subtitle.push({ title: 'Manhoursworked', total: 0, status: '2', });


                me.companies[indexCompany].deptList = [...me.brand];
                me.companies[indexCompany].deptList2 = new Array();

                //ALREADY CHE  2 min 1 min
                for (let indexBrand = 0; indexBrand < me.brand.length; indexBrand++) {
                  me.companies[indexCompany].deptList2[indexBrand] = {
                    'departmentFName': me.brand[indexBrand],
                    'manhours': 0,
                    'manpowerno': 0
                  }; // set default value
                  for (let indexProduction = 0; indexProduction < me.productions.length; indexProduction++) {

                    if (me.productions[indexProduction].companyFName == me.companies[indexCompany].companyFName) {
                      if (me.productions[indexProduction].departmentFName == me.brand[indexBrand]) {
                        me.companies[indexCompany].deptList2[indexBrand] = {
                          'departmentFName': me.productions[indexProduction].departmentFName,
                          'manhours': (me.productions[indexProduction].manhours == null) ? 0 : me.productions[indexProduction].manhours,
                          'manpowerno': (me.productions[indexProduction].manpowerno == null) ? 0 : me.productions[indexProduction].manpowerno,
                        };
                      }
                    }
                  }
                }
              }
            }
            me.sales = [];
            for (let intBrand = 0; intBrand < me.brand.length; intBrand++) {
              // console.log(intBrand, me.brand[intBrand]);
              const dataList = []; //[1,2];
              for (let intCompany = 0; intCompany < me.companies.length; intCompany++) {

                // me.companies[intCompany].deptList2[intBrand].manpowerno_total = me.companies[intCompany].deptList2[intBrand].manpowerno_total + me.companies[intCompany].deptList2[intBrand].manpowerno;
                //me.companies[intCompany].deptList2[intBrand].manhours_total = me.companies[intCompany].deptList2[intBrand].manhours_total + me.companies[intCompany].deptList2[intBrand].manhours;

                dataList.push(me.companies[intCompany].deptList2[intBrand].manpowerno, me.companies[intCompany].deptList2[intBrand].manhours);
              }
              //console.log("dataList", dataList);
              me.sales.push({ 'brand': me.brand[intBrand], 'data': dataList });
            }

            for (let salesIndex = 0; salesIndex < me.sales.length; salesIndex++) {
              me.i = 0;
              me.manpowerno = 0;
              me.manhours = 0;
              for (let dataIndex = 0; dataIndex < me.sales[salesIndex].data.length; dataIndex++) {
                me.subtitle[me.i].total = me.subtitle[me.i].total + me.sales[salesIndex].data[dataIndex];

                if (me.subtitle[me.i].status == 1) {
                  me.grand_total_1 = me.grand_total_1 + me.sales[salesIndex].data[dataIndex];
                  me.manpowerno = me.manpowerno + me.sales[salesIndex].data[dataIndex];

                } else {
                  me.grand_total_2 = me.grand_total_2 + me.sales[salesIndex].data[dataIndex];
                  me.manhours = me.manhours + me.sales[salesIndex].data[dataIndex];
                }
                me.i++;
              }
              if (!me.sales[salesIndex].gtotal) {
                me.sales[salesIndex].gtotal = [];
              }
              me.sales[salesIndex].gtotal[0] = me.manpowerno;
              me.sales[salesIndex].gtotal[1] = me.manhours;
            }
            console.log("sales: ", me.sales);

          });
      });
  }

}
