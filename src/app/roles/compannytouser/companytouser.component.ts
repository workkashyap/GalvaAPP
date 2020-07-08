import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/login/User.model';
import { ToastrService } from 'ngx-toastr';

import { LoginService } from '../../shared/login/login.service';
import { DatePipe } from '@angular/common';
import { NgForm } from "@angular/forms";
import { RolepagesService } from 'src/app/shared/roles/rolepages.service';
import { Rolepages } from "../../shared/roles/rolepages.model";
import { Roles } from 'src/app/shared/roles/roles.model';
import { UserService } from '../../shared/user/user.service';

@Component({
  selector: 'app-companytouser',
  templateUrl: './companytouser.component.html',
  styleUrls: ['./companytouser.component.css'],
  providers: [DatePipe]
})
export class CompanytouserComponent implements OnInit {

  currentUser: User;
  public loading = false;
  clonedData: { [s: string]: any; } = {};
  role: any = '';
  is_submit: boolean = false;
  cols: any[];
  allRoleAssigned: any;
  companies: any;
  users: any;
  company_id: any;
  save_rolepage: any;
  i: number = 0;
  is_checked: boolean = false;
  constructor(
    public datePipe: DatePipe,
    public service: UserService,
    public lservice: LoginService,
    public toastr: ToastrService,
    public rolesService: RolepagesService,

  ) {
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    this.service.getuserbyid(this.currentUser.id);

    this.save_rolepage = {
      id: 0, userid: 0, roleid: 0
    }
  }

  errorInput: any = '';
  editing: boolean = false;

  ngOnInit() {

    this.cols = [
      { field: "selected", header: "-", width: "15px" },
      { field: "roleid", header: "User", width: "75px" },
    ];
    //this.getData();
    this.getUsers();
    this.getCompany();

  }
  getCompany() {
    let me = this;
    this.rolesService
      .getAllCompany()
      .toPromise()
      .then(res => {
        me.companies = res as Roles[];
        me.company_id = me.companies[0].plantCode;
        me.getData();
      });
  }
  getUsers() {
    let me = this;
    this.rolesService
      .getAllusers()
      .toPromise()
      .then(res => {
        me.users = res as Rolepages[];
      });
  }

  checkPage(id, row) {
    const me = this;
    this.is_checked = false;
    if (this.allRoleAssigned) {
      for (this.i = 0; this.i < this.allRoleAssigned.length; this.i++) {
        if (me.allRoleAssigned[me.i].userid == id && me.company_id == me.allRoleAssigned[me.i].plantcode) {
          row.myid = me.allRoleAssigned[me.i].gpid;
          me.is_checked = true;
          break;
        }
      }
    }
    return this.is_checked;
  }

  saveData(ev, row) {
    const me = this;
    if (ev.target.checked) {

      this.save_rolepage.id = 0;
      this.save_rolepage.plantcode = me.company_id;
      this.save_rolepage.userid = parseInt(row.id);

      console.log("save:", this.save_rolepage);

      this.rolesService.insertUserCompany(me.save_rolepage).subscribe(
        res => {
          me.toastr.success('Submitted Successfully', 'Save Company To User');
          console.log('Saved successfully');
          me.getData();
          //  me.resetColumnWidth();
        },
        err => {
          console.log(err);
        });
    } else {
      console.log("row : ", row);
      //save this.completed_days = 0;
      /*if (row.myid) {
        this.rolesService.deleteUserCompany(row.myid).subscribe(
          res => {
            this.toastr.success('Deleted Successfully', 'Save Company To User');

            me.getData();
            // me.resetColumnWidth();
          },
          err => {
            console.log(err);
          });
      }*/
    }
  }

  companypage() {
    this.getData();
  }
  getData() {
    let me = this;
    me.loading = true;
    me.allRoleAssigned = [];
    this.rolesService
      .getcompanybyuser(me.company_id)
      .toPromise()
      .then(res => {
        me.allRoleAssigned = res as Rolepages[];
        me.loading = false;

      });
  }

}
