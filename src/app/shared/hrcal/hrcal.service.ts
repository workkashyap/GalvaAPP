
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { Hrcal } from './hrcal.model';

@Injectable({
  providedIn: 'root'
})
export class HrcalService {
  readonly rootUrl = environment.apiUrl;
  public hrcalList: Hrcal[] = [];


  constructor(public http: HttpClient) { }

  public getallData(from_date, to_date, company): Observable<Hrcal[]> {
    //for calendar click event
    return this.http.get<Hrcal[]>(
      this.rootUrl + '/EMP_CONT_ATT/getallHRcalbycomprepo/' + from_date + '/' + to_date + '/' + company + '/All'
    );
  }

}
