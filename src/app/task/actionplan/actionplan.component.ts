import { Component, OnInit } from '@angular/core';
import { ActionplanService } from 'src/app/shared/inbox/actionplan.service';
import { UserService } from 'src/app/shared/user/user.service';
import { User } from 'src/app/shared/login/User.model';
import { LoginService } from 'src/app/shared/login/login.service';
import { PlantService } from 'src/app/shared/plant/plant.service';
import { Plant } from '../../shared/plant/plant.model';
import { CreateactionplanService } from 'src/app/shared/createactionplan/createactionplan.service';
import { Createactionplan } from "../../shared/createactionplan/createactionplan.model";

@Component({
  selector: 'app-actionplan',
  templateUrl: './actionplan.component.html',
  styleUrls: ['./actionplan.component.css'],
  styles: [
    `
      :host ::ng-deep .ui-table .ui-table-thead > tr > th {
        position: -webkit-sticky;
        position: sticky;
        background: blue;
        color: white;
        font-size:10px;
        top: 0px;
        z-index: 1;
      }
    
     
    
      :host ::ng-deep .ui-table-resizable .ui-resizable-column {
        position: sticky !important;
      }
    
      @media screen and (max-width: 64em) {
        :host ::ng-deep .ui-table .ui-table-thead > tr > th {
          top: 0px;
        }
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
        width: 10px;
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
    `
  ]

})
export class ActionplanComponent implements OnInit {
  selectedPlant: any;
  currentUser: User;
  department: any = 'Plating';
  mode: any = 'Quality';
  public monthNames: any;
  monthname: any;
  allActionPlan: any;
  selectedUser:any;
  public date: any;
  cols: any[];
  selectedItemrej: Createactionplan;
  username :any= '';
  selectedItemrejarray: Createactionplan[] = [];
  filterItemrejarray: Createactionplan[] = [];
  iv: number;
  filterenable = false;

  loading: boolean = false;
  constructor(public service: ActionplanService,
    public apservice: CreateactionplanService, public lservice: LoginService, public uservice: UserService, public plantservice: PlantService,
  ) {
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    this.uservice.getuserbyid(this.currentUser.id).then((res:any)=>{
      this.selectedUser = this.uservice.userlist[0].id;
    });
  }

  ngOnInit() {
    let me = this;
    this.uservice.getusers();
    this.date = new Date();
    this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
      'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];
    this.cols = [
      { field: "weeks", header: "Weeks", width: "75px" },
      { field: "materialCode", header: "Code", width: "75px" },
      { field: "materialDescription", header: "Description", width: "150px" },
      { field: "rejvalue", header: "Rej. Val.", width: "75px" },
      { field: "defect1", header: "Defect 1", width: "100px" },
      { field: "defectval1", header: "Defect Val. 1", width: "80px" },
      { field: "defect2", header: "Defect 2", width: "100px" },
      { field: "defectval2", header: "Defect Val. 2", width: "80px" },
      { field: "defect3", header: "Defect 3", width: "100px" },
      { field: "defectval3", header: "Defect Val. 3", width: "80px" },
      { field: "responsibility", header: "Responsibility", width: "100px" },
      { field: "targetdateofcompletion", header: "Target date", width: "80px" },
      { field: "actionPlan", header: "ActionPlan", width: "160px" },
      { field: "rejper", header: "Reject %", width: "75px" },
      { field: "result", header: "Result", width: "80px" },
      { field: "progresspercent", header: "Progress", width: "75px" },
      { field: "approvedstatus", header: "Status", width: "80px" },
      { field: "attachment", header: "Attachment", width: "130px" },
    ];
    this.monthname = this.monthNames[this.date.getMonth()];

    this.service.getactionview(this.selectedPlant);
    me.loading = true;
    this.plantservice
      .sgetPlantData(me.currentUser.id)
      .toPromise()
      .then(res => {
        me.plantservice.plantlist = res as Plant[];
        me.selectedPlant = me.plantservice.plantlist[0].plantcode;
        me.getData();
        me.loading = false;

      });
  }
  responsibility(id) {
    this.username = '';
    console.log("id",id);
    console.log("this.uservice.userlist ",this.uservice.userlist);
    this.uservice.userlist.forEach(element => {
      if (element.id == id) {
        this.username = element.username;
      }
    });
    return this.username;
  }
  getData() {
    let me = this;
    me.loading = true;

    this.apservice.getActionPlan(this.monthname, me.selectedPlant, this.mode, this.department)
      .toPromise()
      .then(res => {
        me.allActionPlan = res as Createactionplan[];
        me.loading = false;
      });
  }
  loadper(ev, dt) {
    this.selectedItemrejarray = dt.value;
    this.filterenable = true;
    this.iv = 0;
    this.filterItemrejarray = [];
    // console.log(this.selectedItemrejarray[0].id);
    for (const c of this.selectedItemrejarray) {
      if (c.currentDate.toString().includes(ev.toString()) || c.materialCode.toString().includes(ev.toString())
        || c.materialDescription.toString().includes(ev.toString()
          || c.rejper.toString().includes(ev.toString()) || c.id.toString().includes(ev.toString()))) {
        this.filterItemrejarray.push(this.selectedItemrejarray[this.iv]);
        this.iv += 1;
      }
      else {
        this.iv += 1;
      }
    }
  }
  selectedMonth(ev) {
    this.monthname = ev;
    this.getData();
  }
  selectedGrid(ev) {
    this.selectedPlant = ev;
    this.getData();
  }

  selectedMode(ev) {
    this.mode = ev;
    this.getData();
  }
  selectedDepartment(ev) {
    this.department = ev;
    this.getData();
  }
  ///
  getusername(id) {
    for (const item of this.uservice.alluserlist) {
      if (item.id == id) {
        return item.username;
      }
    }
    return 0;
  }
  getplantname(ev) {
    for (const item1 of this.plantservice.plantlist) {
      if (item1.plantcode == ev) {
        return item1.plantshortname;
      }
    }
    return 0;
  }

}
