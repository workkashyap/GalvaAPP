import { Injectable } from '@angular/core';
import { Inbox } from './inbox.model';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InboxService {
public inboxData: Inbox;
readonly rootUrl = environment.apiUrl;
constructor(public http: HttpClient) { }

public getmessagebyid(id): any {
  return this.http.get(this.rootUrl + '/inboxes/user/' + id)
   .toPromise()
   .then(res => {
     this.inboxData = res as Inbox;
     // this.doctorName = this.doctorData.doctorname;
     // console.log(this.doctorName);
   });

 }

}
