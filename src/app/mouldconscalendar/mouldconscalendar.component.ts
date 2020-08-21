import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { PlantService } from '../shared/plant/plant.service';
import { DatePipe } from '@angular/common';
import { CreateactionplanService } from "../shared/createactionplan/createactionplan.service";
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../shared/login/login.service';
import { User } from '../shared/login/User.model';
import { Salesdetail } from '../shared/dailyProduction/salesdetail.model';
import { Purchasecalendar } from '../shared/purchase/purchasecalendar.model'; // '../shared/dailyProduction/purchasedetail.model';
import { Plant } from '../shared/plant/plant.model';
import { MouldconscalendarService } from '../shared/mouldconscalendar/mouldconscalendar.service';
import { Mouldconscalendar } from '../shared/mouldconscalendar/mouldconscalendar.model';
@Component({
  selector: 'app-mouldconscalendar',
  templateUrl: './mouldconscalendar.component.html',
  styleUrls: ['./mouldconscalendar.component.css'],
  providers: [DatePipe]
})
export class MouldconscalendarComponent implements OnInit {

  modalType: number = 0;

  public sDate: Date;
  public lDate: Date;
  cols: any[];
  loadingData: boolean = false;

  public selectedcode: string;
  public selected_plantname: string;
  public selected_eventdate: any;
  monthName: any;
  calendarPlugins = [dayGridPlugin];
  @ViewChild('calendar', { static: false })
  calendarComponent: FullCalendarComponent;
  calendarApi: any;
  options: any;
  monthNames: any;
  public startdate: string;
  public rejectdata: any;
  public loading = false;

  public detailLoading = false;
  filterenable: boolean = false;

  public currentUser: User;

  selectedItemrejarray: any[];
  filterItemrejarray: any[];
  iv: number = 0;
  //
  i: number = 0;

  constructor(
    public plantservice: PlantService,
    public mconsService: MouldconscalendarService, //DailyproductionService,
    public toastr: ToastrService,
    public datePipe: DatePipe, public apservice: CreateactionplanService,
    public lservice: LoginService,
  ) {
    this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
      'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];
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

    //get plant
    this.plantservice
      .sgetPlantData(me.currentUser.id)
      .toPromise()
      .then(res => {
        me.plantservice.splantlist = res as Plant[];
        me.selectedcode = me.plantservice.splantlist[0].plantcode;
        me.selected_plantname = me.plantservice.splantlist[0].plantshortname;
        me.selectedPlanName();
        me.loading = false;
        if (res) {
          me.getdata();
          me.getButtonsData();
        }
      });
  }
  Next() {
    this.calendarApi = this.calendarComponent.getApi();
    this.calendarApi.next();
    this.sDate = this.calendarApi.getDate();
    this.startdate = this.datePipe.transform(this.sDate, 'yyyy-MM-dd');
    this.lDate = new Date(this.sDate.getFullYear(), this.sDate.getMonth() + 1, 0);
  }
  Previous() {
    this.calendarApi = this.calendarComponent.getApi();
    this.calendarApi.prev();
    this.sDate = this.calendarApi.getDate();
    this.startdate = this.datePipe.transform(this.sDate, 'yyyy-MM-dd');
    this.lDate = new Date(this.sDate.getFullYear(), this.sDate.getMonth() + 1, 0);
  }

  customNumber(value) {
    return parseInt(value, 10) //convert to int
  }
  getdata() {
    let me = this;
    this.loading = true;
    me.mconsService.mconsCalendarData = [];

    me.mconsService
      .getmouldconscalendar(me.selectedcode, me.startdate)
      .toPromise()
      .then(res => {
        me.mconsService.mconsCalendarData = res as Mouldconscalendar[];
        me.loading = false;
      });
  }
  getButtonsData() {
    let me = this;
    me.mconsService.mconsbtnData = [];
    me.mconsService
      .getmouldconssum(me.selectedcode, me.startdate)
      .toPromise()
      .then(res => {
        me.loading = false;
        const mconsbtnData = res as Mouldconscalendar[];
        mconsbtnData.forEach(mconsbtn => {
          if (!mconsbtn.qty) {
            mconsbtn.qty = 0;
          }
          if (!mconsbtn.value) {
            mconsbtn.value = 0;
          }
          //mconsbtn.value = mconsbtn.value / 1000;

          mconsbtn.class = mconsbtn.matgroup.replace(/\s/g, '');
          mconsbtn.class = mconsbtn.class.replace('&', '');
          mconsbtn.class = mconsbtn.class.toLowerCase();
          mconsbtn.class = "bg-" + mconsbtn.class;

          me.mconsService.mconsbtnData.push(mconsbtn);

        });
      });
  }
  dateClick(model) {
    console.log(model.date);
  }
  loaddata() {
    this.selectedPlanName();
    this.getdata();
    this.getButtonsData();

  }
  //btn click data
  getBtnClikData(matgroup) {
    this.modalType = 1;

    this.loadingData = true;
    const me = this;
    this.cols = [
      { field: 'itemcode', header: 'Item code' },
      { field: 'description', header: 'Description' },
      { field: 'pGroup', header: 'Group' },
      { field: 'uom', header: 'Uom' },
      { field: 'consumptionQty', header: 'Consumption Qty' },
      { field: 'consumptionValue', header: 'Consumption Value' },
    ];
    this.monthName = this.datePipe.transform(this.startdate, 'yyyy-MM-d');

    this.mconsService.mouldprodDetail = [];

    $('#basicExampleModal').modal('show');

    this.detailLoading = true;
    this.mconsService.getmouldconssumdetail(this.selectedcode, this.startdate)
      .toPromise()
      .then(res => {
        const mouldprodDetail = res as Mouldconscalendar[];
        this.loadingData = false;

        mouldprodDetail.forEach(mouldprodData => {
          if (mouldprodData.pGroup == matgroup) {
            /*if (mouldprodData.uom == "G") {
              mouldprodData.uom = "KG";
              mouldprodData.consumptionValue = mouldprodData.consumptionValue / 1000;
            }*/
            me.mconsService.mouldprodDetail.push(mouldprodData);

          }
        });
        me.detailLoading = false;
      }, error => {
        this.loadingData = false;
      });
  }
  //calendar event click
  eventClick(model) {
    this.modalType = 2;
    const me = this;
    this.cols = [
      { field: 'itemcode', header: 'Item code' },
      { field: 'description', header: 'Material Name' },
      //{ field: 'budat', header: 'Budat' },
      { field: 'pGroup', header: 'Group' },
      { field: 'uom', header: 'Uom' },
      { field: 'qty', header: 'Consumption Qty ' },
      { field: 'consumption', header: 'Consumption Value' },
      { field: 'code', header: 'Code' },
    ];
    this.monthName = '';
    this.mconsService.mouldprodDetail = [];

    $('#basicExampleModal').modal('show');

    this.selected_eventdate = this.datePipe.transform(model.event.start, 'yyyy-MM-dd');
    this.detailLoading = true;
    this.mconsService.getmouldconscaldetail(me.selectedcode, me.selected_eventdate)
      .toPromise()
      .then(res => {
        // me.mconsService.mouldprodDetail = res as Mouldconscalendar[];

        const mouldprodDetail = res as Mouldconscalendar[];
        mouldprodDetail.forEach(mouldprodData => {
          /*if (mouldprodData.uom == "G") {
            mouldprodData.uom = "KG";
            mouldprodData.consumption = mouldprodData.consumption / 1000;
          }*/
          me.mconsService.mouldprodDetail.push(mouldprodData);
        });

        me.detailLoading = false;
      });

  }
  //on change option value
  selectedGrid(ev) {
    this.selectedcode = ev;
    this.selectedPlanName();
    this.getdata();
    this.getButtonsData();

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
  }
}
