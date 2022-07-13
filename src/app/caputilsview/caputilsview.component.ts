import { Component, OnInit } from "@angular/core";
import { LoginService } from "../shared/login/login.service";
import { User } from "../shared/login/User.model";
import { CaputilsService } from '../shared/caputils/caputils.service';
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { InboxService } from "../shared/inbox/inbox.service";
import { PlantService } from '../shared/plant/plant.service';

@Component({
  selector: 'app-caputilsview',
  templateUrl: './caputilsview.component.html',
  styleUrls: ['./caputilsview.component.css'],
  providers: [DatePipe]
})
export class CaputilsviewComponent implements OnInit {

  public currentUser: User;
  public loading = false;

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
  
  public monthNames: any;
  public d: any;
  public x: number;
  
  constructor(
    private datePipe: DatePipe,
    public plantservice: PlantService,
    public lservice: LoginService,
    public caputilsservice: CaputilsService,
    public iservice: InboxService,
    private route: Router
    
  ) { }

  ngOnInit() {
   // const me = this;
    this.loading = true;
    this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    this.plantcode = 1010;
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
    ];
    //this.caputilsservice.getallData();
    this.loading = false;

    this.caputilsservice.getallDataMonth(this.yearname, this.index, this.plantcode);

    this.date = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.caputilsservice.getAvgPer(this.yearname, this.index, this.plantcode)
    console.log(this.caputilsservice.getAvgPer(this.yearname, this.index, this.plantcode));
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
    this.caputilsservice.getallDataMonth(this.yearname, this.index, this.selectedcode);
    this.caputilsservice.getAvgPer(this.yearname, this.index, this.selectedcode);
  }

  getselectedyear() {
    this.year = this.yearname;
    this.caputilsservice.getallDataMonth(this.yearname, this.index, this.selectedcode);
    this.caputilsservice.getAvgPer(this.yearname, this.index, this.selectedcode);
  }

  getselectedmonth() {
    this.Month = this.monthname;
    this.x = this.monthNames.indexOf(this.Month) + 1;
    this.index = this.x.toString();
    this.caputilsservice.getallDataMonth(this.yearname, this.index, this.selectedcode);
    this.caputilsservice.getAvgPer(this.yearname, this.index, this.selectedcode);
  }
}
