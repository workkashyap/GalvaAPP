import { Component, OnInit } from "@angular/core";
import { User } from "../shared/login/User.model";
import { Inbox } from "../shared/inbox/inbox.model";
import { LoginService } from "../shared/login/login.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { InboxService } from "../shared/inbox/inbox.service";
import { DailyproductionService } from "../shared/dailyProduction/dailyproduction.service";
import { PlantService } from "../shared/plant/plant.service";
import { Dailyproduction } from "../shared/dailyProduction/dailyproduction.model";

@Component({
  selector: "app-rejection",
  templateUrl: "./rejection.component.html",
  styleUrls: ["./rejection.component.css"]
})
export class RejectionComponent implements OnInit {
  currentUser: User;
  User: string;
  Id: number;
  inbox: Inbox[];
  subject: string[] = [];
  public loading = false;
  cpage: {};

  constructor(
    private toastr: ToastrService,
    public service: InboxService,
    public lservice: LoginService,
    public DPservice: DailyproductionService,
    public plantservice: PlantService,
    private route: Router
  ) {
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
  }

  ngOnInit() {
    this.loading = true;
    this.DPservice.getDailyPReject(1010)
      .toPromise()
      .then(res => {
        this.DPservice.dailyprodlist = res as Dailyproduction[];
        this.loading = false;
        console.log(res);
      });
    this.plantservice.getPlantData();
  }

  openRejectiondetail(id) {
    this.DPservice.id = id;
    this.service.uid = this.currentUser.id;
    this.route.navigate(["/rejection-detail"]);
  }

  public SelectedNotification() {
    return this.service.inboxlist.filter(x => x.avgrejper >= 15);
  }
  selectedGrid(ev) {
    this.loading = true;
    this.DPservice.getDailyPReject(ev)
      .toPromise()
      .then(res => {
        this.DPservice.dailyprodlist = res as Dailyproduction[];
        this.loading = false;
      });
  }
}
