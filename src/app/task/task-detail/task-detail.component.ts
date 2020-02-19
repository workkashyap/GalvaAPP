import { Component, OnInit } from '@angular/core';
import { ActionplanService } from 'src/app/shared/inbox/actionplan.service';
import { LoginService } from 'src/app/shared/login/login.service';
import { InboxService } from 'src/app/shared/inbox/inbox.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/login/User.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Options } from 'ng5-slider';
import { DownloadfileService } from 'src/app/shared/Downloadfile.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  public currentUser: User;
  public actionvalue: string;
  value: number = 0;
  options: Options = {
    floor: 0,
    ceil: 100
  };
  constructor(
    public service: ActionplanService,
    private toastr: ToastrService,
    public lservice: LoginService,
    public iservice: InboxService,
    private route: Router,
    public fservice: DownloadfileService
  ) {}

  backtotask() {
    this.route.navigate(['./task']);
  }
  ngOnInit() {
    this.resetForm();
    console.log(this.iservice.uid);
    console.log(this.service.id);
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    this.service.getTaskDetailbyid(this.service.id);
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }
    this.service.taskdata = {
      id: this.service.id,
      description: '',
      messageid: 0,
      loginid: 0,
      actiondate: '',
      createddate: '',
      closedate: '',
      isopen: '2',
      resolvedesc: '',
      attachment: '',
      progress: 0
    };
  }

  onComplete(form: NgForm) {
    if (this.actionvalue === 'SendApproval')
    {
    this.service.taskdata.isopen = '2';
    this.service.putTaskData().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Pending for Approval', 'for Approval');
        // this.ngOnInit();
        // this.service.refreshList();
        this.route.navigate(['./task']);
      },
      err => {
        console.log(err);
      }
    );
    }
    else {
      // this.service.taskdata.isopen = '1';
      this.service.taskdata.progress = this.service.taskdata.progress;
      this.service.taskdata.attachment = this.fservice.fileName;
      this.service.putTaskData().subscribe(
        res => {
          this.resetForm(form);
          this.toastr.success('Save', 'Save Task');
          // this.ngOnInit();
          // this.service.refreshList();
          this.route.navigate(['./task']);
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  onSaveClick() {
    this.actionvalue = 'Save';

  }
  onSendapprovalClick() {
    this.actionvalue = 'SendApproval';
  }
}
