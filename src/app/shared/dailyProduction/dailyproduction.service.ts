import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Dailyproduction } from "./dailyproduction.model";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DailyproductionService {
  readonly rootUrl = environment.apiUrl;
  public dailyprodlist: Dailyproduction[] = [];
  public title: string[] = [];
  public date: string;

  public id: number;

  constructor(public http: HttpClient) {}

  // public getDailyPReject(id): any {
  //   return this.http
  //     .get(this.rootUrl + '/dailyproductions/rejectdata/' + id + '/Reject')
  //     .toPromise()
  //     .then(res => {
  //       this.dailyprodlist = res as Dailyproduction[];
  //     });
  // }
  // public getRejectcalendar(id, date): any {
  //   return this.http
  //     .get(this.rootUrl + '/dailyproductions/Getallrejdata/' + id + '/Reject/' + date)
  //     .toPromise()
  //     .then(res => {
  //       this.dailyprodlist = res as Dailyproduction[];
  //       console.log(this.rootUrl + '/dailyproductions/Getallrejdata/' + id + '/Reject/' + date);
  //     });
  // }
  public getDailyPReject(id): Observable<Dailyproduction[]> {
    return this.http.get<Dailyproduction[]>(
      this.rootUrl + "/dailyproductions/rejectdata/" + id + "/Reject"
    );
  }
  public getRejectcalendar(id, date): Observable<Dailyproduction[]> {
    return this.http.get<Dailyproduction[]>(
      this.rootUrl + "/dailyproductions/Getallrejdata/" + id + "/Reject/" + date
    );
  }
}
