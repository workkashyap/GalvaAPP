import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Ppc } from 'src/app/shared/ppc/ppc.model';
import { PpcService } from 'src/app/shared/ppc/ppc.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './ppcdetail.component.html',
  styleUrls: ['./ppcdetail.component.css'],
  providers: [DatePipe]

})
export class PpcdetailComponent implements OnInit {
  public loading = false;
  cols: any;
  monthname: any;
  monthNames: any;
  lastDate: any;
  public startdate: any;
  public date: any;
  ppcdetailData: any;
  constructor(
    public datePipe: DatePipe,
    public ppcService: PpcService,
  ) {

    this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
      'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];

    const me = this;
    this.date = new Date();

    this.startdate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    var date = new Date();
    this.monthname = this.monthNames[this.date.getMonth()];
  }

  ngOnInit() {
    this.summary2();
  }

  selectedMonth(ev) {
    this.lastDate = '';

    var d = new Date();
    const m = this.monthNames.indexOf(ev, 0) //d.getMonth(); //current month

    const y = d.getFullYear(); //current year

    this.lastDate = this.datePipe.transform(new Date(y, m + 1, 0), 'dd');

    this.startdate = this.datePipe.transform(new Date(y, m, 1), 'yyyy-MM-dd');
    this.summary2();

  }
  summary2() {
    this.ppcdetailData = [];
    $('#summaryModal').modal('show');
    const me = this;
    this.cols = [
      { field: 'id', header: 'Item Id' },
      { field: 'custno', header: 'Customer No' },
      { field: 'name', header: 'Customer Name' },
      { field: 'itemname', header: 'Material Description' },
      { field: 'schqty', header: 'Schedule Current' },
      { field: 'dispatchqty', header: 'Dispatch' },
      { field: 'balance', header: 'Balance' },
      { field: 'fgVZ', header: 'FG at Zaroli / Vapi Godown' },
      { field: 'totaltransit', header: 'In Transit' },
      { field: 'fgother', header: 'FG at chennai / ap / pune godown' },
      { field: 'fgmouldstock', header: 'Moulded parts stck' },
      { field: 'mouldpartreq', header: 'Moulded parts requirnment' },
      { field: 'platingpartreq', header: 'Plating parts requirnment' },
    ];

    this.loading = true;
    this.ppcdetailData = [];
    this.ppcService
      .getPPCCalsummary(this.startdate)
      .toPromise()
      .then(res => {
        this.ppcdetailData = res as Ppc[];

        this.loading = false;
      });
  }
}
