import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dailyproduction } from './dailyproduction.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Itemwiserej } from './itemwiserej.model';
import { TopDefect } from './topdefect.model';

@Injectable({
  providedIn: 'root'
})
export class DailyproductionService {
  readonly rootUrl = environment.apiUrl;
  public dailyprodlist: Dailyproduction[] = [];
  public itemwiserejlist: Itemwiserej[] = [];
  public itemtopdefectlist: TopDefect[] = [];
  public title: string[] = [];
  public date: string;
  public plantcode: string;

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
  public getDailyPReject(id, startdate, endate): Observable<Dailyproduction[]> {
      console.log( this.rootUrl + '/dailyproductions/rejectdata/' + id + '/Reject/' + startdate + '/' + endate);
      return this.http.get<Dailyproduction[]>(
      this.rootUrl + '/dailyproductions/rejectdata/' + id + '/Reject/' + startdate + '/' + endate
    );
  }
  public getDailyPRejectmode(id, mode): Observable<Dailyproduction[]> {
    return this.http.get<Dailyproduction[]>(
    this.rootUrl + '/dailyproductions/rejectdata/' + id + '/Reject/' + mode
  );
}
  public getRejectcalendar(id, date): Observable<Dailyproduction[]> {
    return this.http.get<Dailyproduction[]>(
      this.rootUrl + '/dailyproductions/Getallrejdata/' + id + '/Reject/' + date
    );
  }

  public getRejectdetail(plantcode, type, fromdate, todate): Observable<Itemwiserej[]> {
    return this.http.get<Itemwiserej[]>(
      this.rootUrl + '/itemwiserejs/rejectdetaildata/' + plantcode + '/' + type + '/' + fromdate + '/' + todate
    );
  }
  public getRejectdefectdetail(plantcode, type, fromdate, todate, code): Observable<TopDefect[]> {
    return this.http.get<TopDefect[]>(
      this.rootUrl + '/TopDefectsCodeValue/getalldefects/' + plantcode + '/' + type + '/' + fromdate + '/' + todate + '/' + code
    );
  }
}
