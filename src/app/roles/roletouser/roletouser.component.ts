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
  constructor(
    public datePipe: DatePipe,
    public service: UserService,
    public lservice: LoginService,
    public toastr: ToastrService,
    public rolesService: RolepagesService,

  ) {
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    this.service.getuserbyid(this.currentUser.id);

  }

  errorInput: any = '';
  editing: boolean = false;

  ngOnInit() {

    this.cols = [
      { field: "userid", header: "User", width: "75px" },
      { field: "roleid", header: "Role", width: "75px" },

      { field: "edit", header: "Action", width: "100px" }
    ];
    this.getData();
    this.getUsers();
    this.getRoles();

  }
  getUsers() {
    let me = this;
    this.rolesService
      .getAllPages()
      .toPromise()
      .then(res => {
        me.users = res as Rolepages[];
      });
  }
  getRoles() {
    let me = this;
    this.rolesService
      .getAllRoles()
      .toPromise()
      .then(res => {
        me.roles = res as Roles[];
      });
  }

  getData() {
    let me = this;
    me.loading = true;
    this.rolesService
      .getAllUserRole()
      .toPromise()
      .then(res => {
        me.allRoleAssigned = res as Rolepages[];
        me.loading = false;

      });
  }
  onRowEditInit(row: any) {
    this.cols[0].width = "75px";
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
    this.cols[0].width = "75px";
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
    this.cols[0].width = "75px";
    this.cols[1].width = "75px";

    return {
      "id": 0,
      "userid": 0,
      "roleid": 0,
      "edit": false
    }
  }
}
