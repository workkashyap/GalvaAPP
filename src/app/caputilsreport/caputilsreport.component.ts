import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ProductionsService } from 'src/app/shared/productions/productions.service';
import { Router } from '@angular/router';
import { InboxService } from 'src/app/shared/inbox/inbox.service';
import { NgForm } from '@angular/forms';
import { ItemmstsService } from 'src/app/shared/itemmsts/itemmsts.service';
import { User } from 'src/app/shared/login/User.model';
import { LoginService } from 'src/app/shared/login/login.service';
import { PlantService } from 'src/app/shared/plant/plant.service';
import { Plant } from 'src/app/shared/plant/plant.model';
import { CaputilsService } from '../shared/caputils/caputils.service';
import { ContentObserver } from '@angular/cdk/observers';
import { Caputils2 } from '../shared/caputils/caputils2.model';

@Component({
  selector: 'app-caputilsreport',
  templateUrl: './caputilsreport.component.html',
  styleUrls: ['./caputilsreport.component.css'],
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
export class CaputilsreportComponent implements OnInit {

  public currentUser: User;
  public loading = false;
  public monthname: string;
  public selectedcode: any;
  public year: string;
  public yearname: string;
  public plantcode: any;
  public date: string;
  public Month: string;
  public x: number;
  public isReadOnly: boolean;
  public index: string;
  public actionvalue: string;
  public avgPer: any;
  public validQtyError = false;
  public incmarks: number;
  public typename: string;
  public type: string;

  public monthNames: any;
  public d: any;
  public totPlanRound: any = 0;
  public totActualRound: any = 0;
  public totAvgPer: any = 0;

  selectedCaputils: CaputilsService;
  cols: any;
  temprows: any;
  percaputils: Observable<Caputils2[]>;

  constructor(
    private route: Router,
    private datePipe: DatePipe,
    public productionsService: ProductionsService,
    public iservice: InboxService,
    public itmService: ItemmstsService,
    public lservice: LoginService,
    public plantservice: PlantService,
    public caputilsservice: CaputilsService,
    private toastr: ToastrService) {
    const me = this;
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    this.itmService.getallData();
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
      { field: "plantround", header: "Plan Round" },
      { field: "planremark", header: "Plan Remark" },
      { field: "actualround", header: "Actual Round" },
      { field: "actualremark", header: "Actual Remark" },
      { field: "percomplete", header: "Utilization %" },
    ];
    await this.caputilsservice.getallDataMonth_(this.yearname, this.index, this.plantcode, this.typename);

    this.date = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.incmarks = 0;

    this.caputilsservice.getCaputilsReason();
    const date = this.datePipe.transform(new Date(), "ddMMyyyy");

    this.loading = false;
    this.isReadOnly = false;

    this.plantservice
      .sgetPlantData(me.currentUser.id)
      .toPromise()
      .then(res => {
        me.plantservice.splantlist = [];
        const splantlist = res as Plant[];
        splantlist.forEach(splant => {
          me.plantservice.splantlist.push(splant);
        });
        me.selectedcode = me.plantservice.splantlist[0].plantcode;


        if (me.caputilsservice.id) {
          me.caputilsservice.caputilsbyid(me.caputilsservice.id)
            .toPromise()
            .then((res: any) => {
              this.caputilsservice.caputilsData = res; //as Productions[];
              this.caputilsservice.caputilsData.entrydate = this.datePipe.transform(this.caputilsservice.caputilsData.entrydate, "yyyy-MM-dd");
              if (this.caputilsservice.caputilsData.actualround > 0) {
                this.isReadOnly = true;
              } else {
                this.isReadOnly = false;
              }
            });
        } else {
          me.caputilsservice.caputilsData = {
            entrydate: me.date,
            plantcode: '',
            linetype: '',
            plantround: 0,
            actualround: 0,
            actualremark: '',
          };
        }

      });
    this.resetForm();
    this.calcTotal();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }
  }

  onComplete(form: NgForm) {
    this.validQtyError = false;

    if (this.caputilsservice.caputilsData.linetype.length === 0 || this.caputilsservice.caputilsData.plantcode.length === 0 || this.caputilsservice.caputilsData.actualremark.length === 0) {
      this.toastr.error(
        "Save Failed.",
        "Add Required Fields."
      );
    } else {
      if (this.actionvalue === 'Save') {

        this.loading = true;

        if (this.caputilsservice.caputilsData.id > 0) {
          this.caputilsservice.caputilsData.entrydate = this.datePipe.transform(this.caputilsservice.caputilsData.entrydate, "yyyy-MM-dd");

          this.caputilsservice.updatecaputils(this.caputilsservice.caputilsData.id).subscribe(res => {
            this.resetForm(form);
            this.toastr.success(
              "Successfully Updated.",
              "Production"
            );
            this.route.navigate(["./caputilsworker"]);
          }, err => {
            console.log(err);
          });
        } else {
          this.caputilsservice.caputilsData.entrydate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
          this.caputilsservice.savecaputils().subscribe(res => {
            console.log(this.caputilsservice.caputilsData);
            this.resetForm(form);
            this.toastr.success(
              'Successfully Saved.',
              'Production'
            );
            this.route.navigate(['./caputilsworker']);
          }, err => {
            console.log(err);
          });
        }
      } else {
        this.back();
      }
    }
  }

  onSaveClick() {
    this.actionvalue = 'Save';
    $('#basicExampleModal').modal('hide');
  }

  back() {
    this.iservice.uid = this.currentUser.id;
    this.route.navigate(['./caputilsworker']);
  }

  perCalc() {
    this.caputilsservice.caputilsData.percomplete = (this.caputilsservice.caputilsData.actualround / this.caputilsservice.caputilsData.plantround) * 100;
  }

  opendetail(id) {
    this.caputilsservice.id = id;
    const me = this;
    this.date = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    const date = this.datePipe.transform(new Date(), "ddMMyyyy");

    this.loading = false;
    this.isReadOnly = false;

    this.plantservice
      .sgetPlantData(me.currentUser.id)
      .toPromise()
      .then(res => {
        me.plantservice.splantlist = [];
        const splantlist = res as Plant[];
        splantlist.forEach(splant => {
          me.plantservice.splantlist.push(splant);
        });
        me.selectedcode = me.plantservice.splantlist[0].plantcode;


        if (me.caputilsservice.id) {
          me.caputilsservice.caputilsbyid(me.caputilsservice.id)
            .toPromise()
            .then((res: any) => {
              this.caputilsservice.caputilsData = res; //as Productions[];
              this.caputilsservice.caputilsData.entrydate = this.datePipe.transform(this.caputilsservice.caputilsData.entrydate, "yyyy-MM-dd");
              if (this.caputilsservice.caputilsData.actualround > 0) {
                this.isReadOnly = true;
              } else {
                this.isReadOnly = false;
              };
            });
        } else {
          me.caputilsservice.caputilsData = {
            entrydate: me.date,
            plantcode: '',
            linetype: '',
            plantround: 0,
            actualround: 0,
          };
        }

      });
    this.resetForm();
    $('#basicExampleModal').modal('show');
  }

  addNewMaterial() {
    this.caputilsservice.id = 0;
    this.route.navigate(["./caputilsworkerupdate"]);
  }

  async selectedGrid(ev) {
    this.selectedcode = ev;
    await this.caputilsservice.getallDataMonth_(this.yearname, this.index, this.selectedcode, this.typename);
    this.calcTotal();
  }

  async getselectedyear() {
    this.year = this.yearname;
    await this.caputilsservice.getallDataMonth_(this.yearname, this.index, this.selectedcode, this.typename);
    this.calcTotal();
  }

  async getselectedmonth() {
    this.Month = this.monthname;
    this.x = this.monthNames.indexOf(this.Month) + 1;
    this.index = this.x.toString();
    await this.caputilsservice.getallDataMonth_(this.yearname, this.index, this.selectedcode, this.typename);
    this.calcTotal();
  }
  async getselectedtype() {
    this.type = this.typename;
    await this.caputilsservice.getallDataMonth_(this.yearname, this.index, this.selectedcode, this.typename);
    this.calcTotal();
  }

  calcTotal() {
    this.totAvgPer = 0;
    this.totActualRound = 0;
    this.totPlanRound = 0;
    this.caputilsservice.caputilsList.forEach(element => {
      if (element.actualround != 0) {
        this.totPlanRound += element.plantround;
        this.totActualRound += element.actualround;
      }
    });
    this.temprows = this.caputilsservice.caputilsList;
    this.totAvgPer = (this.totActualRound / this.totPlanRound) * 100;
  }

  // filterReason(reason) {
  //   if(reason == "all"){
  //     this.caputilsservice.caputilsList = this.temprows;
  //   }else{
  //     this.caputilsservice.caputilsList = this.temprows.filter(e => e.reason === reason);
  //   }
  //   this.calcTotal();
  // }

}
