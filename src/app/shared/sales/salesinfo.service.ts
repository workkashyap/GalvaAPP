import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Salesinfo } from './salesinfo.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesinfoService {
  readonly rootUrl = environment.apiUrl;
  public salesdetail: Salesinfo[] = [];
  public salesinfolist: Salesinfo[] = [];

  constructor(public http: HttpClient) {

  }

  public netSaleSUM(plantcode, startdate, endate): Observable<Salesinfo[]> {
    return this.http.get<Salesinfo[]>(
      this.rootUrl + '/Salescalendars/Net_Sale_SUM/' + plantcode + '/' + startdate + '/' + endate
    );
  }

  public netSaleSumDetail(id, plantcode, startdate, endate): Observable<Salesinfo[]> {
    return this.http.get<Salesinfo[]>(
      this.rootUrl + '/Salescalendars/Net_Sale_SUM_Detail/' + plantcode + '/' + startdate + '/' + endate + '/' + id
    );
  }

 
  
  public netSaleSumItem(plantcode, startdate, endate): Observable<Salesinfo[]> {
    return this.http.get<Salesinfo[]>(
      this.rootUrl + '/Salescalendars/Net_Sale_SUM_ITEM/' + plantcode + '/' + startdate + '/' + endate
    );
  } 

  public netSaleSumItemDetail(id, plantcode, startdate, endate): Observable<Salesinfo[]> {
    return this.http.get<Salesinfo[]>(
      this.rootUrl + '/Salescalendars/Net_Sale_SUM_ITEM_Detail/' + plantcode + '/' + startdate + '/' + endate + '/' + id
    );
  }
}
