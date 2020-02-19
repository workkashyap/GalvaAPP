import { Component, OnInit } from '@angular/core';
import { ActionplanService } from 'src/app/shared/inbox/actionplan.service';
import { LoginService } from 'src/app/shared/login/login.service';
import { InboxService } from 'src/app/shared/inbox/inbox.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/login/User.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { Options } from 'ng5-slider';
import { FiledownloadComponent } from 'src/app/Filedownload/Filedownload.component';
import { DownloadfileService } from 'src/app/shared/Downloadfile.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './pendingtask-detail.component.html',
  styleUrls: ['./pendingtask-detail.component.css'],
  providers: [DatePipe]
})
export class PendingtaskdetailComponent implements OnInit {
  public currentUser: User;
  public actionvalue: string;
  public cDate: string;
  public newactiondate: string;
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
    private datePipe: DatePipe,
    public fservice: DownloadfileService
  ) {}

  backtopendingtask() {
    this.iservice.uid = this.currentUser.id;
    this.route.navigate(['./pending-task']);
  }
  ngOnInit() {
    this.cDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.resetForm();
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
    this.service.getTaskDetailbyid(this.service.id);
    this.fservice.fileName = this.service.taskdata.attachment;
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
      progress: 0
    };
  }

  onComplete(form: NgForm) {
    if (this.actionvalue === 'Submit') {
      this.service.taskdata.isopen = '4';
      this.service.taskdata.closedate = this.cDate;
      this.service.putTaskData().subscribe(
        res => {
          this.resetForm(form);
          this.toastr.success('Completed', 'Approved task');
          this.route.navigate(['./task-approve']);
          // this.ngOnInit();
          // this.service.refreshList();
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.service.taskdata.isopen = '1';
      this.service.taskdata.actiondate = this.newactiondate;
      this.service.putTaskData().subscribe(
        res => {
          this.resetForm(form);
          this.toastr.warning('Reopen task', 'Reopen task');
          this.route.navigate(['./task-approve']);
          // this.ngOnInit();
          // this.service.refreshList();
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  onSubmitClick() {
    this.actionvalue = 'Submit';
  }
  onReopenClick() {
    this.actionvalue = 'Reopen';
  }
}
