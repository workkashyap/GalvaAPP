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
  move555Sum: number = 0;
  move343Sum: number = 0;
  selectedItemrejarray: any[];
  filterItemrejarray: any[];

  holdqtySum: number = 0;
  completed_days: number = 0;
  holdnbufflist: any[];
  filterenable = false;
  iv: number;

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
    this.Fromdate = this.cDate;
    this.Todate = this.cDate;
    const me = this;
    this.loading = true;

    this.plantservice.getPlantData(this.currentUser.id).then(res => {
      if (me.plantservice.plantlist) {

        this.selectedtype = me.plantservice.plantlist[0].plantcode;
        me.DPservice.plantcode = me.plantservice.plantlist[0].plantcode;
        me.getData(me.plantservice.plantlist[0].plantcode);
        me.loading = false;
      } else {
        me.selectedtype = "0";
        me.DPservice.plantcode = '0';
        me.loading = false;
      }
    });
    this.cols = [
      // { field: "id", header: "ID" },
      { field: "aufnr", header: "aufnr" },
      { field: "budat", header: "budat" },
      { field: "charg", header: "Batch No." },
      //{ field: "werks", header: "werks" },
      //{ field: "bwart", header: "bwart" },
      // { field: "createddate", header: "Created Date" },
      //{ field: "shkzg", header: "shkzg" },
      { field: "itemcode", header: "Item Code" },
      { field: "itemdesc", header: "Item Desc." },
      { field: "menge", header: "Move343" },
      { field: "move555", header: "Move555" },
      { field: "buffqty", header: "buffqty" },
      { field: "holdqty", header: "holdqty" },
      { field: "status", header: "status" }
    ];
  }
  getData(plantcode) {
    const me = this;

    this.loading = true;

    this.hnbservice
      .getholdnbuffalldetail(plantcode, me.Fromdate, me.Todate)
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

  loadper(ev, dt) {
    this.filterenable = true;
    this.selectedItemrejarray = dt.value;
    this.iv = 0;
    this.filterItemrejarray = [];
    // console.log(this.selectedItemrejarray[0].id);
    for (const c of this.selectedItemrejarray) {
      if (
        c.itemcode.toString().includes(ev.toString()) ||
        c.itemdesc.toString().includes(ev.toString()) ||
        c.budat.toString().includes(ev.toString()) ||
        c.aufnr.toString().includes(ev.toString()) ||
        c.charg.toString().includes(ev.toString())
      ) {
        this.filterItemrejarray.push(this.selectedItemrejarray[this.iv]);
        this.iv += 1;
      } else {
        this.iv += 1;
      }
    }
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
    if (ev.target.checked) {
      this.completed_days = 0;
    } else {
      this.completed_days = 1;
    }
    this.filterByStatus();
  }
  filterByStatus() {
    const me = this;
    console.log(me.completed_days);
    this.hnbservice.holdnbufflist = [];
    if (this.hnbservice && this.holdnbufflist) {
      for (const rq of this.holdnbufflist) {
        if (rq.status == me.completed_days) {
          me.hnbservice.holdnbufflist.push(rq);
        }
      }
      //return this.holdqtySum;
    }
  }
  move555Total() {
    this.move555Sum = 0;

    if (this.filterenable == true) {
      for (const rq of this.filterItemrejarray) {
        this.move555Sum += rq.move555;
      }
      return this.move555Sum;
    }
    for (const rq of this.hnbservice.holdnbufflist) {
      this.move555Sum += rq.move555;
    }
    return this.move555Sum;
  }
  move343Total() {
    this.move343Sum = 0;
    if (this.filterenable == true) {
      for (const rq of this.filterItemrejarray) {
        this.move343Sum += rq.menge;
      }
      return this.move343Sum;
    }

    for (const rq of this.hnbservice.holdnbufflist) {
      this.move343Sum += rq.menge;
    }
    return this.move343Sum;
  }
  buffqtyTotle() {
    this.buffqtySum = 0;
    if (this.filterenable == true) {
      for (const rq of this.filterItemrejarray) {
        this.buffqtySum += rq.buffqty;
      }
      return this.buffqtySum;
    }
    for (const rq of this.hnbservice.holdnbufflist) {
      this.buffqtySum += rq.buffqty;
    }
    return this.buffqtySum;
  }
  holdqtyTotal() {
    this.holdqtySum = 0;

    if (this.filterenable == true) {
      for (const rq of this.filterItemrejarray) {
        this.holdqtySum += rq.holdqty;
      }
      return this.holdqtySum;
    }

    for (const rq of this.hnbservice.holdnbufflist) {
      this.holdqtySum += rq.holdqty;
    }
    return this.holdqtySum;
  }

}
