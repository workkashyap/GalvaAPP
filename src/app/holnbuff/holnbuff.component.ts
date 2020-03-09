import { Component, OnInit } from "@angular/core";
import { User } from "../shared/login/User.model";
import { Inbox } from "../shared/inbox/inbox.model";
import { PlantService } from "../shared/plant/plant.service";
import { DailyproductionService } from "../shared/dailyProduction/dailyproduction.service";
import { HoldnbuffService } from "../shared/holdnbuff/holdnbuff.service";
import { Holdnbuff } from "../shared/holdnbuff/holdnbuff.model";
import { LoginService } from "../shared/login/login.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-holnbuff",
  templateUrl: "./holnbuff.component.html",
  styleUrls: ["./holnbuff.component.css"],
  providers: [DatePipe]
})
export class HolnbuffComponent implements OnInit {
  public currentUser: User;
  public loading = false;
  public inbox: Inbox;
  public cDate: string;
  public todayDate: Date;
  public login: string;
  public Fromdate: string;
  public Todate: string;
  public selectedtype: string;
  cols: any[];
  subcols: any[];

  constructor(
    public plantservice: PlantService,
    public DPservice: DailyproductionService,
    private lservice: LoginService,
    private datePipe: DatePipe,
    public hnbservice: HoldnbuffService
  ) {
    this.selectedtype = "1010";
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    this.cDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  }

  ngOnInit() {
    this.Fromdate = this.cDate;
    this.Todate = this.cDate;
    this.plantservice.getPlantData(this.currentUser.id);
    this.DPservice.plantcode = "1010";

    this.cols = [
      // { field: "id", header: "ID" },
      { field: "aufnr", header: "aufnr" },
      { field: "budat", header: "budat" },
      { field: "charg", header: "charg" },
      { field: "werks", header: "werks" },
      { field: "bwart", header: "bwart" },
      { field: "createddate", header: "Created Date" },
      { field: "shkzg", header: "shkzg" },
      { field: "buffqty", header: "buffqty" },
      { field: "holdqty", header: "holdqty" },
      { field: "status", header: "status" }
    ];

    this.loading = true;
    this.hnbservice
      .getholdnbuffalldetail("1010", this.Fromdate, this.Todate)
      .toPromise()
      .then(res => {
        this.hnbservice.holdnbufflist = res as Holdnbuff[];
        this.loading = false;
      });
  }
}
