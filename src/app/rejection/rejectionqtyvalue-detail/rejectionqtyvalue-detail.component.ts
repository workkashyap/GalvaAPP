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
import { Itemvalueqty } from 'src/app/shared/dailyProduction/itemvalueqty.model';

@Component({
  selector: 'app-rejectionqtyvalue-detail',
  styleUrls: ['./rejectionqtyvalue-detail.component.css'],
  templateUrl: './rejectionqtyvalue-detail.component.html',
  providers: [DatePipe],
  styles: [`
  :host ::ng-deep .all .ui-table  table {
    width:auto;
  }
  
  :host ::ng-deep .ui-table-resizable > .ui-table-wrapper > table{
    transform:rotateX(180deg);
    -ms-transform:rotateX(180deg); /* IE 9 */
    -webkit-transform:rotateX(180deg);
  }
  :host ::ng-deep .ui-table-resizable > p-paginator > div {
    transform: rotateX(180deg);
    -ms-transform: rotateX(180deg);
    -webkit-transform: rotateX(180deg);
  }
  :host ::ng-deep ::-webkit-scrollbar {
    width: 8px;
  }
  /* Track */
  :host ::ng-deep ::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }
   
  /* Handle */
  :host ::ng-deep ::-webkit-scrollbar-thumb {
    background: #c1c1c1; 
  }
  
  /* Handle on hover */
  :host ::ng-deep ::-webkit-scrollbar-thumb:hover {
    background: #c1c1c1; 
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
  reporttype: any = 'All';
  cols: any[];
  subcols: any[];
  editcols: any[];
  actions: any[];
  selectedItemrej: Itemwiserej;
  selectedItemrejarray: Itemvalueqty[] = [];
  filterItemrejarray: Itemvalueqty[] = [];

  public plant_name: string;

  pinHolesqty: number = 0;
  skipplatingQty: number = 0;
  whitemarKqty: number = 0;
  dotplastiCqty: number = 0;
  crburninGqty: number = 0;
  copperburninGqty: number = 0;
  nicklEqty: number = 0;
  roughnesSqty: number = 0;
  blisteRqty: number = 0;
  watermarKqty: number = 0;
  shadevaRqty: number = 0;
  platingpeeLqty: number = 0;
  chemicalmarKqty: number = 0;

  silverQty: number = 0;
  denTqty: number = 0;
  handmouldingreJqty: number = 0;
  pittinGqty: number = 0;
  flowmarKqty: number = 0;

  tooldeF_qty: number = 0;
  jigdamagEqty: number = 0;

  warpagEqty: number = 0;
  scratchmarKqty: number = 0;
  otheR1qty: number = 0;
  otheR2qty: number = 0;

  totalQtySum: number = 0;
  totalRejValueSum: number = 0;

  totalRejQty: number = 0;
  totalinsQty: number = 0;
  totalRejPer: number = 0;
  totalRejPer2: number = 0;
  totalRejVal: number = 0;
  totalinsValue: number = 0;
  totalokqtyValue: number = 0;
  totalPlantingQty: number = 0;
  totalMouldedQty: number = 0;

  totalBuffQty = 0;
  totalHoldQty = 0;

  totalOthers_value: number = 0;
  totalOthersqty: number = 0;

  platingqty: number = 0;
  mouldingqty: number = 0;
  othersqty: number = 0;
  mechfail_qty: number = 0;

  patchmarKqty: number = 0;
  mouldingreJqty: number = 0;
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

    this.mycol();
  }
  mycol() {
    this.cols = [
      { field: 'itemcode', header: 'Code' },
      { field: 'itemname', header: 'Name' },
      { field: "inspection_qty", header: "Insp. Qty." },
      { field: "okqty", header: "Ok Qty" },
      { field: "reject_qty", header: "Reject Qty." },

      { field: "rejper", header: "Reject%" },
      { field: "holdqty", header: "Hold Qty." },
      { field: "buffingqty", header: "Buffing Qty." },
    ];


    if (this.reporttype == "All") {
      this.cols.push(
        { field: "platingqty", header: "Plating Qty" },
        { field: "mouldingqty", header: "Moulding Qty" },
        { field: "tooldeF_qty", header: "Tooldef" },
        { field: "othersqty", header: "Others" },
        { field: 'mechfail_qty', header: 'Mechfail' },

        { field: "pinHolesqty", header: "Pinhole" },
        { field: "skipplatingQty", header: "Skipplating" },
        { field: 'whitemarKqty', header: 'Whitemark' },
        { field: 'dotplastiCqty', header: 'Dotplastic' },

        { field: 'crburninGqty', header: 'Crburning' },
        { field: "copperburninGqty", header: "Copper Burning" },
        { field: "nicklEqty", header: "Nickle" },
        { field: "roughnesSqty", header: "Roughness" },
        { field: "blisteRqty", header: "Blister" },

        { field: "watermarKqty", header: "Watermark" },
        { field: "shadevaRqty", header: "Shadevar" },
        { field: "platingpeeLqty", header: "Platingpeel" },
        { field: "chemicalmarKqty", header: "Chemicalmark" },

        { field: "silverQty", header: "Silver" },
        { field: "denTqty", header: "Dent" },
        { field: 'handmouldingreJqty', header: 'Hand Moulding Rej' },

        { field: 'patchmarKqty', header: 'Patchmark' },
        { field: 'mouldingreJqty', header: 'Moulding rej' },

        { field: "pittinGqty", header: "Pitting" },
        { field: "flowmarKqty", header: "Flowmark" },

        { field: "jigdamagEqty", header: "Jig Damage" },

        { field: "warpagEqty", header: "War Page" },
        { field: "scratchmarKqty", header: "Scratch Mark" },
        { field: 'otheR1qty', header: 'Other1' },
        { field: "otheR2qty", header: "Other2" },

      )
    }

    if (this.reporttype == "Plating") {
      this.cols.push(
        { field: "platingqty", header: "Plating Qty" },
        { field: "mouldingqty", header: "Moulding Qty" },
        { field: "tooldeF_qty", header: "Tooldef" },
        { field: "othersqty", header: "Others" },

        { field: "pinHolesqty", header: "Pinhole" },
        { field: "skipplatingQty", header: "Skipplating" },
        { field: 'whitemarKqty', header: 'Whitemark' },
        { field: 'dotplastiCqty', header: 'Dotplastic' },
        { field: 'crburninGqty', header: 'Crburning' },
        { field: "copperburninGqty", header: "Copper Burning" },
        { field: "nicklEqty", header: "Nickle" },
        { field: "roughnesSqty", header: "Roughness" },
        { field: "blisteRqty", header: "Blister" },
        { field: "watermarKqty", header: "Watermark" },
        { field: "shadevaRqty", header: "Shadevar" },
        { field: "platingpeeLqty", header: "Platingpeel" },
        { field: "chemicalmarKqty", header: "Chemicalmark" },
      )
    }
    if (this.reporttype == "Moulding") {
      this.cols.push(
        { field: "mouldingqty", header: "Moulding Qty" },

        { field: "silverQty", header: "Silver" },
        { field: "denTqty", header: "Dent" },
        { field: 'handmouldingreJqty', header: 'Hand Moulding Rej' },
        { field: 'patchmarKqty', header: 'Patchmark' },
        { field: 'mouldingreJqty', header: 'Moulding rej' },

        { field: "pittinGqty", header: "Pitting" },
        { field: "flowmarKqty", header: "Flowmark" },
      );
    }
    if (this.reporttype == "ToolDefect") {
      this.cols.push(
        { field: "tooldeF_qty", header: "Tooldef" },
        { field: "jigdamagEqty", header: "Jig Damage" },
      );
    }
    if (this.reporttype == "Others") {
      this.cols.push(
        { field: "othersqty", header: "Others" },

        { field: "warpagEqty", header: "War Page" },
        { field: "scratchmarKqty", header: "Scratch Mark" },
        { field: 'otheR1qty', header: 'Other1' },
        { field: "otheR2qty", header: "Other2" },
      );
    }

    if (this.reporttype == "Summary") {
      this.cols.push(
        { field: "platingqty", header: "Plating Qty" },
        { field: "mouldingqty", header: "Moulding Qty" },
        { field: "tooldeF_qty", header: "Tooldef" },
        { field: "othersqty", header: "Others" },

        { field: 'mechfail_qty', header: 'Mechfail' },
      );
    }
  }
  onviewDetail() {
    this.filterenable = false;
    this.loading = true;
    this.DPservice.itemwiserejlist2 = [];

    this.mycol();
    this.DPservice.getRejectdetailQtyValue(this.DPservice.plantcode, this.Fromdate, this.Todate, this.selectedtype)
      .toPromise()
      .then(res => {
        this.DPservice.itemwiserejlist2 = res as Itemvalueqty[];
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
    this.pinHolesqty = 0;
    this.skipplatingQty = 0;
    this.whitemarKqty = 0;
    this.dotplastiCqty = 0;
    this.crburninGqty = 0;
    this.copperburninGqty = 0;
    this.roughnesSqty = 0;
    this.nicklEqty = 0;
    this.blisteRqty = 0;
    this.watermarKqty = 0;
    this.shadevaRqty = 0;
    this.platingpeeLqty = 0;
    this.chemicalmarKqty = 0;

    this.silverQty = 0;
    this.denTqty = 0;
    this.handmouldingreJqty = 0;
    this.pittinGqty = 0;
    this.flowmarKqty = 0;

    this.tooldeF_qty = 0;
    this.jigdamagEqty = 0;

    this.warpagEqty = 0;
    this.scratchmarKqty = 0;
    this.otheR1qty = 0;
    this.otheR2qty = 0;


    this.totalRejQty = 0;
    this.totalinsQty = 0;
    this.totalRejPer = 0;
    this.totalRejPer2 = 0;
    this.totalRejVal = 0;
    this.totalinsValue = 0;
    this.totalokqtyValue = 0;
    this.totalPlantingQty = 0;

    this.totalBuffQty = 0;
    this.totalHoldQty = 0;
    this.totalMouldedQty = 0;

    this.othersqty = 0;
    this.mechfail_qty = 0;

    this.patchmarKqty = 0;
    this.mouldingreJqty = 0;
    if (this.filterenable === true) {
      for (const rq of this.filterItemrejarray) {
        if (rq.othersqty == null) {
          rq.othersqty = 0;
        }
        this.mouldingreJqty += rq.mouldingreJqty;

        this.othersqty += rq.othersqty;
        this.patchmarKqty += rq.patchmarKqty;

        this.mechfail_qty += rq.mechfail_qty;

        this.totalRejQty += rq.reject_qty;
        this.totalinsQty += rq.inspection_qty;
        this.totalRejPer += rq.rejper;
        this.totalinsValue += rq.inspection_value
        this.totalRejVal += rq.reject_value;
        this.totalokqtyValue += rq.okqty;
        this.totalPlantingQty += rq.platingqty;
        this.totalBuffQty += rq.buffingqty;
        this.totalHoldQty += rq.holdqty;
        this.totalMouldedQty += rq.mouldingqty;


        this.pinHolesqty += rq.pinHolesqty;
        this.skipplatingQty += rq.skipplatingQty;
        this.whitemarKqty += rq.whitemarKqty;
        this.dotplastiCqty += rq.dotplastiCqty;
        this.crburninGqty += rq.crburninGqty;
        this.copperburninGqty += rq.copperburninGqty;
        this.roughnesSqty += rq.roughnesSqty;
        this.nicklEqty += rq.nicklEqty;
        this.blisteRqty += rq.blisteRqty;
        this.watermarKqty += rq.watermarKqty;
        this.shadevaRqty += rq.shadevaRqty;
        this.platingpeeLqty += rq.platingpeeLqty;
        this.chemicalmarKqty += rq.chemicalmarKqty;

        this.silverQty += rq.silverQty;
        this.denTqty += rq.denTqty;
        this.handmouldingreJqty += rq.handmouldingreJqty;
        this.pittinGqty += rq.pittinGqty;
        this.flowmarKqty += rq.flowmarKqty;

        this.tooldeF_qty += rq.tooldeF_qty;
        this.jigdamagEqty += rq.jigdamagEqty;

        this.warpagEqty += rq.warpagEqty;
        this.scratchmarKqty += rq.scratchmarKqty;
        this.otheR1qty += rq.otheR1qty;
        this.otheR2qty += rq.otheR2qty;
      }
      this.totalRejPer2 = this.totalRejVal * 100 / this.totalinsValue;

      if (this.othersqty < 0) {
        this.othersqty = 0;
      }
    }
    else {

      for (const rq of this.DPservice.itemwiserejlist2) {
        if (rq.othersqty == null) {
          rq.othersqty = 0;
        }
        this.othersqty += rq.othersqty;
        this.mechfail_qty += rq.mechfail_qty;
        this.patchmarKqty += rq.patchmarKqty;
        this.mouldingreJqty += rq.mouldingreJqty;


        this.totalRejQty += rq.reject_qty;
        this.totalinsQty += rq.inspection_qty;
        this.totalRejPer += rq.rejper;
        this.totalinsValue += rq.inspection_value
        this.totalRejVal += rq.reject_value;
        this.totalokqtyValue += rq.okqty;
        this.totalPlantingQty += rq.platingqty;
        this.totalBuffQty += rq.buffingqty;
        this.totalHoldQty += rq.holdqty;
        this.totalMouldedQty += rq.mouldingqty;


        this.pinHolesqty += rq.pinHolesqty;
        this.skipplatingQty += rq.skipplatingQty;
        this.whitemarKqty += rq.whitemarKqty;
        this.dotplastiCqty += rq.dotplastiCqty;
        this.crburninGqty += rq.crburninGqty;
        this.copperburninGqty += rq.copperburninGqty;
        this.roughnesSqty += rq.roughnesSqty;
        this.nicklEqty += rq.nicklEqty;
        this.blisteRqty += rq.blisteRqty;
        this.watermarKqty += rq.watermarKqty;
        this.shadevaRqty += rq.shadevaRqty;
        this.platingpeeLqty += rq.platingpeeLqty;
        this.chemicalmarKqty += rq.chemicalmarKqty;

        this.silverQty += rq.silverQty;
        this.denTqty += rq.denTqty;
        this.handmouldingreJqty += rq.handmouldingreJqty;
        this.pittinGqty += rq.pittinGqty;
        this.flowmarKqty += rq.flowmarKqty;

        this.tooldeF_qty += rq.tooldeF_qty;
        this.jigdamagEqty += rq.jigdamagEqty;

        this.warpagEqty += rq.warpagEqty;
        this.scratchmarKqty += rq.scratchmarKqty;
        this.otheR1qty += rq.otheR1qty;
        this.otheR2qty += rq.otheR2qty;
      }
      this.totalRejPer2 = this.totalRejVal * 100 / this.totalinsValue;
      if (this.othersqty < 0) {
        this.othersqty = 0;
      }

    }
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
