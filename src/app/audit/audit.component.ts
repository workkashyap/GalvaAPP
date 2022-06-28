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
import { AuditService } from '../shared/audit/audit.service';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css'],
  providers: [DatePipe],
})
export class AuditComponent implements OnInit {

  public currentUser: User;
  public selectedcode: any;
  public selecteddate: any;
  public selectedvalue: any;
  public date: string;
  public insOrdeno: number;
  public actionvalue: string;
  public loading = false;
  public validQtyError = false;
  public validRejQtyError = false;
  public resColor = [
    {id: 0, name: "Red"},
    {id: 3, name: "Yellow"},
    {id: 5, name: "Green"},
 ];

  constructor(
    private route: Router,
    private datePipe: DatePipe,
    public productionsService: ProductionsService,
    public iservice: InboxService,
    public itmService: ItemmstsService,
    public lservice: LoginService,
    public plantservice: PlantService,
    public auditservice: AuditService,
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


        if (me.auditservice.id) {
          me.auditservice.auditbyid(me.auditservice.id)
            .toPromise()
            .then((res: any) => {
              this.auditservice.auditData = res; //as Productions[];
              this.auditservice.auditData.audit_date = this.datePipe.transform(this.auditservice.auditData.audit_date, "yyyy-MM-dd");
            });
        } else {
          me.auditservice.auditData = {
            audit_date: this.date,
            plantcode: '1010',
            customer: '',
          };
        }

      });
    this.resetForm();
  }

  plantcodeChange() {
    this.selectedcode = this.auditservice.auditData.plantcode;
  }

  dateChange() {
    this.selecteddate = this.auditservice.auditData.audit_date;
  }

  valueChange() {
    this.selectedvalue = this.auditservice.auditData.result;
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }
  }

  onComplete(form: NgForm) {
    this.validQtyError = false;

      if (this.auditservice.auditData.customer.length === 0 || this.auditservice.auditData.plantcode.length === 0) {
        this.toastr.error(
          "Save Failed.",
          "Add Required Fields."
        );
      }else{
        if (this.actionvalue === 'Save') {
  
          this.loading = true;
  
          if (this.auditservice.auditData.id > 0) {
            this.auditservice.auditData.audit_date = this.datePipe.transform(this.auditservice.auditData.audit_date, "yyyy-MM-dd");
    
            this.auditservice.updateaudit(this.auditservice.auditData.id).subscribe(res => {
              this.resetForm(form);
              this.toastr.success(
                "Successfully Updated.",
                "Production"
              );
              this.route.navigate(["./auditview"]);
            }, err => {
              console.log(err);
            });
          }else{
            this.auditservice.auditData.audit_date = this.datePipe.transform(this.auditservice.auditData.audit_date, 'yyyy-MM-dd');
            console.log(this.auditservice.auditData.audit_date);
            this.auditservice.saveaudit().subscribe(res => {
              console.log(this.auditservice.auditData);
              this.resetForm(form);
              this.toastr.success(
                'Successfully Saved.',
                'Production'
              );
              this.route.navigate(['./auditview']);
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
    this.route.navigate(['./auditview']);
  }

}
