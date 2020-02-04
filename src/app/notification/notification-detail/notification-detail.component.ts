import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InboxService } from 'src/app/shared/inbox/inbox.service';
import { Inbox } from 'src/app/shared/inbox/inbox.model';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.css']
})
export class NotificationDetailComponent implements OnInit {

  private messageid: number;
  private loading = false;
  public inbox: Inbox;
  constructor(private route: ActivatedRoute, public service: InboxService) { }

  ngOnInit() {
    this.messageid = this.service.messageid;
    console.log(this.messageid);
    this.service.messagebyid(this.messageid);
   }

}
