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
  selector: 'app-roletouser',
  templateUrl: './roletouser.component.html',
  styleUrls: ['./roletouser.component.css'],
  providers: [DatePipe]
})
export class RoletouserComponent implements OnInit {

  currentUser: User;
  public loading = false;
  clonedData: { [s: string]: any; } = {};
  role: any = '';
  is_submit: boolean = false;
  cols: any[];
  allRoleAssigned: any;
  roles: any;
  users: any;
  role_id: any;
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
    this.getRoles();

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
        if (me.allRoleAssigned[me.i].userid == id) {
          row.myid = me.allRoleAssigned[me.i].id;
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
      this.save_rolepage.roleid = parseInt(me.role_id);
      this.save_rolepage.userid = parseInt(row.id);

      console.log("save:", this.save_rolepage);

      this.rolesService.insertUserRole(me.save_rolepage).subscribe(
        res => {
          me.toastr.success('Submitted Successfully', 'Save Role To User');
          console.log('Saved successfully');
          me.getData();
          me.resetColumnWidth();
        },
        err => {
          console.log(err);
        });
    } else {
      console.log("row : ", row);
      //save this.completed_days = 0;
      if (row.myid) {
        this.rolesService.deleteUserRole(row.myid).subscribe(
          res => {
            this.toastr.success('Deleted Successfully', 'Save Role To User');

            me.getData();
            me.resetColumnWidth();
          },
          err => {
            console.log(err);
          });
      }
    }
  }

  getRoles() {
    let me = this;
    this.rolesService
      .getAllRoles()
      .toPromise()
      .then(res => {
        me.roles = res as Roles[];
        me.role_id = me.roles[0].id;
        me.getData();
      });
  }
  rolepage() {
    this.getData();
  }
  getData() {
    let me = this;
    me.loading = true;
    me.allRoleAssigned = [];
    this.rolesService
      .getpagesbyuser(me.role_id)
      .toPromise()
      .then(res => {
        me.allRoleAssigned = res as Rolepages[];
        me.loading = false;

      });
  }
  onRowEditInit(row: any) {
    this.cols[0].width = "15px";
    this.cols[1].width = "75px";
    this.clonedData[row.id] = { row };
  }

  onRowEditSave(row: any) {
    const me = this;
    //row.id = 0;
    row.roleid = parseInt(row.roleid);
    row.userid = parseInt(row.userid);
    if (row.id) {
      console.log("Update", row);
      this.rolesService.updateUserRole(row).subscribe(
        res => {
          me.toastr.success('Updated Successfully', 'Save User Roles');
          me.getData();
          me.resetColumnWidth();
        },
        err => {
          console.log(err);
        });
    } else {
      console.log("Insert", row);
      this.rolesService.insertUserRole(row).subscribe(
        res => {
          me.toastr.success('Submitted Successfully', 'Save User Roles');
          console.log('Saved successfully');
          me.getData();
          me.resetColumnWidth();
        },
        err => {
          console.log(err);
        });
    }
  }
  onRowDelete(row: any) {

    this.rolesService.deleteUserRole(row).subscribe(
      res => {
        this.toastr.success('Deleted Successfully', 'Save User Roles');
        this.getData();
      },
      err => {
        console.log(err);
      });
  }
  resetColumnWidth() {
    this.cols[0].width = "15px";
    this.cols[1].width = "75px";
  }

  onRowEditCancel(row: any, index: number) {
    // this.allActionPlan[index] = this.clonedData[row.id];
    if (!row.id) {
      this.allRoleAssigned.splice(index, 1);
    }
    delete this.clonedData[row.id];
    this.resetColumnWidth();
  }
  newRow() {
    this.cols[0].width = "15px";
    this.cols[1].width = "75px";

    return {
      "id": 0,
      "userid": 0,
      "roleid": 0,
      "edit": false
    }
  }
}
