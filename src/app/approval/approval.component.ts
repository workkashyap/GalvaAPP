import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/login/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../shared/user/user.service';
import { User } from '../shared/login/User.model';
import { ActionplanService } from '../shared/inbox/actionplan.service';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {
  currentUser: User;
  pendingapproval: number[];
  users: any[];
  constructor(public service: UserService,
              private toastr: ToastrService,
              public lservice: LoginService,
              public sactionservice: ActionplanService,
              private route: Router
  ) {
    this.lservice.currentUser.subscribe(x => (this.currentUser = x));
   }

ngOnInit() {
  this.service.getuserbyid(this.currentUser.id);
  this.pendingapproval = [1, 2, 3];
  
  }
  pendingapprovalcount() {
    return 0;
  }
}


