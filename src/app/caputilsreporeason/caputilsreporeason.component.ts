import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ProductionsService } from 'src/app/shared/productions/productions.service';
import { Router } from '@angular/router';
import { InboxService } from 'src/app/shared/inbox/inbox.service';
import { ItemmstsService } from 'src/app/shared/itemmsts/itemmsts.service';
import { User } from 'src/app/shared/login/User.model';
import { LoginService } from 'src/app/shared/login/login.service';
import { PlantService } from 'src/app/shared/plant/plant.service';
import { Plant } from 'src/app/shared/plant/plant.model';
import { CaputilsService } from '../shared/caputils/caputils.service';

@Component({
  selector: 'app-caputilsreporeason',
  templateUrl: './caputilsreporeason.component.html',
  styleUrls: ['./caputilsreporeason.component.css'],
  providers: [DatePipe],
  styles: [
    `
      :host ::ng-deep .ui-table .ui-table-thead > tr > th {
        position: -webkit-sticky;
        position: sticky;
        background: blue;
        color: white;
        font-size:10px;
        top: 0px;
        z-index: 1;
      }

      :host ::ng-deep .ui-table-resizable > .ui-table-wrapper {
        overflow-x: initial !important;
      }

      :host ::ng-deep .ui-table-resizable .ui-resizable-column {
        position: sticky !important;
      }

      @media screen and (max-width: 64em) {
        :host ::ng-deep .ui-table .ui-table-thead > tr > th {
          top: 0px;
        }
      }
    `
  ],
})
export class CaputilsreporeasonComponent implements OnInit {

  public currentUser: User;
  public loading = false;
  public monthname: string;
  public selectedcode: any;
  public year: string;
  public yearname: string;
  public plantcode: any;
  public date: string;
  public reason: string = 'all';
  public x: number;
  public isReadOnly: boolean;
  public index: string;
  public incmarks: number;
  public typename: string;
  public type: string;

  public monthNames: any;
  public d: any;
  public totPlanRound: any = 0;
  public totActualRound: any = 0;

  selectedCaputils: CaputilsService;
  cols: any;

  rowData: any[] = [];
  temprows: any[] = [];

  constructor(
    private route: Router,
    private datePipe: DatePipe,
    public productionsService: ProductionsService,
    public iservice: InboxService,
    // public itmService: ItemmstsService,
    public lservice: LoginService,
    public plantservice: PlantService,
    public caputilsservice: CaputilsService,
  ) {
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    // this.itmService.getallData();
  }

  async ngOnInit() {
    const me = this;
    this.loading = true;
    this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    this.plantcode = 1010;
    this.typename = 'ALL';
    this.d = new Date();
    this.monthname = this.monthNames[this.d.getMonth()];
    this.yearname = this.d.getFullYear();
    this.x = this.monthNames.indexOf(this.monthname) + 1;
    this.index = this.x.toString();
    this.cols = [
      { field: "entrydate", header: "Production Date" },
      { field: "plantcode", header: "Plant" },
      { field: "linetype", header: "Line Type" },
      { field: "planround", header: "Plan Round" },
      { field: "actualround", header: "Actual Round" },
      { field: "reason", header: "Reason" },
      { field: "reasoncount", header: "Reason Count" },
    ];

    this.date = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.loading = false;
    this.caputilsservice.getCaputilsReason();

    await this.plantservice
      .sgetPlantData(me.currentUser.id)
      .toPromise()
      .then(res => {
        me.plantservice.splantlist = [];
        const splantlist = res as Plant[];
        splantlist.forEach(splant => {
          me.plantservice.splantlist.push(splant);
        });
        me.selectedcode = me.plantservice.splantlist[0].plantcode;
        // if (me.caputilsservice.id) {
        //   me.caputilsservice.caputilsbyid(me.caputilsservice.id)
        //     .toPromise()
        //     .then((res: any) => {
        //       this.caputilsservice.caputilsData = res; //as Productions[];
        //       this.caputilsservice.caputilsData.entrydate = this.datePipe.transform(this.caputilsservice.caputilsData.entrydate, "yyyy-MM-dd");
        //       if (this.caputilsservice.caputilsData.actualround > 0) {
        //         this.isReadOnly = true;
        //       } else {
        //         this.isReadOnly = false;
        //       }
        //     });
        // } else {
        //   me.caputilsservice.caputilsData = {
        //     entrydate: me.date,
        //     plantcode: '',
        //     linetype: '',
        //     plantround: 0,
        //     actualround: 0,
        //     actualremark: '',
        //   };
        // }
      });

    await this.caputilsservice.getCaputilsReasonFilter(this.yearname + '-' + this.x + '-12',
      this.selectedcode, this.typename).toPromise().then((res: any) => { this.rowData = res });
    this.calcTotal();
  }

  async selectedGrid(ev) {
    this.selectedcode = ev;
    await this.caputilsservice.getCaputilsReasonFilter(this.yearname + '-' + this.x + '-12',
      this.selectedcode, this.typename).toPromise().then((res: any) => { this.rowData = res });
    this.calcTotal();
  }

  async getselectedyear() {
    this.year = this.yearname;
    await this.caputilsservice.getCaputilsReasonFilter(this.year + '-' + this.x + '-12',
      this.selectedcode, this.typename).toPromise().then((res: any) => { this.rowData = res });
    this.calcTotal();
  }

  async getselectedmonth() {
    await this.caputilsservice.getCaputilsReasonFilter(this.yearname + '-' + this.x + '-12',
      this.selectedcode, this.typename).toPromise().then((res: any) => { this.rowData = res });
    this.calcTotal();
  }

  async getselectedtype() {
    this.type = this.typename;
    await this.caputilsservice.getCaputilsReasonFilter(this.yearname + '-' + this.x + '-12',
      this.selectedcode, this.type).toPromise().then((res: any) => { this.rowData = res });
    this.calcTotal();
  }

  calcTotal() {
    this.totActualRound = 0;
    this.totPlanRound = 0;
    this.rowData.forEach(element => {
      this.totPlanRound += element.planround;
      this.totActualRound += element.actualround;
    });
    this.temprows = this.rowData;
    this.filterReason();
  }

  filterReason() {
    if (this.reason == "all") {
      this.rowData = this.temprows;
    } else {
      this.rowData = [];
      this.temprows.forEach(e => {
        if (e.reason == this.reason) {
          this.rowData.push(e);
        }
      });
    }
    this.totActualRound = 0;
    this.totPlanRound = 0;
    this.rowData.forEach(element => {
      this.totPlanRound += element.planround;
      this.totActualRound += element.actualround;
    });
  }

}
