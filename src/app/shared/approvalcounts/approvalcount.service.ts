import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Opentask } from './opentask.model';
import { Completedtask } from './completedtask.model';
import { Pendingapproval } from './pendingapproval.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApprovalcountService {
  public opentasklist: Opentask[] = [];
  public completedtasklist: Completedtask[] = [];
  public pendingapprovallist: Pendingapproval[] = [];
  readonly rootUrl = environment.apiUrl;
  

constructor(public http: HttpClient
  ) { }

  public pendingapprovalcount(): any {
    return this.http
      .get(this.rootUrl + '/pendingapprovals')
      .toPromise()
      .then(res => {
        this.pendingapprovallist = res as Pendingapproval[];
      });
  }

  
  public completedtaskcount(): any {
    return this.http
      .get(this.rootUrl + '/completedtasks')
      .toPromise()
      .then(res => {
        this.completedtasklist = res as Completedtask[];
      });
  }

  public opentaskcount(): Observable<Opentask[]> {
    return this.http.get<Opentask[]>(this.rootUrl + '/opentasks');
  }
  
}
