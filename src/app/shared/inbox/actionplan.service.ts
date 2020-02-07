import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Actionplan } from './actionplan.model';
import { TaskComponent } from 'src/app/task/task.component';

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
  public totpendingapp: string;
  public totcomptask: string;
  public totpentask: string;
 
  
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
      .get(this.rootUrl + '/actionplans/pendingapproval/' + id)
      .toPromise()
      .then(res => {
        this.totpendingapp = res as string;
      });
  }

  public completedtask(id): any {
    return this.http
      .get(this.rootUrl + '/actionplans/completdtask/' + id)
      .toPromise()
      .then(res => {
        this.totcomptask = res as string;
      });
  }

  public pendingtask(id): any {
    return this.http
      .get(this.rootUrl + '/actionplans/pendingtask/' + id)
      .toPromise()
      .then(res => {
        this.totpentask = res as string;
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
