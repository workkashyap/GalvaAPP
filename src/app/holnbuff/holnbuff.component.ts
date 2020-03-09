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
  buffqtySum: number = 0;
  holdqtySum: number = 0;
  completed_days: number=0;
  holdnbufflist: any[];
  constructor(
    public plantservice: PlantService,
    public DPservice: DailyproductionService,
    private lservice: LoginService,
    private datePipe: DatePipe,
    public hnbservice: HoldnbuffService
  ) {
    this.selectedtype = "1010";
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    this.cDate = this.datePipe.transform((new Date()), "yyyy-MM-dd");
   // this.cDate = "2020-02-03";
  }

  ngOnInit() {
    const me =this;

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

    console.log("hi");
    this.hnbservice
      .getholdnbuffalldetail("1010", me.Fromdate, me.Todate)
      .toPromise()
      .then(res => {
        console.log("hi");
        // this.hnbservice.holdnbufflist = res as Holdnbuff[];
        me.holdnbufflist = res as Holdnbuff[];
        me.filterByStatus();
        me.loading = false;
      });
  }
  selectedGrid(ev) {
    this.selectedtype = ev;
    const me = this;
    this.hnbservice
      .getholdnbuffalldetail(ev, this.Fromdate, this.Todate)
      .toPromise()
      .then(res => {
        //this.hnbservice.holdnbufflist = res as Holdnbuff[];
        me.holdnbufflist = res as Holdnbuff[];
        me.filterByStatus();
        me.loading = false;
      });
  }
  loaddata() {
    const me = this;
    this.hnbservice
      .getholdnbuffalldetail(this.selectedtype, this.Fromdate, this.Todate)
      .toPromise()
      .then(res => {
        //this.hnbservice.holdnbufflist = res as Holdnbuff[];
        me.holdnbufflist = res as Holdnbuff[];
        me.filterByStatus();
        me.loading = false;
      });
  }
  statusFilter(ev) {
    if(ev.target.checked){
      this.completed_days = 0;
    }else
    {
      this.completed_days = 1;
    }
    this.filterByStatus();
  }
  filterByStatus() {
    const me = this;
    console.log(me.completed_days);
    this.hnbservice.holdnbufflist =[];
    if (this.hnbservice && this.holdnbufflist) {
      for (const rq of this.holdnbufflist) {
        if(rq.status==me.completed_days){
          me.hnbservice.holdnbufflist.push(rq);
        }
      } 
      //return this.holdqtySum;
    }
  }
  buffqtyTotle() {
    this.buffqtySum = 0;
    for (const rq of this.hnbservice.holdnbufflist) {
      this.buffqtySum += rq.buffqty;
    }
    return this.buffqtySum;
  }
  holdqtyTotal() {
    this.holdqtySum = 0;
    for (const rq of this.hnbservice.holdnbufflist) {
      this.holdqtySum += rq.holdqty;
    }
    return this.holdqtySum;
  }

}
