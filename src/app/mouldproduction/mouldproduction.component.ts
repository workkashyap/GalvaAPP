import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { PlantService } from '../shared/plant/plant.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../shared/login/login.service';
import { User } from '../shared/login/User.model';
import { Plant } from '../shared/plant/plant.model';
import { MouldproductionService } from '../shared/mouldproduction/mouldproduction.service';
import { Mouldproduction } from '../shared/mouldproduction/mouldproduction.model';
@Component({
  selector: 'app-mouldproduction',
  templateUrl: './mouldproduction.component.html',
  styleUrls: ['./mouldproduction.component.css'],
  providers: [DatePipe]
})
export class MouldproductionComponent implements OnInit {

  calendarPlugins = [dayGridPlugin];
  @ViewChild('calendar', { static: false })
  calendarComponent: FullCalendarComponent;
  calendarApi: any;
  options: any;

  public sDate: Date;
  public lDate: Date;
  cols: any[];
  public startdate: string;

  monthName: any;

  public selectedcode: string;
  public selected_plantname: string;
  public selected_eventdate: any;

  public loading = false;
  detailLoading: boolean = false;
  public loadingSummary = false;

  public currentUser: User;

  prodqty: number = 0;
  rejqty: number = 0;
  consumption: number = 0;
  issuedqty: number = 0;
  opening: number = 0;
  balance2: number = 0;
  rejconsumption: number = 0;
  consforunit: number = 0;
  customclass = '';
  constructor(
    public plantservice: PlantService,
    public toastr: ToastrService,
    public datePipe: DatePipe,
    public mouldprodService: MouldproductionService,
    public lservice: LoginService,
  ) {
    this.lservice.currentUser.subscribe(x => this.currentUser = x);
  }
  ngOnInit() {
    const me = this;
    this.options = {
      editable: true,
      aspectRatio: 3.5,
      header: {
        left: '',
        center: 'title',
        right: ''//'dayGridMonth,dayGridWeek',

      },
      contentHeight: '500px',

      plugins: [dayGridPlugin],
    };

    this.startdate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    var date = new Date();

    this.sDate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.lDate = new Date(me.sDate.getFullYear(), me.sDate.getMonth() + 1, 0);
    //this.loading = true;
    //get plant
    this.plantservice
      .sgetPlantData(me.currentUser.id)
      .toPromise()
      .then(res => {
        me.plantservice.splantlist = res as Plant[];
        me.selectedcode = me.plantservice.splantlist[0].plantcode;
        me.selected_plantname = me.plantservice.splantlist[0].plantshortname;
        me.selectedPlanName();
        if (res) {
          me.loaddata();
        } else {
          me.loading = false;
        }
      }, erroe => {
        me.loading = false;
      });
  }

  Next() {
    this.calendarApi = this.calendarComponent.getApi();
    this.calendarApi.next();
    this.sDate = this.calendarApi.getDate();
    this.startdate = this.datePipe.transform(this.sDate, 'yyyy-MM-dd');
    this.lDate = new Date(this.sDate.getFullYear(), this.sDate.getMonth() + 1, 0);
    this.loaddata();
  }
  Previous() {
    this.calendarApi = this.calendarComponent.getApi();
    this.calendarApi.prev();
    this.sDate = this.calendarApi.getDate();
    this.startdate = this.datePipe.transform(this.sDate, 'yyyy-MM-dd');
    this.lDate = new Date(this.sDate.getFullYear(), this.sDate.getMonth() + 1, 0);
    this.loaddata();
  }

  dateClick(model) {
    console.log(model.date);
  }
  //on refres button click event
  loaddata() {
    const me = this;
    this.loading = true;
    me.issuedqty = 0;

    me.prodqty = 0;
    me.rejqty = 0;
    me.consumption = 0;
    me.rejconsumption = 0;
    me.consforunit = 0;
    this.mouldprodService.getMProdctionCalendar(this.selectedcode, this.startdate)
      .toPromise()
      .then(res => {
        me.mouldprodService.mouldProdcalendar = res as Mouldproduction[];

        this.mouldprodService.getmouldsum(this.selectedcode, this.startdate)
          .toPromise()
          .then(res2 => {
            const getmouldsum = res2 as Mouldproduction[];
            if (getmouldsum && getmouldsum.length) {
              getmouldsum.forEach(getmouldsumElem => {
                me.prodqty = (getmouldsumElem.prodqty != null) ? getmouldsumElem.prodqty : 0;
                me.rejqty = (getmouldsumElem.rejqty != null) ? getmouldsumElem.rejqty : 0;
                //  me.consumption = (getmouldsumElem.consumption != null) ? getmouldsumElem.consumption / 1000 : 0;
                me.consumption = (getmouldsumElem.consumption != null) ? getmouldsumElem.consumption : 0;
                me.consforunit = me.consumption / me.prodqty;
                console.clear();
                console.log("me.consforunit : ", me.consforunit);
                me.consforunit = (!me.consforunit) ? 0 : me.consforunit;
                me.rejconsumption = me.consforunit * me.rejqty;
                me.rejconsumption = (!me.rejconsumption) ? 0 : me.rejconsumption;
                console.log("me.rejconsumption : ", me.rejconsumption);
              });
            }
          });

        this.mouldprodService.getmouldissuesum(this.selectedcode, this.startdate)
          .toPromise()
          .then(res2 => {
            const getmouldissuesum = res2 as Mouldproduction[];
            if (getmouldissuesum && getmouldissuesum.length) {
              getmouldissuesum.forEach(getmouldissuesumElem => {

                me.issuedqty = (getmouldissuesumElem.issuedqty != null) ? getmouldissuesumElem.issuedqty : 0;
                //  me.issuedqty = (getmouldissuesumElem.issuedqty != null) ? getmouldissuesumElem.issuedqty / 1000 : 0;
              });
            }
          });

        this.mouldprodService.getmouldopeningsum(this.selectedcode)
          .toPromise()
          .then(res2 => {
            const getmouldopeningsum = res2 as Mouldproduction[];
            if (getmouldopeningsum && getmouldopeningsum.length) {
              getmouldopeningsum.forEach(getmouldopeningsumElem => {
                me.opening = (getmouldopeningsumElem.opening != null) ? getmouldopeningsumElem.opening : 0;
                // me.opening = (getmouldopeningsumElem.opening != null) ? getmouldopeningsumElem.opening / 1000 : 0;
              });
            }
          });

        me.loading = false;
      }, error => {
        me.loading = false;
      });
  }

  //get top button total value

  //on change option value
  selectedGrid(ev) {
    this.selectedcode = ev;
    this.loaddata();
    this.selectedPlanName();
  }
  //calendar event click
  eventClick(model) {
    this.customclass = "extraWidth";
    this.cols = [
      { field: 'itemcode', header: 'Item code' },
      { field: 'description', header: 'Description' },
      { field: 'abscode', header: 'Abs Code' },
      { field: 'prodqty', header: 'Prod. Qty' },
      { field: 'rejqty', header: 'Rej. Qty' },
      { field: 'consumption', header: 'Consumption' },
      // { field: 'unitcons', header: 'Consumption for 1 unit' },
      { field: 'rejcons', header: 'Rej Consumption' },
      { field: 'uom', header: 'Uom' },

    ];
    this.monthName = '';
    this.mouldprodService.mouldprodDetail = [];
    $('#basicExampleModal').modal('show');
    this.selected_eventdate = this.datePipe.transform(model.event.start, 'yyyy-MM-dd');
    this.detailLoading = true;
    this.mouldprodService.getMProdctionClickData(this.selectedcode, this.selected_eventdate)
      .toPromise()
      .then(res => {
        const mouldprodDetail = res as Mouldproduction[];
        mouldprodDetail.forEach(mouldprod => {
          if (mouldprod.uom == "G") {
            mouldprod.uom = "KG";
            mouldprod.consumption = mouldprod.consumption / 1000;
          }

          mouldprod.unitcons = mouldprod.consumption / mouldprod.prodqty;
          mouldprod.rejcons = mouldprod.unitcons * mouldprod.rejqty;

          this.mouldprodService.mouldprodDetail.push(mouldprod);
        });
        // this.mouldprodService.mouldprodDetail = res as Mouldproduction[];
        this.detailLoading = false;
      });

  }

  //top btn click
  extraVal(val, val2) {
    this.cols = [];
    this.selected_eventdate = '';
    this.customclass = "lessWidth";

    this.cols = [
      { field: 'itemcode', header: 'Item code' },
      { field: 'description', header: 'Description' },
    ];

    if (val2 == "opening") {
      this.cols.push({ field: 'opening', header: 'Opening' });
    } else if (val2 == "prodqty") {
      this.cols.push({ field: 'abscode', header: 'Abs Code' }, { field: 'prodqty', header: 'Prod. Qty' });
    } else if (val2 == "rejqty") {
      this.cols.push({ field: 'abscode', header: 'Abs Code' }, { field: 'rejqty', header: 'Rej. Qty' });
    } else if (val2 == "consumption") {
      this.cols.push({ field: 'abscode', header: 'Abs Code' },
        { field: 'consumption', header: 'consumption' });
    } else if (val2 == "issuedqty") {
      this.cols.push({ field: 'issuedqty', header: 'Issued Qty' });
    }
    this.cols.push({ field: 'uom', header: 'Uom' });

    this.monthName = this.datePipe.transform(this.sDate, 'yyyy-MM-d');

    this.mouldprodService.mouldprodDetail = [];
    $('#basicExampleModal').modal('show');
    this.detailLoading = true;
    this.mouldprodService.btnclick(val, this.selectedcode, this.startdate)
      .toPromise()
      .then(res => {
        const data = res as Mouldproduction[];
        if (val2 == "opening" || val2 == "consumption" || val2 == "issuedqty") {
          if (data && data.length) {
            data.forEach(row => {
              if (val2 == "opening") {
                // row.opening = row.opening / 1000;
              }
              if (val2 == "issuedqty") {
                // row.issuedqty = row.issuedqty / 1000;
              }
              if (val2 == "consumption") {
                //row.consumption = row.consumption / 1000;
              }
              if (row.uom == "G") {
                row.uom = "KG";
                row.consumption = row.consumption / 1000;
              }
            });

            this.mouldprodService.mouldprodDetail = data;

          }
        } else {
          this.mouldprodService.mouldprodDetail = res as Mouldproduction[];

        }
        this.detailLoading = false;
      });


  }
  balance() {
    this.balance2 = 0;
    this.balance2 = this.opening + this.issuedqty - Math.abs(this.consumption)
    return this.balance2;
  }
  //selected plant
  selectedPlanName() {
    const me = this;
    if (this.plantservice && this.plantservice.splantlist && me.selectedcode) {
      this.plantservice.splantlist.forEach(function (element, i) {
        if (element.plantcode == me.selectedcode) {
          me.selected_plantname = element.plantshortname;
        }
      });
    }
    // return this.selected_plantname;
  }
}
