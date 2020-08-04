import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Mouldproduction } from './mouldproduction.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MouldproductionService {
  readonly rootUrl = environment.apiUrl;
  public mouldProdcalendar: Mouldproduction[] = [];
  public mouldprodDetail: Mouldproduction[] = [];


  constructor(public http: HttpClient) { }

  public getMProdctionCalendar(id, date): Observable<Mouldproduction[]> {
    return this.http.get<Mouldproduction[]>(
      this.rootUrl + '/Moulded/getmouldcalendar/' + id + '/' + date
    );
  }
  public getMProdctionClickData(id, date): Observable<Mouldproduction[]> {
    return this.http.get<Mouldproduction[]>(
      this.rootUrl + '/Moulded/getmouldsumsdetail/' + id + '/' + date);
  }
  //buttondata
  public getmouldsum(id, date): Observable<Mouldproduction[]> {
    return this.http.get<Mouldproduction[]>(
      this.rootUrl + '/Moulded/getmouldsum/' + id + '/' + date
    );
  }
  public getmouldissuesum(id, date): Observable<Mouldproduction[]> {
    return this.http.get<Mouldproduction[]>(
      this.rootUrl + '/Moulded/getmouldissuesum/' + id + '/' + date
    );
  }
  public getmouldopeningsum(id): Observable<Mouldproduction[]> {
    return this.http.get<Mouldproduction[]>(
      this.rootUrl + '/moulded/getmouldopeningsum/' + id
    );
  }

  public btnclick(val, id, date): Observable<Mouldproduction[]> {
    if (val == "getmouldopeningsumdetail") {

      return this.http.get<Mouldproduction[]>(
        this.rootUrl + '/Moulded/' + val + '/' + id 
      );
    } else {

      return this.http.get<Mouldproduction[]>(
        this.rootUrl + '/Moulded/' + val + '/' + id + '/' + date
      );

    }
  }
}


