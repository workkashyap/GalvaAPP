import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/login/User.model';
import { Inbox } from 'src/app/shared/inbox/inbox.model';
import { ActionplanService } from 'src/app/shared/inbox/actionplan.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/shared/login/login.service';
import { ActivatedRoute } from '@angular/router';
import { InboxService } from 'src/app/shared/inbox/inbox.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { DailyproductionService } from 'src/app/shared/dailyProduction/dailyproduction.service';
import { UserService } from 'src/app/shared/user/user.service';
import { PlantService } from 'src/app/shared/plant/plant.service';
import { Itemwiserej } from 'src/app/shared/dailyProduction/itemwiserej.model';
import { TopDefect } from 'src/app/shared/dailyProduction/topdefect.model';
import { Plant } from '../../shared/plant/plant.model';

@Component({
  selector: 'app-rejectionqtyvalue-detail',
  styleUrls: ['./rejectionqtyvalue-detail.component.css'],
  templateUrl: './rejectionqtyvalue-detail.component.html',
  providers: [DatePipe],
  styles: [`
  :host ::ng-deep .ui-table .ui-table-thead > tr > th {
    position: -webkit-sticky;
    position: sticky;
    background: blue;
    color: white;
    font-size:10px;
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

`]
})
export class RejectionqtyvalueDetailComponent implements OnInit {
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
  reporttype: any = 'Value';
  cols: any[];
  subcols: any[];
  editcols: any[];
  actions: any[];
  selectedItemrej: Itemwiserej;
  selectedItemrejarray: Itemwiserej[] = [];
  filterItemrejarray: Itemwiserej[] = [];

  public plant_name: string;

  totalBuffQty: number = 0;
  totalBuffVal: number = 0;
  totalHoldQty: number = 0;
  totalHoldVal: number = 0;

  totalRejQty: number = 0;
  totalRejPer: number = 0;
  totalRejVal: number = 0;

  totalRejPer2: number = 0;

  totalinsQty: number = 0;
  totalinsValue: number = 0;

  totalokValue: number = 0;
  totalokqtyValue: number = 0;

  totalMouldedQty: number = 0;
  totalMouldedPer: number = 0;
  totalMouldedVal: number = 0;

  totalPlantingQty: number = 0;
  totalPlantingPer: number = 0;
  totalPlantingVal: number = 0;

  totalQtySum: number = 0;
  totalRejValueSum: number = 0;


  totalOthers_value: number = 0;
  totalOthersqty: number = 0;

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
    public plantservice: PlantService,
  ) {
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    this.cDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.selectedtype = "zcrm";
  }
  onselecttype(ev) {
    this.selectedtype = ev;
  }
  onselectReporttype(ev) {
    this.reporttype = ev;
    this.cols = [
      { field: 'itemcode', header: 'Code' },
      { field: 'itemname', header: 'Name' },
    ];
    if (this.reporttype == "Value") {
      this.cols.push(
        { field: "inspection_value", header: "Insp. Value" },
        { field: "okvalue", header: "Ok Value" },
        { field: 'reject_value', header: 'Reject Val' },
        { field: 'holdvalue', header: 'Hold Val' },
        { field: 'buffingvalue', header: 'Buffing Val' },
        { field: "moulding_value", header: "Moulding Val" },
        { field: "plating_value", header: "Plating Val" },
        { field: "othersvalue", header: "Others Val" },
      )
    }
    if (this.reporttype == "Quantity") {
      this.cols.push(
        { field: "inspection_qty", header: "Insp. qty" },
        { field: "okqty", header: "Ok qty" },
        { field: 'reject_qty', header: 'Reject qty' },
        { field: "mouldingqty", header: "Moulding qty " },
        { field: "platingqty", header: "Plating qty" },
        //        { field: 'rejper', header: 'Rej %' },
        { field: 'holdqty', header: 'Hold Qty' },
        { field: 'buffingqty', header: 'Buffing Qty' },
        { field: "othersqty", header: "Others Qty" },
      );
    }

  }
  onviewDetail() {
    this.filterenable = false;
    this.loading = true;
    this.DPservice.itemwiserejlist = [];
    if (this.selectedtype !== '') {
      this.selectedtype = this.selectedtype;
    } else {
      this.selectedtype = 'NULL';
    }
    this.cols = [
      { field: 'itemcode', header: 'Code' },
      { field: 'itemname', header: 'Name' },
    ];
    if (this.reporttype == "Value") {
      this.cols.push(
        { field: "inspection_value", header: "Insp. Value" },
        { field: "okvalue", header: "Ok Value" },
        { field: 'reject_value', header: 'Reject Val' },
        { field: 'holdvalue', header: 'Hold Val' },
        { field: 'buffingvalue', header: 'Buffing Val' },
        { field: "moulding_value", header: "Moulding Val" },
        { field: "plating_value", header: "Plating Val" },
        { field: "othersvalue", header: "Others Val" },
      )
    }
    if (this.reporttype == "Quantity") {
      this.cols.push(
        { field: "inspection_qty", header: "Insp. qty" },
        { field: "okqty", header: "Ok qty" },
        { field: 'reject_qty', header: 'Reject qty' },
        { field: "mouldingqty", header: "Moulding qty " },
        { field: "platingqty", header: "Plating qty" },
        //        { field: 'rejper', header: 'Rej %' },
        { field: 'holdqty', header: 'Hold Qty' },
        { field: 'buffingqty', header: 'Buffing Qty' },
        { field: "othersqty", header: "Others Qty" },
      );
    }

    this.DPservice.getRejectdetail(this.DPservice.plantcode, this.selectedtype, this.Fromdate, this.Todate)
      .toPromise()
      .then(res => {
        this.DPservice.itemwiserejlist = res as Itemwiserej[];
        this.rejectpersum();
        this.loading = false;
      });

  }

  loadper(ev, dt) {
    this.filterenable = true;
    this.selectedItemrejarray = dt.value;
    this.iv = 0;
    this.filterItemrejarray = [];
    // console.log(this.selectedItemrejarray[0].id);
    for (const c of this.selectedItemrejarray) {
      if (c.itemcode.toString().includes(ev.toString()) || c.itemname.toString().includes(ev.toString())
        || c.item_type.toString().includes(ev.toString()
          || c.plant.toString().includes(ev.toString()) || c.id.toString().includes(ev.toString()))) {
        this.filterItemrejarray.push(this.selectedItemrejarray[this.iv]);
        this.iv += 1;
      }
      else {
        this.iv += 1;
      }
    }
    this.rejectpersum();
  }
  refresh() {

  }
  ngOnInit() {
    let me = this;
    if (!this.DPservice.date) {
      this.Fromdate = this.cDate;
      this.Todate = this.cDate;
    }
    else {
      this.Fromdate = this.DPservice.date.replace('T00:00:00', '');
      this.Todate = this.DPservice.date.replace('T00:00:00', '');
    }


    this.subcols = [
      { field: 'id', header: 'ID' },
      // { field: 'inspectiondate', header: 'Date' },
      { field: 'ordertype', header: 'Type' },
      { field: 'defect', header: 'Defect' },
      { field: 'totalqty', header: 'Total Qty' },
      { field: 'rejvalue', header: 'Reject Value' },
    ];
    this.loading = true;
    //  this.plantservice.getPlantData(this.currentUser.id);
    this.plantservice
      .sgetPlantData(me.currentUser.id)
      .toPromise()
      .then(res => {
        me.plantservice.plantlist = res as Plant[];
        me.DPservice.plantcode = me.plantservice.plantlist[0].plantcode;
        me.plant_name = me.plantservice.plantlist[0].plantshortname;
        this.onviewDetail()


      });
  }
  selectedGrid(ev) {
    this.selectedPlant = ev;
    this.selectedPlanName();
  }
  backtoRejection() {
    this.router.navigate(['./rejection']);
  }
  setPlan(ev) {
    this.acservice.actionplanData.loginid = Number(ev);
  }

  onRowSelect(ev) {
    this.selectedItemrej = ev.data;
    this.loading = true;

    this.DPservice.itemtopdefectlist = [];
    // tslint:disable-next-line:max-line-length
    this.DPservice.getRejectdefectdetail2(this.selectedItemrej.plant,
      this.selectedItemrej.item_type,
      // this.selectedItemrej.pstngdate.replace('T00:00:00', ''),
      //this.selectedItemrej.pstngdate.replace('T00:00:00', ''),
      this.Fromdate,
      this.Todate,
      this.selectedItemrej.itemcode)
      .toPromise()
      .then(res => {
        this.DPservice.itemtopdefectlist = res as TopDefect[];
        this.loading = false;
      });
    $('#basicExampleModal').modal('show');

  }

  rejectpersum() {
    this.totalinsValue = 0;
    this.totalokValue = 0;
    this.totalokqtyValue = 0;

    this.totalMouldedQty = 0;
    this.totalMouldedPer = 0;

    this.totalPlantingPer = 0;
    this.totalPlantingQty = 0;

    this.totalRejVal = 0;

    this.totalMouldedVal = 0;
    this.totalPlantingVal = 0;

    this.totalBuffQty = 0;
    this.totalBuffVal = 0;
    this.totalHoldQty = 0;
    this.totalHoldVal = 0;


    this.totalRejPer2 = 0;

    this.totalOthersqty = 0;
    this.totalOthers_value = 0;

    if (this.filterenable === true) {
      this.totalRejQty = 0;
      this.totalinsQty = 0;
      this.totalRejPer = 0;
      for (const rq of this.filterItemrejarray) {

        this.totalOthersqty += rq.othersqty;
        this.totalOthers_value += rq.othersvalue;

        const rejqty = rq.reject_qty;
        const insqty = rq.inspection_qty;
        //
        this.totalRejQty += rejqty;
        this.totalinsQty += insqty;
        this.totalRejVal += rq.reject_value;

        //
        this.totalokValue += rq.okvalue;
        this.totalokqtyValue += rq.okqty;
        this.totalinsValue += rq.inspection_value;

        this.totalMouldedQty += rq.mouldingqty;
        this.totalMouldedPer += rq.mouldingper;

        this.totalPlantingPer += rq.platingper;
        this.totalPlantingQty += rq.platingqty;

        this.totalMouldedVal += rq.moulding_value;
        this.totalPlantingVal += rq.plating_value;

        this.totalHoldVal += rq.holdvalue;
        this.totalHoldQty += rq.holdqty;
        this.totalBuffQty += rq.buffingqty;
        this.totalBuffVal += rq.buffingvalue;
      }
      this.totalRejPer2 = this.totalRejVal * 100 / this.totalinsValue;

    }
    else {
      this.totalRejQty = 0;
      this.totalinsQty = 0;
      this.totalRejPer = 0;
      for (const rq of this.DPservice.itemwiserejlist) {
        this.totalOthersqty += rq.othersqty;
        this.totalOthers_value += rq.othersvalue;

        const rejqty = rq.reject_qty;
        const insqty = rq.inspection_qty;
        //
        this.totalRejQty += rejqty;
        this.totalinsQty += insqty;
        //
        this.totalRejVal += rq.reject_value;

        this.totalokValue += rq.okvalue;
        this.totalokqtyValue += rq.okqty;
        this.totalinsValue += rq.inspection_value;

        this.totalMouldedQty += rq.mouldingqty;
        this.totalMouldedPer += rq.mouldingper;

        this.totalPlantingPer += rq.platingper;
        this.totalPlantingQty += rq.platingqty;


        this.totalMouldedVal += rq.moulding_value;
        this.totalPlantingVal += rq.plating_value;

        this.totalHoldVal += rq.holdvalue;
        this.totalHoldQty += rq.holdqty;
        this.totalBuffQty += rq.buffingqty;
        this.totalBuffVal += rq.buffingvalue;
      }
      this.totalRejPer2 = this.totalRejVal * 100 / this.totalinsValue;
    }
    console.log(" this.totalRejPer2 ", this.totalRejPer2);
    if (!this.totalRejPer2) {
      this.totalRejPer2 = 0;
    }
    return this.totalRejPer2;
    //  this.totalRejPer = this.totalRejQty / this.totalinsQty  * 100;
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
      this.plantservice.plantlist.forEach(function (element, i) {
        if (element.plantcode == me.selectedPlant) {
          me.plant_name = element.plantshortname;
        }
      });
    }
    // return this.selected_plantname;
  }
}
