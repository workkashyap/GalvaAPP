import { Component, OnInit } from "@angular/core";
import { LoginService } from "../shared/login/login.service";
import { User } from "../shared/login/User.model";
import { CaputilsService } from '../shared/caputils/caputils.service';
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { InboxService } from "../shared/inbox/inbox.service";
import { PlantService } from '../shared/plant/plant.service';
import { Plant } from '../shared/plant/plant.model';

@Component({
  selector: 'app-caputilsview',
  templateUrl: './caputilsview.component.html',
  styleUrls: ['./caputilsview.component.css'],
  providers: [DatePipe]
})
export class CaputilsviewComponent implements OnInit {

  public currentUser: User;
  public loading = false;
  public typename: string;
  public type: string;
  selectedCaputils: CaputilsService;
  cols: any;

  public selectedcode: any;
  public year: string;
  public yearname: string;
  public plantcode: any;
  public date: string;
  public Month: string;
  public index: string;
  public monthname: string;
  public isReadOnly = false;
  public monthNames: any;
  public d: any;
  public x: number;
  
  constructor(
    private datePipe: DatePipe,
    public plantservice: PlantService,
    public lservice: LoginService,
    public caputilsservice: CaputilsService,
    public iservice: InboxService,
    private route: Router,
    
    
  ) {
    const me = this;
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
   }

  ngOnInit() {
   // const me = this;
    this.loading = true;
    this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    this.plantcode = 1010;
    this.typename = "ALL";
    this.d = new Date();
    this.monthname = this.monthNames[this.d.getMonth()];
    this.yearname = this.d.getFullYear();
    this.x = this.monthNames.indexOf(this.monthname) + 1;
    this.index = this.x.toString();
   
    const me = this;
    this.loading = true;
    this.cols = [
      { field: "view", header: "Action" },
      { field: "entrydate", header: "Production Date" },
      { field: "plantcode", header: "Plant" },
      { field: "linetype", header: "Line Type" },
      { field: "plantround", header: "Plan Round" },
      { field: "planremark", header: "Plan Remark" },
      { field: "actualround", header: "Actual round", display: 'false' },
    ];
    // this.caputilsservice.getallData();
    this.loading = false;

    this.plantservice
        .sgetPlantData(me.currentUser.id)
        .toPromise()
        .then(res => {
          me.plantservice.splantlist = [];
          const splantlist = res as Plant[];
          splantlist.forEach(splant => {
            me.plantservice.splantlist.push(splant);
          });
          me.selectedcode = "ALL";
        });

    if (me.caputilsservice.id) {
          me.caputilsservice.caputilsbyid(me.caputilsservice.id)
            .toPromise()
            .then((res: any) => {
              this.caputilsservice.caputilsData = res; //as Productions[];
              this.caputilsservice.caputilsData.entrydate = this.datePipe.transform(this.caputilsservice.caputilsData.entrydate, "yyyy-MM-dd");
              if(this.caputilsservice.caputilsData.actualround > 0) {
                this.isReadOnly = true;
              }else {
                this.isReadOnly = false;
              }
            });
        }
      

    this.caputilsservice.getallDataMonth_(this.yearname, this.index, this.plantcode, this.typename);

    this.date = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    // this.caputilsservice.getAvgPer_(this.yearname, this.index, this.plantcode, this.typename);
  }

  opendetail(id) {
    this.caputilsservice.id = id;
    this.route.navigate(["/caputils"]);
  }

  addNewMaterial() {
    this.caputilsservice.id = 0;
    this.route.navigate(["./caputils"]);
  }
  selectedGrid(ev) {
    this.selectedcode = ev;
    this.caputilsservice.getallDataMonth_(this.yearname, this.index, this.selectedcode, this.typename);
    // this.caputilsservice.getAvgPer_(this.yearname, this.index, this.selectedcode, this.typename);
  }

  getselectedyear() {
    this.year = this.yearname;
    this.caputilsservice.getallDataMonth_(this.yearname, this.index, this.selectedcode, this.typename);
    // this.caputilsservice.getAvgPer_(this.yearname, this.index, this.selectedcode, this.typename);
  }

  getselectedmonth() {
    this.Month = this.monthname;
    this.x = this.monthNames.indexOf(this.Month) + 1;
    this.index = this.x.toString();
    this.caputilsservice.getallDataMonth_(this.yearname, this.index, this.selectedcode, this.typename);
    // this.caputilsservice.getAvgPer_(this.yearname, this.index, this.selectedcode, this.typename);
  }
  getselectedtype() {
    this.type = this.typename;
    this.caputilsservice.getallDataMonth_(this.yearname, this.index, this.selectedcode, this.typename);
    // this.caputilsservice.getAvgPer_(this.yearname, this.index, this.selectedcode, this.typename);
  }
}
