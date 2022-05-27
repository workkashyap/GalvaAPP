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
import { RejectionreviewService } from '../shared/rejectionreview/rejectionreview.service';

@Component({
  selector: 'app-rejectionreview',
  templateUrl: './rejectionreview.component.html',
  styleUrls: ['./rejectionreview.component.css'],
  providers: [DatePipe],
})
export class RejectionreviewComponent implements OnInit {

  public currentUser: User;
  public selectedcode: any;
  public selectedvalue: any;
  public date: string;
  public insOrdeno: number;
  public actionvalue: string;
  public loading = false;
  public validQtyError = false;
  public validRejQtyError = false;
  filteredCountries: any[];

  constructor(private route: Router,
    private datePipe: DatePipe,
    public productionsService: ProductionsService,
    public iservice: InboxService,
    public itmService: ItemmstsService,
    public lservice: LoginService,
    public plantservice: PlantService,
    public rejectionreviewservice: RejectionreviewService,
    private toastr: ToastrService) {
      const me = this;
      this.lservice.currentUser.subscribe(x => (this.currentUser = x));
      this.itmService.getallDataQ();
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


        if (me.rejectionreviewservice.id) {
          me.rejectionreviewservice.rejbyid(me.rejectionreviewservice.id)
            .toPromise()
            .then((res: any) => {
              this.rejectionreviewservice.rejectionreviewData = res; //as Productions[];
              this.rejectionreviewservice.rejectionreviewData.reviewdate = this.datePipe.transform(this.rejectionreviewservice.rejectionreviewData.reviewdate, "yyyy-MM-dd");
            });
        } else {
          me.rejectionreviewservice.rejectionreviewData = {
            reviewdate: me.date,
            plant: '',
            reasonForReview: '',
            materialName: '',
            materialCode: '',
            inspectedParts: 0,
            okParts: 0,
            sellPrice: 0,
            inspectValue: 0,
            okValue: 0,
            rejectValue: 0,
          };
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

  valueM(v) {
    this.rejectionreviewservice.rejectionreviewData.materialName = v.itemname;
    this.rejectionreviewservice.rejectionreviewData.materialCode = v.itemcode.toString();
  }

  plantcodeChange() {
    this.selectedcode = this.rejectionreviewservice.rejectionreviewData.plant;
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }
  }

  onComplete(form: NgForm) {
    this.validQtyError = false;

      if (this.rejectionreviewservice.rejectionreviewData.materialName.length === 0 || this.rejectionreviewservice.rejectionreviewData.plant.length === 0) {
        this.toastr.error(
          "Save Failed.",
          "Add Required Fields."
        );
      }else{
        if (this.actionvalue === 'Save') {
  
          this.loading = true;
  
          if (this.rejectionreviewservice.rejectionreviewData.id > 0) {
            this.rejectionreviewservice.rejectionreviewData.reviewdate = this.datePipe.transform(this.rejectionreviewservice.rejectionreviewData.reviewdate, "yyyy-MM-dd");
    
            this.rejectionreviewservice.updaterej(this.rejectionreviewservice.rejectionreviewData.id).subscribe(res => {
              this.resetForm(form);
              this.toastr.success(
                "Successfully Updated.",
                "Production"
              );
              this.route.navigate(["./rejectionreviewview"]);
            }, err => {
              console.log(err);
            });
          }else{
            this.rejectionreviewservice.rejectionreviewData.reviewdate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
            console.log(this.rejectionreviewservice.rejectionreviewData.reviewdate);
            this.rejectionreviewservice.saverej().subscribe(res => {
              console.log(this.rejectionreviewservice.rejectionreviewData);
              this.resetForm(form);
              this.toastr.success(
                'Successfully Saved.',
                'Production'
              );
              this.route.navigate(['./rejectionreviewview']);
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
    this.route.navigate(['./rejectionreviewview']);
  }

}
