import { Injectable } from '@angular/core';
import { Inbox } from './inbox.model';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InboxService {
public inboxData: Inbox;
public inboxlist: Inbox[] = [];
readonly rootUrl = environment.apiUrl;
public messageid: number;
constructor(public http: HttpClient) { }

public getmessagebyid(id): any {
  return this.http.get(this.rootUrl + '/inboxes/byuser/' + id)
  .toPromise()
  .then(res => {
    this.inboxlist = res as Inbox[];
    }
    );


}

public messagebyid(id): any {
  return this.http.get(this.rootUrl + '/inboxes/' + id)
   .toPromise()
   .then(res => {
     this.inboxData = res as Inbox;
       });

 }

}
