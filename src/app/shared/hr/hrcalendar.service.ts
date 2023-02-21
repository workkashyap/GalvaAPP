
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { Hrcalendar } from './hrcalendar.model';

@Injectable({
  providedIn: 'root'
})
export class HrcalendarService {
  readonly rootUrl = environment.apiUrl;
  public hrcalendar: Hrcalendar[] = [];
  hrcalendarEventData: Hrcalendar[] = [];
  public hrcalendarlist: Hrcalendar[] = [];


  constructor(public http: HttpClient) { }


  public getallBoxClickData(month, company, selectedcode): Observable<Hrcalendar[]> {
    //for calendar click event
    return this.http.get<Hrcalendar[]>(
      this.rootUrl + '/EMP_CONT_ATT/getallHRcalbycomp/' + month + '/' + company + '/' + selectedcode
    );
  }

  public getallHRempcont(month, selectedcode): Observable<Hrcalendar[]> {
    //all manpower
    return this.http.get<Hrcalendar[]>(
      this.rootUrl + '/EMP_CONT_ATT/getallHRempcont/' + month + '/' + selectedcode
    );

  }

  public getallHRwempcont(month, selectedcode): Observable<Hrcalendar[]> {
    //Manpower working:
    return this.http.get<Hrcalendar[]>(
      this.rootUrl + '/EMP_CONT_ATT/getallHRwempcont/' + month + '/' + selectedcode
    );
  }

  public getallHRsumcont(month, selectedcode): Observable<Hrcalendar[]> {
    return this.http.get<Hrcalendar[]>(
      this.rootUrl + '/EMP_CONT_ATT/getallHRsumcont/' + month + '/' + selectedcode
    );
  }

  /*calendar section */
  public getallHRcalC(month, selectedcode, date): Observable<Hrcalendar[]> {
    //for calendar
    return this.http.get<Hrcalendar[]>(
      this.rootUrl + '/EMP_CONT_ATT/getallHRcalc/' + month + '/' + selectedcode + '/' + date
    );
  }
  public getallHRcalDetail(month, date, selectedcode): Observable<Hrcalendar[]> {
    //for calendar click event
    return this.http.get<Hrcalendar[]>(
      this.rootUrl + '/EMP_CONT_ATT/getallHRcal/' + month + '/' + date + '/' + selectedcode
    );
  }
}
