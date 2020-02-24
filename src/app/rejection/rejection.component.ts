import { Component, OnInit } from '@angular/core';
import { User } from '../shared/login/User.model';
import { Inbox } from '../shared/inbox/inbox.model';
import { LoginService } from '../shared/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { InboxService } from '../shared/inbox/inbox.service';
import { DailyproductionService } from '../shared/dailyProduction/dailyproduction.service';
import { PlantService } from '../shared/plant/plant.service';
import { Dailyproduction } from '../shared/dailyProduction/dailyproduction.model';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-rejection',
  templateUrl: './rejection.component.html',
  styleUrls: ['./rejection.component.css'],
  providers: [DatePipe]
})
export class RejectionComponent implements OnInit {
  currentUser: User;
  User: string;
  Id: number;
  inbox: Inbox[];
  subject: string[] = [];
  public loading = false;
  marked = false;
  fDate: string;
  tDate: string;
  selectedPlant: string;
  mode: string;
  modename: string;
  cpage: {};

  constructor(
    public datePipe: DatePipe,
    public service: InboxService,
    public lservice: LoginService,
    public DPservice: DailyproductionService,
    public plantservice: PlantService,
    private route: Router
  ) {
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
  }

  ngOnInit() {
    this.fDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.tDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.plantservice.getPlantData(this.currentUser.id);
    if (this.selectedPlant !== '')
    {
      this.selectedPlant = this.DPservice.plantcode;
    }
  }
  Loadrec() {
    this.GetRejectionAPI();
  }
  openRejectiondetail(id, date) {
    this.DPservice.id = id;
    this.DPservice.date = date;
    this.service.uid = this.currentUser.id;
    if (this.selectedPlant != null)
    {
      this.DPservice.plantcode = this.selectedPlant;
    }
    this.route.navigate(['/rejection-detail']);
  }

  public SelectedNotification() {
    return this.service.inboxlist.filter(x => x.avgrejper >= 15);
  }
  selectedGrid(ev) {
    this.selectedPlant = ev;
  }
 
  checkchange(e) {
    this.marked = e.target.checked;
  } 

  GetRejectionAPI() {
    if (this.marked === true)
    {
      this.modename = '';
      this.mode = '';
      this.loading = true;
      console.log(this.fDate);
      this.DPservice.getDailyPReject(this.selectedPlant, this.fDate, this.tDate)
        .toPromise()
        .then(res => {
          this.DPservice.dailyprodlist = res as Dailyproduction[];
          this.loading = false;
        });
   }
   else {
    this.loading = true;
    this.DPservice.getDailyPRejectmode(this.selectedPlant,  this.mode)
      .toPromise()
      .then(res => {
        this.DPservice.dailyprodlist = res as Dailyproduction[];
        this.loading = false;
      });
  }
}
monthclick() {
  this.mode = 'M';
  this.modename = 'Current Month';
}
weekclick() {
  this.mode = 'W';
  this.modename = 'Current Week';
}
dayclick() {
  this.mode = 'D';
  this.modename = 'Today';
}
}
