import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/login/User.model';
import { ToastrService } from 'ngx-toastr';

import { LoginService } from '../../shared/login/login.service';
import { DatePipe } from '@angular/common';
import { NgForm } from "@angular/forms";
import { RolepagesService } from 'src/app/shared/roles/rolepages.service';
import { Rolepages } from "../../shared/roles/rolepages.model";
import { Roles } from 'src/app/shared/roles/roles.model';

@Component({
  selector: 'app-roletopages',
  templateUrl: './roletopages.component.html',
  styleUrls: ['./roletopages.component.css'],
  providers: [DatePipe]
})
export class RoletopagesComponent implements OnInit {

  currentUser: User;
  public loading = false;
  clonedData: { [s: string]: any; } = {};
  role: any = '';
  is_submit: boolean = false;
  cols: any[];
  allRoleAssigned: any;
  roles: any;
  pages: any;
  constructor(
    public datePipe: DatePipe,
    public lservice: LoginService,
    public toastr: ToastrService,
    public rolesService: RolepagesService,

  ) {
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
  }

  errorInput: any = '';
  editing: boolean = false;

  ngOnInit() {

    this.cols = [
      { field: "roleid", header: "Role", width: "75px" },
      { field: "pageid", header: "Page", width: "75px" },

      { field: "edit", header: "Action", width: "100px" }
    ];
    this.getData();
    this.getPages();
    this.getRoles();

  }
  getPages() {
    let me = this;
    this.rolesService
      .getAllPages()
      .toPromise()
      .then(res => {
        me.pages = res as Rolepages[];

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
      .getAllRolePages()
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
    row.pageid = parseInt(row.pageid);
    if (row.id) {
      console.log("Update", row);
      this.rolesService.updateRolePage(row).subscribe(
        res => {
          me.toastr.success('Updated Successfully', 'Save Page Role');
          me.getData();
          me.resetColumnWidth();
        },
        err => {
          console.log(err);
        });
    } else {
      console.log("Insert", row);
      this.rolesService.insertRolePage(row).subscribe(
        res => {
          me.toastr.success('Submitted Successfully', 'Save Page Role');
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

    this.rolesService.deleteRolePage(row).subscribe(
      res => {
        this.toastr.success('Deleted Successfully', 'Save Page Role');
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
      "roleid": 0,
      "pageid": 0,
      "edit": false
    }
  }
}
