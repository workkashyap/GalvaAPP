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
import { CaputilsService } from '../shared/caputils/caputils.service';

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
  public plantcode: any;
  public date: string;
  public Month: string;
  public x: number;
  public index: string;
  public actionvalue: string;
  public validQtyError = false;

  public monthNames: any;
  public d: any;

  selectedCaputils: CaputilsService;
  cols: any;

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

  ngOnInit() {
    const me = this;
    this.loading = true;
    this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    this.plantcode = 1010
    this.d = new Date();
    this.monthname = this.monthNames[this.d.getMonth()];
    this.x = this.monthNames.indexOf(this.monthname) + 1;
    this.index = this.x.toString();
    this.cols = [
      { field: "view", header: "Action" },
      { field: "entrydate", header: "Production Date" },
      { field: "plantcode", header: "Plant" },
      { field: "linetype", header: "Line Type" },
      { field: "plantround", header: "Plan Round" },
      { field: "actualround", header: "Actual Round" },
      { field: "percomplete", header: "Round %" }

    ];
    this.caputilsservice.getallDataMonth(this.index, this.plantcode);

    this.date = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    const date = this.datePipe.transform(new Date(), "ddMMyyyy");

    this.loading = false;

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
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }
  }

  onComplete(form: NgForm) {
    this.validQtyError = false;

      if (this.caputilsservice.caputilsData.linetype.length === 0 || this.caputilsservice.caputilsData.plantcode.length === 0) {
        this.toastr.error(
          "Save Failed.",
          "Add Required Fields."
        );
      }else{
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
          }else{
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
        }else{
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

  selectedGrid(ev) {
    this.selectedcode = ev;
    this.caputilsservice.getallDataMonth(this.index, this.selectedcode);
  }

  getselectedmonth() {
    this.Month = this.monthname;
    this.x = this.monthNames.indexOf(this.Month) + 1;
    this.index = this.x.toString();
    this.caputilsservice.getallDataMonth(this.index, this.selectedcode);
  }

}
