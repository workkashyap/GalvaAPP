import { Component, OnInit } from '@angular/core';
import { User } from '../shared/login/User.model';
import { ToastrService } from 'ngx-toastr';

import { LoginService } from '../shared/login/login.service';
import { DatePipe } from '@angular/common';
import { NgForm } from "@angular/forms";
import { RolepagesService } from 'src/app/shared/roles/rolepages.service';
import { Roles } from "../shared/roles/roles.model";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
  providers: [DatePipe]
})
export class RolesComponent implements OnInit {

  currentUser: User;
  public loading = false;
  clonedData: { [s: string]: any; } = {};
  role: any = '';
  is_submit: boolean = false;
  cols: any[];
  allRoles: any;
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
      { field: "role", header: "Role", width: "75px" },
      { field: "edit", header: "Action", width: "100px" }
    ];
    this.getData();
  }


  getData() {
    let me = this;
    me.loading = true;

    this.rolesService
      .getAllRoles()
      .toPromise()
      .then(res => {
        me.loading = false;

        me.allRoles = res as Roles[];
      });
  }

  onRowEditInit(row: any) {
    this.cols[0].width = "75px";
    this.cols[1].width = "100px";
    this.clonedData[row.id] = { row };
  }

  onRowEditSave(row: any) {
    const me = this;
    //row.id = 0;

    if (row.id) {
      console.log("Update", row);
      this.rolesService.updateRoles(row).subscribe(
        res => {
          me.toastr.success('Updated Successfully', 'Save Role');
          me.getData();
          me.resetColumnWidth();
        },
        err => {
          console.log(err);
        });
    } else {
      console.log("Insert", row);
      this.rolesService.insertRoles(row).subscribe(
        res => {
          me.toastr.success('Submitted Successfully', 'Save Role');
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

    this.rolesService.deleteRoles(row).subscribe(
      res => {
        this.toastr.success('Deleted Successfully', 'Save Role');
        this.getData();
      },
      err => {
        console.log(err);
      });
  }
  resetColumnWidth() {
    this.cols[0].width = "75px";
    this.cols[1].width = "100px";
  }

  onRowEditCancel(row: any, index: number) {
    // this.allActionPlan[index] = this.clonedData[row.id];
    if (!row.id) {
      this.allRoles.splice(index, 1);
    }
    delete this.clonedData[row.id];
    this.resetColumnWidth();
  }
  newRow() {
    this.cols[0].width = "75px";
    this.cols[1].width = "100px";
    return {
      "id": 0,
      "role": "",
      "edit": false
    }
  }

}
