import { Component, OnInit } from "@angular/core";
import { User } from "src/app/shared/login/User.model";
import { Inbox } from "src/app/shared/inbox/inbox.model";
import { ActionplanService } from "src/app/shared/inbox/actionplan.service";
import { ToastrService } from "ngx-toastr";
import { LoginService } from "src/app/shared/login/login.service";
import { ActivatedRoute } from "@angular/router";
import { InboxService } from "src/app/shared/inbox/inbox.service";
import { DatePipe } from "@angular/common";
import { NgForm } from "@angular/forms";

import { Router } from "@angular/router";
import { DailyproductionService } from "src/app/shared/dailyProduction/dailyproduction.service";
import { UserService } from "src/app/shared/user/user.service";
import { PlantService } from "src/app/shared/plant/plant.service";
import { Itemwiserej } from "src/app/shared/dailyProduction/itemwiserej.model";
import { TopDefect } from "src/app/shared/dailyProduction/topdefect.model";
import { ItemwiseRejDetail } from "src/app/shared/dailyProduction/itemwiserejdetail.model";

@Component({
  selector: "app-rejection-main",
  templateUrl: "./rejection-main.component.html",
  styleUrls: ["./rejection-main.component.css"],
  providers: [DatePipe],
  styles: [
    `
      :host ::ng-deep .ui-table .ui-table-thead > tr > th {
        position: -webkit-sticky;
        position: sticky;
        background: blue;
        color: white;
        top: 0px;
        z-index: 1;
      }

      :host ::ng-deep .ui-table-resizable > .ui-table-wrapper {
        overflow-x: initial !important;
      }

      :host ::ng-deep .ui-table-resizable .ui-resizable-column {
        position: sticky !important;
      }

      @media screen and (max-width: 64em) {
        :host ::ng-deep .ui-table .ui-table-thead > tr > th {
          top: 0px;
        }
      }
    `
  ]
})
export class RejectionMainComponent implements OnInit {
  public currentUser: User;
  public loading = false;
  public inbox: Inbox;
  public cDate: string;
  public todayDate: Date;
  public login: string;
  public Fromdate: string;
  public Todate: string;
  public selectedPlant: string;
  public selectedtype: string;
  cols: any[];
  subcols: any[];
  editcols: any[];
  actions: any[];
  selectedItemrej: ItemwiseRejDetail;
  selectedItemrejarray: ItemwiseRejDetail[] = [];
  filterItemrejarray: ItemwiseRejDetail[] = [];
  public totalRejValueSum: any;
  public totalQtySum: any;
  public plant_name: string;
  totalRejQty: number;
  totalinsQty: number;
  totalRejPer: number;
  totalRejVal: number;
  iv: number;
  filterenable = false;
  constructor(
    public acservice: ActionplanService,
    private toastr: ToastrService,
    private lservice: LoginService,
    private route: ActivatedRoute,
    public service: InboxService,
    public uservice: UserService,
    public DPservice: DailyproductionService,
    private router: Router,
    private datePipe: DatePipe,
    public plantservice: PlantService
  ) {
    this.selectedtype = "CHROME";
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    this.cDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  }
  onselecttype(ev) {
    this.selectedtype = ev;
  }

  onviewDetail() {
    this.filterenable = false;
    this.loading = true;
    if (this.selectedtype !== "") {
      this.selectedtype = this.selectedtype;
    } else {
      this.selectedtype = "NULL";
    }
    this.DPservice.getRejectmaindetail(
      this.selectedPlant,
      this.selectedtype,
      this.Fromdate,
      this.Todate
    )
      .toPromise()
      .then(res => {
        this.DPservice.itemwiserejdetaillist = res as ItemwiseRejDetail[];
        this.loading = false;
      });

    this.rejectpersum();
    this.rejectqtysum();
    this.rejectvaluesum();
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
        c.itemname.toString().includes(ev.toString()) ||
        c.pstngdate.toString().includes(ev.toString()) ||
        c.item_type
          .toString()
          .includes(
            ev.toString() ||
              c.plant.toString().includes(ev.toString()) ||
              c.id.toString().includes(ev.toString())
          )
      ) {
        this.filterItemrejarray.push(this.selectedItemrejarray[this.iv]);
        this.iv += 1;
      } else {
        this.iv += 1;
      }
    }
    this.rejectpersum();
    this.rejectqtysum();
    this.rejectvaluesum();
  }
  refresh() {}
  ngOnInit() {
    this.Fromdate = this.cDate;
    this.Todate = this.cDate;
    this.plantservice.getPlantData(this.currentUser.id);
    this.DPservice.plantcode = "1010";
    this.selectedPlant = "1010";
    this.plant_name = "GDPL Vapi";
    this.cols = [
      //  { field: 'id', header: 'ID' },
      { field: "pstngdate", header: "Posting Date" },
      { field: "insplot", header: "insplot" },
      { field: "item_type", header: "Type" },
      { field: "itemcode", header: "Code" },
      { field: "itemname", header: "Name" },
      { field: "reject_qty", header: "Reject qty" },
      { field: "rejper", header: "Rej %" },
      { field: "reject_value", header: "Reject Value" }
    ];

    this.subcols = [
      // { field: 'id', header: 'ID' },
      { field: "inspectiondate", header: "Date" },
      { field: "ordertype", header: "Type" },
      { field: "defect", header: "Defect" },
      { field: "totalqty", header: "Total Qty" },
      { field: "rejvalue", header: "Reject Value" }
    ];

    this.loading = true;
    this.DPservice.getRejectmaindetail(
      this.DPservice.plantcode,
      "NULL",
      this.Fromdate,
      this.Todate
    )
      .toPromise()
      .then(res => {
        this.DPservice.itemwiserejdetaillist = res as ItemwiseRejDetail[];
        this.loading = false;
      });
    this.loading = true;
    // tslint:disable-next-line:max-line-length
    this.DPservice.getRejectdefectdetail(
      this.DPservice.plantcode,
      "CHROME",
      this.Fromdate,
      this.Todate,
      "91000149"
    )
      .toPromise()
      .then(res => {
        this.DPservice.itemtopdefectlist = res as TopDefect[];
        this.loading = false;
      });
  }
  selectedGrid(ev) {
    this.selectedPlant = ev;
    console.log("code", ev);
    this.selectedPlanName();
  }
  backtoRejection() {
    this.router.navigate(["./rejection"]);
  }
  setPlan(ev) {
    this.acservice.actionplanData.loginid = Number(ev);
  }

  onRowSelect(ev) {
    this.selectedItemrej = ev.data;
    this.loading = true;
    // tslint:disable-next-line:max-line-length
    this.DPservice.getRejectdefectdetail(
      this.selectedItemrej.plant,
      this.selectedItemrej.item_type,
      this.selectedItemrej.pstngdate.replace("T00:00:00", ""),
      this.selectedItemrej.pstngdate.replace("T00:00:00", ""),
      this.selectedItemrej.itemcode
    )
      .toPromise()
      .then(res => {
        this.DPservice.itemtopdefectlist = res as TopDefect[];
        this.loading = false;
      });
    $("#basicExampleModal").modal("show");
  }
  rejectqtysum() {
    if (this.filterenable === true) {
      this.totalRejQty = 0;
      for (const rq of this.filterItemrejarray) {
        const rejqty = rq.reject_qty;
        this.totalRejQty += rejqty;
      }
    } else {
      this.totalRejQty = 0;
      for (const rq of this.DPservice.itemwiserejdetaillist) {
        const rejqty = rq.reject_qty;
        this.totalRejQty += rejqty;
      }
    }
    return this.totalRejQty;
  }
  rejectpersum() {
    if (this.filterenable === true) {
      this.totalRejQty = 0;
      this.totalinsQty = 0;
      this.totalRejPer = 0;
      for (const rq of this.filterItemrejarray) {
        const rejqty = rq.reject_qty;
        const insqty = rq.inspection_qty;
        this.totalRejQty += rejqty;
        this.totalinsQty += insqty;
      }
    } else {
      this.totalRejQty = 0;
      this.totalinsQty = 0;
      this.totalRejPer = 0;
      for (const rq of this.DPservice.itemwiserejdetaillist) {
        const rejqty = rq.reject_qty;
        const insqty = rq.inspection_qty;
        this.totalRejQty += rejqty;
        this.totalinsQty += insqty;
      }
    }

    this.totalRejPer = (this.totalRejQty / this.totalinsQty) * 100;
    return this.totalRejPer;
  }
  rejectvaluesum() {
    if (this.filterenable === true) {
      this.totalRejVal = 0;
      for (const rq of this.filterItemrejarray) {
        const rejvalue = rq.reject_value;
        this.totalRejVal += rejvalue;
      }
    } else {
      this.totalRejVal = 0;
      for (const rq of this.DPservice.itemwiserejdetaillist) {
        const rejvalue = rq.reject_value;
        this.totalRejVal += rejvalue;
      }
    }
    return this.totalRejVal;
  }

  totalQty() {
    this.totalQtySum = 0;
    if (this.DPservice && this.DPservice.itemtopdefectlist) {
      for (const rq of this.DPservice.itemtopdefectlist) {
        this.totalQtySum += rq.totalqty;
      }
    }
    return this.totalQtySum;
  }
  totalRejValue() {
    this.totalRejValueSum = 0;
    if (this.DPservice && this.DPservice.itemtopdefectlist) {
      for (const rq of this.DPservice.itemtopdefectlist) {
        this.totalRejValueSum += rq.rejvalue;
      }
    }
    return this.totalRejValueSum;
  }

  selectedPlanName() {
    const me = this;
    if (this.plantservice && this.plantservice.plantlist && me.selectedPlant) {
      this.plantservice.plantlist.forEach(function(element, i) {
        if (element.plantcode == me.selectedPlant) {
          me.plant_name = element.plantshortname;
        }
      });
    }
    // return this.selected_plantname;
  }
}
