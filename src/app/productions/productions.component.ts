import { Component, OnInit } from "@angular/core";
import { LoginService } from "../shared/login/login.service";
import { User } from "../shared/login/User.model";
import { ProductionsService } from "../shared/productions/productions.service";
import { Productions } from "../shared/productions/productions.model";

import * as moment from "moment";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { InboxService } from "../shared/inbox/inbox.service";
import { ToastrService } from "ngx-toastr";
import { PlantService } from '../shared/plant/plant.service';
import { Plant } from '../shared/plant/plant.model';

@Component({
  selector: "app-productions",
  templateUrl: "./productions.component.html",
  styleUrls: ["./productions.component.css"],
  providers: [DatePipe],
  styles: [
    `
    .backdrop{
      top: 76px !important;
    }
    `
  ]
})
export class ProductionsComponent implements OnInit {
  public cDate: string;
  public currentUser: User;
  public loading = false;
  cpage: number;
  jobworkMlist: any[];
  cols: any = [];
  selectedItemrej: Productions;
  public selectedcode: any;
  productionlist2: any = [];
  constructor(
    private toastr: ToastrService,
    public lservice: LoginService,
    public plantservice: PlantService,
    private datePipe: DatePipe,
    public productionsService: ProductionsService,
    public iservice: InboxService,
    private route: Router
  ) {
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
  }

  ngOnInit() {
    const me = this;
    this.cols = [
      { field: "view", header: "Action" },
      //  { field: 'id', header: 'ID' },
      { field: 'pstngdate', header: 'Posting Date' },
      { field: "insplot", header: "Insplot" },
      { field: "orderno", header: "Orderno" },
      //{ field: "roundno", header: "roundno" },
      { field: "qty", header: "Qty" },
      { field: "plantcode", header: "Plantcode" },
      // { field: "shift", header: "shift" },
      { field: "itemcode", header: "Itemcode" },
      { field: "itemname", header: "Itemname" },
      { field: "size", header: "Size" },

      { field: "type", header: "Type" },
      { field: "okqty", header: "Okqty" },
      { field: "holdqty", header: "Holdqty" },

      { field: 'buffingqty', header: 'Buffingqty' },
      { field: 'rejectionqty', header: 'Rejectionqty' },

      /* { field: "pitting", header: "pitting" },
       { field: "pinhole", header: "pinhole" },
       { field: "patchmark", header: "patchmark" },
       { field: "nickle", header: "nickle" },*/
    ];
    this.plantservice
      .sgetPlantData(me.currentUser.id)
      .toPromise()
      .then(res => {
        me.plantservice.splantlist = [];
        const splantlist = res as Plant[];
        splantlist.forEach(splant => {
          if (splant.plantcode == "1040" || splant.plantcode == "1050") {
            me.plantservice.splantlist.push(splant);
            // me.selectedcode = ''//me.plantservice.splantlist[0].plantcode;
          }
        });
        // me.plantservice.splantlist = res as Plant[];
        me.selectedcode = me.plantservice.splantlist[0].plantcode;
        me.getDetail();

      });
  }
  getDetail() {
    let me = this;
    me.loading = true;
    me.productionsService.productionlist = [];
    me.productionsService.productions(me.selectedcode).toPromise().then(res => {
      me.productionlist2 = res as Productions[];
      me.getFilterData();
      // me.productionsService.productionlist = res as Productions[];
      me.loading = false;
    }, err => {
      me.loading = false;
    });
  }

  selectedPlant(ev) {
    this.selectedcode = ev;
    //  this.getFilterData()
    this.getDetail()
  }
  getFilterData() {
    let me = this;
    me.loading = true;
    me.productionsService.productionlist = [];

    if (me.productionlist2 && me.productionlist2.length) {
      me.productionlist2.forEach(prdEle => {
        if (prdEle.plantcode == me.selectedcode) {
          me.productionsService.productionlist.push(prdEle);
        }
      });
      me.loading = false;

    } else {
      me.loading = false;
    }
  }
  opendetail(id) {
    this.productionsService.id = id;
    // this.iservice.uid = this.currentUser.id;
    this.route.navigate(["/addproduction"]);
  }
  addNewMaterial() {
    this.productionsService.id = 0;
    // this.iservice.uid = this.currentUser.id;
    this.route.navigate(["./addproduction"]);
  }
}
