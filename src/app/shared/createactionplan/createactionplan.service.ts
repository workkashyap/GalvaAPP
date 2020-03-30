import { Injectable } from '@angular/core';
import { Createactionplan } from "./createactionplan.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class CreateactionplanService {
  public CreateactionplanData: Createactionplan;

  constructor(public http: HttpClient) { }

  readonly rootUrl = environment.apiUrl;
  //get Action PLan Report
  public getActionPlanReport(monthname, plantcode): Observable<Createactionplan[]> {
    console.log("Test")
    return this.http.get<Createactionplan[]>(
      this.rootUrl + "/newactionplans/Getnewactionplanreport/" + monthname + '/' + plantcode
    );
  }
  //create action plan
  public getActionPlan(monthname, plantcode, currentUser): Observable<Createactionplan[]> {
    return this.http.get<Createactionplan[]>(
      this.rootUrl + "/newactionplans/Getnewactionplan/" + monthname + '/' + plantcode + '/' + currentUser
    );
  }
  public insertCreateactionplan(data) {
    return this.http.post(this.rootUrl + '/newactionplans', data);
  }
  public updateCreateactionplan(data) {
    return this.http.put(this.rootUrl + '/newactionplans/' + data.id, data);
  }
  public deleteCreateactionplan(data) {
    return this.http.delete(this.rootUrl + '/newactionplans/' + data.id);
  }
}
