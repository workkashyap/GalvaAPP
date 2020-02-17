import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/login/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../shared/user/user.service';
import { User } from '../shared/login/User.model';
import { ActionplanService } from '../shared/inbox/actionplan.service';
import { ApprovalcountService } from '../shared/approvalcounts/approvalcount.service';
import { Opentask } from '../shared/approvalcounts/opentask.model';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {
  currentUser: User;
  pendingapproval: number[];
  users: any[];
  public OpenTask: Opentask ;
  public  opentaskCnt: string;
  constructor(
    public service: UserService,
    private toastr: ToastrService,
    public lservice: LoginService,
    public sactionservice: ActionplanService,
    private route: Router,
    public approvalcount: ApprovalcountService
  ) {
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
  }

  ngOnInit() {
    this.OpenTask = {
      id: 0,
      loginid: 0,
      opentaskcnt: 0
    };
    this.service.getuserbyid(this.currentUser.id);
    this.approvalcount.completedtaskcount();
  //  this.approvalcount.opentaskcount();
    this.approvalcount.pendingapprovalcount();
    this.approvalcount.opentaskcount()
    .toPromise()
    .then(res => {
      this.approvalcount.opentasklist = res as Opentask[];
    });

  }
  pendingapprovalcount() {
    return 0;
  }
  gotopendingtask(id) {
    this.sactionservice.userid = id;
    this.route.navigate(['/pending-task']);
  }

  gotopentask(id) {
    this.sactionservice.userid = id;
    this.route.navigate(['/open-task']);
  }
  gotcompletedtask(id) {
    this.sactionservice.userid = id;
    this.route.navigate(['/completed-task']);
  }
  
  getopentaskcount(id) {
    for (const item of  this.approvalcount.opentasklist) {
      if (item.loginid === id) {
        return item.opentaskcnt;
      }
    }
    return 0;
  }
  getpendingcount(id) {
    for (const item of  this.approvalcount.pendingapprovallist) {
      if (item.loginid === id) {
        return item.pendingapprovalcnt;
      }
    }
    return 0;
  }
  getcompletedcount(id) {
    for (const item of  this.approvalcount.completedtasklist) {
      if (item.loginid === id) {
        return item.completedtaskcnt;
      }
    }
    return 0;
  }
}
