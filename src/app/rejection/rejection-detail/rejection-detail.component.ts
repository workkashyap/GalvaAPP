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

@Component({
  selector: 'app-rejection-detail',
  styleUrls: ['./rejection-detail.component.css'],
  templateUrl: './rejection-detail.component.html',
  providers: [DatePipe],
  styles: [`
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

`]
})
export class RejectionDetailComponent implements OnInit {
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
  selectedItemrej: Itemwiserej;
  selectedItemrejarray: Itemwiserej[] = [];
  filterItemrejarray: Itemwiserej[] = [];

  public plant_name: string;


  totalRejQty: number;
  totalRejPer: number;
  totalRejVal: number;

  totalinsQty: number;
  totalinsValue: number = 0;

  totalokValue: number = 0;
  totalokqtyValue: number = 0;

  totalMouldedQty: number = 0;
  totalMouldedPer: number = 0;

  totalPlantingQty: number = 0;
  totalPlantingPer: number = 0;
  totalQtySum: number = 0;
  totalRejValueSum: number = 0;

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
  //   exportExcel(dt) {
  //     console.log(dt.data);
  //     import('xlsx').then(xlsx => {
  //         const worksheet = xlsx.utils.json_to_sheet(this.DPservice.itemwiserejlist);
  //         const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
  //         const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
  //         this.saveAsExcelFile(excelBuffer, 'DetailComponents');
  //     });
  // }
  // saveAsExcelFile(buffer: any, fileName: string): void {
  //   import('file-saver').then(FileSaver => {
  //       const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  //       const EXCEL_EXTENSION = '.xlsx';
  //       const data: Blob = new Blob([buffer], {
  //           type: EXCEL_TYPE
  //       });
  //       FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  //   });
  // }
  onviewDetail() {
    this.filterenable = false;
    this.loading = true;
    this.DPservice.itemwiserejlist = [];
    if (this.selectedtype !== '') {
      this.selectedtype = this.selectedtype;

    } else {
      this.selectedtype = 'NULL';
    }
    this.DPservice.getRejectdetail(this.DPservice.plantcode, this.selectedtype, this.Fromdate, this.Todate)
      .toPromise()
      .then(res => {
        this.DPservice.itemwiserejlist = res as Itemwiserej[];
        this.loading = false;
      });

    this.rejectpersum();
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
    if (!this.DPservice.date) {
      console.log(this.DPservice.date);
      this.Fromdate = this.cDate;
      this.Todate = this.cDate;
    }
    else {
      this.Fromdate = this.DPservice.date.replace('T00:00:00', '');
      this.Todate = this.DPservice.date.replace('T00:00:00', '');
    }
    this.DPservice.plantcode = '1010';
    this.plantservice.getPlantData(this.currentUser.id);
    this.plant_name = "GDPL Vapi";

    this.cols = [
      // { field: 'id', header: 'ID' },
      //   { field: 'pstngdate', header: 'Posting Date' },
      { field: 'item_type', header: 'Type' },
      { field: 'itemcode', header: 'Code' },
      { field: 'itemname', header: 'Name' },

      { field: "inspection_qty", header: "Insp. qty" },
      { field: "inspection_value", header: "Insp. Value" },
      { field: "okvalue", header: "Ok Value" },
      { field: "okqty", header: "Ok qty" },

      { field: 'reject_qty', header: 'Reject qty' },
      { field: 'rejper', header: 'Rej %' },
      { field: 'reject_value', header: 'Reject Value' },


      { field: "mouldingqty", header: "Moulding qty " },
      { field: "mouldingper", header: "Moulding %" },
      { field: "platingqty", header: "Plating qty" },
      { field: "platingper", header: "Plating %" },
    ];

    this.subcols = [
      { field: 'id', header: 'ID' },
      { field: 'inspectiondate', header: 'Date' },
      { field: 'ordertype', header: 'Type' },
      { field: 'defect', header: 'Defect' },
      { field: 'totalqty', header: 'Total Qty' },
      { field: 'rejvalue', header: 'Reject Value' },
    ];

    this.loading = true;
    this.DPservice.getRejectdetail(this.DPservice.plantcode, 'NULL', this.Fromdate, this.Todate)
      .toPromise()
      .then(res => {
        this.DPservice.itemwiserejlist = res as Itemwiserej[];
        this.rejectpersum();
        this.loading = false;
      });
    this.loading = true;
    // tslint:disable-next-line:max-line-length
    // this.DPservice.getRejectdefectdetail(this.DPservice.plantcode, 'CHROME' , this.Fromdate, this.Todate, '91000149')
    //       .toPromise()
    //       .then(res => {
    //         this.DPservice.itemtopdefectlist = res as TopDefect[];
    //         this.loading = false;
    //       });
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
    // tslint:disable-next-line:max-line-length
    this.DPservice.getRejectdefectdetail(this.selectedItemrej.plant,
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

    if (this.filterenable === true) {
      this.totalRejQty = 0;
      this.totalinsQty = 0;
      this.totalRejPer = 0;
      for (const rq of this.filterItemrejarray) {

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

        this.totalPlantingPer += rq.mouldingper;
        this.totalPlantingQty += rq.platingqty;

      }
    }
    else {
      this.totalRejQty = 0;
      this.totalinsQty = 0;
      this.totalRejPer = 0;
      for (const rq of this.DPservice.itemwiserejlist) {
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

        this.totalPlantingPer += rq.mouldingper;
        this.totalPlantingQty += rq.platingqty;
      }
    }
    //  this.totalRejPer = this.totalRejQty / this.totalinsQty  * 100;
    return this.totalRejPer;
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
