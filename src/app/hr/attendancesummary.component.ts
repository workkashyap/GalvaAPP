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
  cols: any = []
  public selectedcode: string = "All";
  company_name: string;
  public selected_plantname: string;
  companySelect
  constructor(
    public plantservice: PlantService,
    private lservice: LoginService,
    public attenSummary: AttendancesummaryService
  ) {
    this.monthNames = ['--', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
      'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];
    this.lservice.currentUser.subscribe(x => this.currentUser = x);
    this.cols = [
      { field: 'departmentFName', header: 'Customer Name' },
      { field: 'manhours', header: 'Material' },
      { field: 'manpowerno', header: 'Material' },

    ];

    this.subtitle.push('Manpower (Nos.)');
    this.subtitle.push('Manhours Worked');
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
    this.plantservice
      .sgetPlantData(me.currentUser.id)
      .toPromise()
      .then(res => {
        me.plantservice.splantlist = res as Plant[];
        //   me.selectedcode = me.plantservice.splantlist[0].plantcode;
        //  me.selected_plantname = me.plantservice.splantlist[0].plantshortname;
        me.getData();
      });

  }
  selectedMonth(ev) {
    this.month = ev;
    this.getData();
  }
  selectedGrid(ev) {
    this.company_name = ev;
    this.getProductionList();
  }
  getData() {
    const me = this;
    //all companies
    me.productions = [];
    me.subtitle = [];
    me.totempworked = [];
    me.totempworked2 = [];
    me.i = 0;
    me.brand = [];
    me.sales = [];
    me.companies = [];

    // All Company List
    this.attenSummary.getallHRsumcont(this.month, me.selectedcode).toPromise()
      .then(res => {
        me.companies = res as Attendancesummary[];
        me.company_name = me.companies[0].companyFName;
        //All Production List
        me.getProductionList();
      });
  }
  getProductionList() {
    const me = this;
    me.productions = [];
    this.loading = true;
    this.attenSummary.getallHRwdept(this.month, me.selectedcode, me.company_name).toPromise()
      .then(res => {
        this.loading = false;

        me.productions = res as Attendancesummary[];
        // Find Unique Dept. List
        me.productions.forEach(production => {
          me.brand.push(production.departmentFName);
          me.brand = me.brand.filter((v, i, a) => a.indexOf(v) === i);
        });
      }, erro => {
        this.loading = false;

      });
  }
}
