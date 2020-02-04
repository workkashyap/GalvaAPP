import { Component, OnInit } from '@angular/core';
import { InboxService } from '../shared/inbox/inbox.service';
import { Inbox } from '../shared/inbox/inbox.model';
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/login/user.model';
import { LoginService } from '../shared/login/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  currentUser: User;
  User: string;
  Id: number;
  inbox: Inbox[];
  subject: string[] = [];
  public loading = false;
  cpage: {};
  constructor(private toastr: ToastrService, public service: InboxService, public lservice: LoginService, private route: Router) { 
    this.lservice.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    console.log(this.currentUser.id);
    this.loading = true;
    this.service.getmessagebyid(this.currentUser.id);
    this.loading = false;
  }

  opendetail(id) {
    this.service.messageid = id;
    this.route.navigate(['/notification-detail']);
  }

}
