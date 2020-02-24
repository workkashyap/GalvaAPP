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
  private loading = false;
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
  }
  onselecttype(ev) {
     this.selectedtype = ev;
  }
  exportExcel() {
    import('xlsx').then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.DPservice.itemwiserejlist);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'DetailComponents');
    });
}
saveAsExcelFile(buffer: any, fileName: string): void {
  import('file-saver').then(FileSaver => {
      const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  });
}
  onviewDetail() {
    this.loading = true;
    console.log(this.selectedtype);
    if (this.selectedtype !== '') {
      this.selectedtype = this.selectedtype;

    } else {
      this.selectedtype = 'NULL';
    }
    this.DPservice.getRejectdetail(this.DPservice.plantcode, this.selectedtype , this.Fromdate, this.Todate)
        .toPromise()
        .then(res => {
          this.DPservice.itemwiserejlist = res as Itemwiserej[];
          this.loading = false;
        });
  }

  ngOnInit() {
    this.Fromdate = this.DPservice.date.replace('T00:00:00', '');
    this.Todate =  this.DPservice.date.replace('T00:00:00', '');
    this.plantservice.getPlantData(this.currentUser.id);

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'pstngdate', header: 'Posting Date' },
      { field: 'item_type', header: 'Type' },
      { field: 'itemcode', header: 'Code' },
      { field: 'itemname', header: 'Name' },
      { field: 'reject_qty', header: 'Reject qty' },
      { field: 'rejper', header: 'Rej %' },
      { field: 'reject_value', header: 'Reject Value' },
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
    this.DPservice.getRejectdetail(this.DPservice.plantcode, 'NULL' , this.Fromdate, this.Todate)
        .toPromise()
        .then(res => {
          this.DPservice.itemwiserejlist = res as Itemwiserej[];
          this.loading = false;
        });
    this.loading = true;
        // tslint:disable-next-line:max-line-length
    this.DPservice.getRejectdefectdetail(this.DPservice.plantcode, 'CHROME' , this.Fromdate, this.Todate, '91000149')
          .toPromise()
          .then(res => {
            this.DPservice.itemtopdefectlist = res as TopDefect[];
            this.loading = false;
          });
  }
  selectedGrid(ev) {
    this.selectedPlant = ev;
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
    this.DPservice.getRejectdefectdetail(this.selectedItemrej.plant, this.selectedItemrej.item_type , this.selectedItemrej.pstngdate.replace('T00:00:00', ''), this.selectedItemrej.pstngdate.replace('T00:00:00', ''), this.selectedItemrej.itemcode)
      .toPromise()
      .then(res => {
        this.DPservice.itemtopdefectlist = res as TopDefect[];
        this.loading = false;
      });
    $('#basicExampleModal').modal('show');

  }
}
