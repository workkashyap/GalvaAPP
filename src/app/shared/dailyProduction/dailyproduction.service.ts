import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Dailyproduction } from "./dailyproduction.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class DailyproductionService {
  readonly rootUrl = environment.apiUrl;
  public dailyprodlist: Dailyproduction[] = [];

  public id: number;
  public vType: "REJECT";
  public ptype: "PLATING";

  constructor(public http: HttpClient) {}

  public getDailyPReject(id): any {
    return this.http
      .get(this.rootUrl + "/dailyproductions/rejectdata/" + id + "/Reject")
      .toPromise()
      .then(res => {
        this.dailyprodlist = res as Dailyproduction[];
      });
  }
}
