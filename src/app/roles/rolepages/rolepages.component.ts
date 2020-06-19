import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/login/User.model';
import { ToastrService } from 'ngx-toastr';

import { LoginService } from '../../shared/login/login.service';
import { DatePipe } from '@angular/common';
import { NgForm } from "@angular/forms";
import { RolepagesService } from 'src/app/shared/roles/rolepages.service';
import { Rolepages } from "../../shared/roles/rolepages.model";

@Component({
  selector: 'app-rolepages',
  templateUrl: './rolepages.component.html',
  styleUrls: ['./rolepages.component.css'],
  providers: [DatePipe]
})
export class RolepagesComponent implements OnInit {
  selectedItemrej: Rolepages;
  currentUser: User;
  public loading = false;
  clonedData: { [s: string]: any; } = {};
  role: any = '';
  is_submit: boolean = false;
  cols: any[];
  allRolepages: any;
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
      { field: "name", header: "Name", width: "75px" },
      { field: "description", header: "Description", width: "175px" },
      { field: "url", header: "Url", width: "75px" },
      { field: "parentid", header: "Page", width: "75px" },

      { field: "edit", header: "Action", width: "100px" }
    ];
    this.getData();
  }


  getData() {
    let me = this;
    me.loading = true;
    this.rolesService
      .getAllPages()
      .toPromise()
      .then(res => {
        me.allRolepages = res as Rolepages[];
        me.loading = false;

      });
  }

  onRowEditInit(row: any) {
    this.cols[0].width = "75px";
    this.cols[1].width = "175px";
    this.cols[2].width = "75px";
    this.cols[3].width = "75px";
    this.clonedData[row.id] = { row };
  }

  onRowEditSave(row: any) {
    const me = this;
    //row.id = 0;

    if (row.id) {
      console.log("Update", row);
      this.rolesService.updatePage(row).subscribe(
        res => {
          me.toastr.success('Updated Successfully', 'Save Page');
          me.getData();
          me.resetColumnWidth();
        },
        err => {
          console.log(err);
        });
    } else {
      console.log("Insert", row);
      this.rolesService.insertPage(row).subscribe(
        res => {
          me.toastr.success('Submitted Successfully', 'Save Page');
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

    this.rolesService.deletePage(row).subscribe(
      res => {
        this.toastr.success('Deleted Successfully', 'Save Page');
        this.getData();
      },
      err => {
        console.log(err);
      });
  }
  resetColumnWidth() {
    this.cols[0].width = "75px";
    this.cols[1].width = "175px";
    this.cols[2].width = "75px";
    this.cols[3].width = "75px";
  }

  onRowEditCancel(row: any, index: number) {
    // this.allActionPlan[index] = this.clonedData[row.id];
    if (!row.id) {
      this.allRolepages.splice(index, 1);
    }
    delete this.clonedData[row.id];
    this.resetColumnWidth();
  }
  newRow() {
    this.cols[0].width = "75px";
    this.cols[1].width = "175px";
    this.cols[2].width = "75px";
    this.cols[3].width = "75px";

    return {
      "id": 0,
      "name": "",
      "description": "",
      "url": "",
      "parentid": "",
      "edit": false
    }
  }
}
