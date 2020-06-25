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
  role_id: any;
  i: number = 0;
  is_checked: boolean = false;
  save_rolepage: any;
  constructor(
    public datePipe: DatePipe,
    public lservice: LoginService,
    public toastr: ToastrService,
    public rolesService: RolepagesService,

  ) {
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    this.save_rolepage = {
      id: 0, pageid: 0, roleid: 0
    }
  }

  errorInput: any = '';
  editing: boolean = false;

  ngOnInit() {

    this.cols = [
      { field: "selected", header: "-", width: "15px" },
      { field: "pageid", header: "Page", width: "75px" },
      //   { field: "pageid", header: "Page", width: "75px" },

      //  { field: "edit", header: "Action", width: "100px" }
    ];
    // this.getData();
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
        me.role_id = me.roles[0].id;
        me.getData();
      });
  }

  getData() {
    let me = this;
    me.loading = true;
    me.allRoleAssigned = [];
    this.rolesService
      .getpagesbyrole(me.role_id)
      .toPromise()
      .then(res => {
        me.allRoleAssigned = res as Rolepages[];
        me.loading = false;

      });
  }
  checkPage(id, row) {
    const me = this;
    this.is_checked = false;
    if (this.allRoleAssigned) {
      for (this.i = 0; this.i < this.allRoleAssigned.length; this.i++) {
        if (me.allRoleAssigned[me.i].pageid == id) {
          row.myid = me.allRoleAssigned[me.i].id;
          me.is_checked = true;
          break;
        }
      }
    }
    return this.is_checked;
  }
  onRowEditInit(row: any) {
    this.cols[0].width = "15px";
    this.cols[1].width = "75px";
    this.clonedData[row.id] = { row };
  }
  saveData(ev, row) {
    const me = this;
    if (ev.target.checked) {
      this.save_rolepage.id = 0;
      this.save_rolepage.roleid = parseInt(me.role_id);
      this.save_rolepage.pageid = parseInt(row.id);
      //console.log("save:", this.save_rolepage);

      this.rolesService.insertRolePage(me.save_rolepage).subscribe(
        res => {
          me.toastr.success('Submitted Successfully', 'Save Page Role');
          console.log('Saved successfully');

          me.getData();
          me.resetColumnWidth();
        },
        err => {
          console.log(err);
        });
    } else {
      //console.log("row : ", row);
      //save this.completed_days = 0;
      if (row.myid) {
        this.rolesService.deleteRolePage(row.myid).subscribe(
          res => {
            this.toastr.success('Deleted Successfully', 'Save Page Role');
            me.getData();
            me.resetColumnWidth();
          },
          err => {
            console.log(err);
          });
      }
    }


  }
  rolepage() {
    this.getData();
  }
  onRowEditSave(row: any) {
    const me = this;
    //row.id = 0;
    row.roleid = parseInt(this.role_id);
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
      "name": 0,
    }
  }
}
