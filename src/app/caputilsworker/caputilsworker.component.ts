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
  selector: 'app-caputilsworker',
  templateUrl: './caputilsworker.component.html',
  styleUrls: ['./caputilsworker.component.css'],
  providers: [DatePipe]
})
export class CaputilsworkerComponent implements OnInit {

  public currentUser: User;
  public loading = false;
  public monthname: string;
  public selectedcode: any;
  public year: string;
  public yearname: string;
  public typename: string;
  public type: string;
  public plantcode: any;
  public date: string;
  public Month: string;
  public x: number;
  public isReadOnly: boolean;
  public index: string;
  public actionvalue: string;
  public avgPer: any;
  public validQtyError = false;

  public monthNames: any;
  public d: any;
  public totPlanRound: any = 0;
  public totActualRound: any = 0;

  selectedCaputils: CaputilsService;
  cols: any;
  percaputils: Observable<Caputils2[]>;
  reasonData: any[] = [];

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
      { field: "view", header: "Action" },
      { field: "entrydate", header: "Production Date" },
      { field: "plantcode", header: "Plant" },
      { field: "linetype", header: "Line Type" },
      { field: "plantround", header: "Plan Round" },
      { field: "actualround", header: "Actual Round" },
      { field: "actualremark", header: "Actual Remark" },
      { field: "percomplete", header: "Uitilization %" },

    ];
    await this.caputilsservice.getallDataMonth_(this.yearname, this.index, this.plantcode, this.typename);

    this.date = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    await this.caputilsservice.getAvgPer_(this.yearname, this.index, this.plantcode, this.typename);

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
    this.caputilsservice.getCaputilsReason();
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

    // tslint:disable-next-line: max-line-length
    if (this.caputilsservice.caputilsData.linetype.length === 0 || this.caputilsservice.caputilsData.plantcode.length === 0) {
      this.toastr.error(
        "Save Failed.",
        "Add Required Fields."
      );
    } else {
      if (this.actionvalue === 'Save') {

        this.loading = true;

        if (this.caputilsservice.caputilsData.id > 0) {
          this.caputilsservice.caputilsData.entrydate = this.datePipe.transform(this.caputilsservice.caputilsData.entrydate, 'yyyy-MM-dd');

          this.caputilsservice.updatecaputils(this.caputilsservice.caputilsData.id).subscribe(res => {
            this.resetForm(form);
            this.toastr.success(
              "Successfully Updated.",
              "Production"
            );
            this.route.navigateByUrl('./caputilsworker', { skipLocationChange: true }).then(() => {
              this.route.navigate(['./caputilsworker']);
            });

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
  }

  back() {
    this.iservice.uid = this.currentUser.id;
    this.route.navigate(['./caputilsworker']);
  }

  perCalc() {
    this.caputilsservice.caputilsData.percomplete = (this.caputilsservice.caputilsData.actualround / this.caputilsservice.caputilsData.plantround) * 100;
  }

  opendetail(data) {
    this.r = [];
    this.caputilsservice.id = data.id;
    const me = this;
    this.date = this.datePipe.transform(new Date(), "yyyy-MM-dd");

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
          me.caputilsservice.getCaputilsReasonFilter(data.entrydate.substring(0, data.entrydate.indexOf('T')), data.plantcode, data.linetype)
            .subscribe((res: any) => {
              this.reasonData = res;
              this.caputilsservice.caputilsData.reason = this.reasonData[0].reason;
              this.caputilsservice.caputilsData.reasoncount = this.reasonData[0].reasoncount;
              for (let i = 1; i < this.reasonData.length; i++) {
                const e = this.reasonData[i];
                this.r.push({ reason: e.reason, reasoncount: e.reasoncount });
              }
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
    await this.caputilsservice.getAvgPer_(this.yearname, this.index, this.selectedcode, this.typename);
    this.calcTotal();
  }

  async getselectedyear() {
    this.year = this.yearname;
    await this.caputilsservice.getallDataMonth_(this.yearname, this.index, this.selectedcode, this.typename);
    await this.caputilsservice.getAvgPer_(this.yearname, this.index, this.selectedcode, this.typename);
    this.calcTotal();
  }

  async getselectedmonth() {
    this.Month = this.monthname;
    this.x = this.monthNames.indexOf(this.Month) + 1;
    this.index = this.x.toString();
    await this.caputilsservice.getallDataMonth_(this.yearname, this.index, this.selectedcode, this.typename);
    await this.caputilsservice.getAvgPer_(this.yearname, this.index, this.selectedcode, this.typename);
    this.calcTotal();
  }
  async getselectedtype() {
    this.type = this.typename;
    await this.caputilsservice.getallDataMonth_(this.yearname, this.index, this.selectedcode, this.typename);
    await this.caputilsservice.getAvgPer_(this.yearname, this.index, this.selectedcode, this.typename);
    this.calcTotal();
  }

  calcTotal() {
    this.totActualRound = 0;
    this.totPlanRound = 0;
    this.caputilsservice.caputilsList.forEach(element => {
      this.totPlanRound += element.plantround;
      this.totActualRound += element.actualround;
    });
  }


  /****/
  r: any[] = [];
  rsn = { reason: null, reasoncount: null };
  data: any[] = [];

  addReason() {
    this.r.push(this.rsn);
    this.rsn = { reason: null, reasoncount: null }
  }
  //////////////
  onSave(form: NgForm) {
    this.data = [];
    delete this.caputilsservice.caputilsData.planremark;
    delete this.caputilsservice.caputilsData.actualremark;
    delete this.caputilsservice.caputilsData.percomplete;

    this.caputilsservice.caputilsData.id = 0;
    let obj: Object = this.caputilsservice.caputilsData;

    if (this.caputilsservice.caputilsData.reason != null && this.caputilsservice.caputilsData.reason != '' &&
      this.caputilsservice.caputilsData.reasoncount != null && this.caputilsservice.caputilsData.reasoncount != undefined) {
      obj['planround'] = obj['plantround'];
      delete obj['plantround'];
      this.data.push(obj);
    } else {
      this.toastr.error('Please fill the fields');
      return;
    }

    for (var i = 0; i < this.r.length; i++) {
      if (this.r[i].reason != null && this.r[i].reason != '') {
        if (this.r[i].reasoncount != null && this.r[i].reasoncount != 0) {
          const newobj = { ...this.caputilsservice.caputilsData };
          newobj.reasoncount = Number(this.r[i].reasoncount);
          newobj.reason = this.r[i].reason;
          let d = new Date(newobj.entrydate);
          let d2 = new Date(d);
          newobj.entrydate = new Date(d2.setMinutes(d.getMinutes() + ((i * 1) + 30))).toISOString();
          this.data.push(newobj);
        } else { this.toastr.error('Please fill the fields'); return; }
      }
    }
    if (this.data.length > 0) {
      this.r = [];
      console.log(this.r);
      this.caputilsservice.savecaputilswithreason(this.data).subscribe(response => {
        console.log('Data sent successfully:', response);
        this.toastr.success('Data sent successfully');
        this.route.navigateByUrl('./caputilsworker', { skipLocationChange: true }).then(() => {
          this.route.navigate(['./caputilsworker']);
        });
      }, error => {
        console.log(error);
        this.toastr.error('Could not save Data', 'Error');
      }
      );
    } else {
      this.toastr.error('Please fill the Data');
      return;
    }
    $('#basicExampleModal').modal('hide');
  }

  ////////////////
  validate(event, index) {
    let t = Number(this.caputilsservice.caputilsData.plantround) - Number(this.caputilsservice.caputilsData.actualround);
    let b: any = 0;
    b += Number(this.caputilsservice.caputilsData.reasoncount);
    for (var i = 0; i < this.r.length; i++) {
      if (this.r[i].reasoncount != null) {
        b += Number(this.r[i].reasoncount)
      }
    }
    if (b > t) {
      this.toastr.error('Enter Valid Data!!')
      if (event.target.name == "reasoncountt") {
        this.caputilsservice.caputilsData.reasoncount = null;
        this.caputilsservice.caputilsData.reason = null;
        event.target.value = null;
      } else {
        event.target.value = null;
        this.r[index].reasoncount = null;
        this.r[index].reason = null;
      }
    }
  }
}
