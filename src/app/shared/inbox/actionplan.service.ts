import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Actionplan } from "./actionplan.model";
import { TaskComponent } from "src/app/task/task.component";

@Injectable({
  providedIn: "root"
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

  constructor(public http: HttpClient) {}

  public insertActionPlans(): any {
    return this.http.post(this.rootUrl + "/actionplans", this.actionplanData);
  }

  public getTaskDatabyid(id): any {
    return this.http
      .get(this.rootUrl + "/actionplans/byuser/" + id)
      .toPromise()
      .then(res => {
        this.tasklist = res as Actionplan[];
      });
  }
  public getTaskDetailbyid(id): any {
    return this.http
      .get(this.rootUrl + "/actionplans/" + id)
      .toPromise()
      .then(res => {
        this.taskdata = res as Actionplan;
      });
  }
}
