import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Actionplan } from './actionplan.model';
import { TaskComponent } from 'src/app/task/task.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionplanService {
  public actionplanData: Actionplan;
  //  headers= {
  //   headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //   })
  // }
  public id: number;
  public actiondate: number;
  public createddate: number;
  readonly rootUrl = environment.apiUrl;
  public taskdata: Actionplan;
  public tasklist: Actionplan[] = [];
  public pendingapp: Actionplan[] = [];
  public Completedtask: Actionplan[] = [];

  public allpendinglist: Actionplan[] = [];
  public pendinglist: Actionplan[] = [];
  public completedlist: Actionplan[] = [];
  public openlistlist: Actionplan[] = [];
  public userid: number;
  public loginid: number;

  constructor(public http: HttpClient) {}

  public insertActionPlans(): any {
    return this.http.post(this.rootUrl + '/actionplans', this.actionplanData);
  }

  public getTaskDatabyid(id): any {
    return this.http
      .get(this.rootUrl + '/actionplans/byuser/' + id)
      .toPromise()
      .then(res => {
        this.tasklist = res as Actionplan[];
      });
  }

  public pendingapproval(id): any {
    return this.http
      .get(this.rootUrl + '/actionplans/pendingtask/' + id)
      .toPromise()
      .then(res => {
        this.pendinglist = res as Actionplan[];
      });
  }

  // public getPendingApprovals(): any {
  //   return this.http
  //     .get(this.rootUrl + "/actionplans")
  //     .toPromise()
  //     .then(res => {
  //       this.allpendinglist = res as Actionplan[];
  //     });
  // }

  public getPendingApprovals(): Observable<Actionplan[]> {
    return this.http.get<Actionplan[]>(this.rootUrl + '/actionplans');
  }

  public completedtask(id): any {
    return this.http
      .get(this.rootUrl + '/actionplans/completedtask/' + id)
      .toPromise()
      .then(res => {
        this.completedlist = res as Actionplan[];
      });
  }

  public opentask(id): any {
    return this.http
      .get(this.rootUrl + '/actionplans/opentask/' + id)
      .toPromise()
      .then(res => {
        this.openlistlist = res as Actionplan[];
      });
  }

  public getTaskDetailbyid(id): any {
    return this.http
      .get(this.rootUrl + '/actionplans/' + id)
      .toPromise()
      .then(res => {
        this.taskdata = res as Actionplan;
      });
  }
  public putTaskData(): any {
    return this.http.put(
      this.rootUrl + '/actionplans/' + this.taskdata.id,
      this.taskdata
    );
  }
}
