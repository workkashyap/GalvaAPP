
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { Attendancesummary } from './attendancesummary.model';

@Injectable({
  providedIn: 'root'
})
export class AttendancesummaryService {
  readonly rootUrl = environment.apiUrl;
  public attendancesummary: Attendancesummary[] = [];

  constructor(public http: HttpClient) { }

  public getallHRwdept(month): Observable<Attendancesummary[]> {
    return this.http.get<Attendancesummary[]>(
      this.rootUrl + '/EMP_CONT_ATT/getallHRwdept/' + month
    );
  }

  public getallHRsumcont(month): Observable<Attendancesummary[]> {
    return this.http.get<Attendancesummary[]>(
      this.rootUrl + '/EMP_CONT_ATT/getallHRsumcont/' + month
    );
  }

}
