import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Mouldconscalendar } from './mouldconscalendar.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MouldconscalendarService {
  readonly rootUrl = environment.apiUrl;
  public mconsCalendarData: Mouldconscalendar[] = [];
  public mouldprodDetail: Mouldconscalendar[] = [];
  public mconsbtnData: Mouldconscalendar[] = [];

  constructor(public http: HttpClient) { }
  //calendar data
  public getmouldconscalendar(id, date): Observable<Mouldconscalendar[]> {
    return this.http.get<Mouldconscalendar[]>(
      this.rootUrl + '/MouldCons/getmouldconscalendar/' + id + '/' + date
    );
  }
  //calendar click event
  public getmouldconscaldetail(id, date): Observable<Mouldconscalendar[]> {
    return this.http.get<Mouldconscalendar[]>(
      this.rootUrl + '/MouldCons/getmouldconscaldetail/' + id + '/' + date);
  }

  //buttondata
  public getmouldconssum(id, date): Observable<Mouldconscalendar[]> {
    return this.http.get<Mouldconscalendar[]>(
      this.rootUrl + '/MouldCons/getmouldconssum/' + id + '/' + date
    );
  }
  //button click event data
  public getmouldconssumdetail(id, date): Observable<Mouldconscalendar[]> {
    return this.http.get<Mouldconscalendar[]>(
      this.rootUrl + '/MouldCons/getmouldconssumdetail/' + id + '/' + date
    );
  }
}


