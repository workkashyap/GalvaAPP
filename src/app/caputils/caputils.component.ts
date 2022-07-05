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
  selector: 'app-caputils',
  templateUrl: './caputils.component.html',
  styleUrls: ['./caputils.component.css'],
  providers: [DatePipe],
})
export class CaputilsComponent implements OnInit {

  public currentUser: User;
  public selectedcode: any;
  public date: string;
  public selecteddate: any;
  public actionvalue: string;
  public loading = false;
  public validQtyError = false;

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
      this.date = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  
      const date = this.datePipe.transform(new Date(), "ddMMyyyy");
  
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
              entrydate: this.date,
              plantcode: '1010',
              linetype: '',
              plantround: 0,
              planremark: '',
            };
          }
  
        });
      this.resetForm();
    }
  
    plantcodeChange() {
      this.selectedcode = this.caputilsservice.caputilsData.plantcode;
    }

    dateChange() {
      this.selecteddate = this.caputilsservice.caputilsData.entrydate;
    }
  
    resetForm(form?: NgForm) {
      if (form != null) {
        form.form.reset();
      }
    }
  
    onComplete(form: NgForm) {
      this.validQtyError = false;
  
        if (this.caputilsservice.caputilsData.linetype.length === 0 || this.caputilsservice.caputilsData.plantcode.length === 0 || this.caputilsservice.caputilsData.planremark.length === 0) {
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
                this.route.navigate(["./caputilsview"]);
              }, err => {
                console.log(err);
              });
            }else{
              this.caputilsservice.caputilsData.entrydate = this.datePipe.transform(this.caputilsservice.caputilsData.entrydate, 'yyyy-MM-dd');
              this.caputilsservice.savecaputils().subscribe(res => {
                console.log(this.caputilsservice.caputilsData);
                this.resetForm(form);
                this.toastr.success(
                  'Successfully Saved.',
                  'Production'
                );
                this.route.navigate(['./caputilsview']);
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
      this.route.navigate(['./caputilsview']);
    }

}
