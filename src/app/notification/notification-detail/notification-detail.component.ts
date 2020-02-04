import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InboxService } from 'src/app/shared/inbox/inbox.service';
import { Inbox } from 'src/app/shared/inbox/inbox.model';

import { DatePipe } from '@angular/common';
import { User } from 'src/app/shared/login/User.model';
import { LoginService } from 'src/app/shared/login/login.service';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.css'],
  providers: [DatePipe]
})
export class NotificationDetailComponent implements OnInit {

  private messageid: number;
  public currentUser: User;
  public todayDate: string;
  private loading = false;
  public inbox: Inbox;
  constructor(private lservice: LoginService, private route: ActivatedRoute, public service: InboxService, private datePipe: DatePipe
    ) {
      this.lservice.currentUser.subscribe(x => (this.currentUser = x));
      this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.service.actionplanData.userid = this.currentUser.id;
    }

  ngOnInit() {
    this.messageid = this.service.messageid;
    this.service.actionplanData.messageid = this.messageid;
    // this.service.actionplanData.createddate = this.todayDate;
    console.log(this.messageid);
    this.service.messagebyid(this.messageid);
   }

}
