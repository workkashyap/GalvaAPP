import { Injectable } from '@angular/core';
import { Home } from "./home.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(public http: HttpClient) { }
  readonly rootUrl = environment.apiUrl;

  //create
  public getData(plantcode, startdate, enddate): Observable<Home[]> {
    return this.http.get<Home[]>(
      this.rootUrl + "/YearlyReportDisplay/getyearlydata/" + plantcode + '/' + startdate + '/' + enddate
    );
  }
}
