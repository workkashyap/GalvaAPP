
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { Ppc } from './ppc.model';

@Injectable({
  providedIn: 'root'
})
export class PpcService {
  readonly rootUrl = environment.apiUrl;
  public ppc: Ppc[] = [];

  constructor(public http: HttpClient) { }
  public allData( date): Observable<Ppc[]> {
    return this.http.get<Ppc[]>(
      this.rootUrl + '/PPCimports/getppcImport/'+ date
    );
  }
  public getCompliancePer(company, date): Observable<Ppc[]> {
    return this.http.get<Ppc[]>(
      this.rootUrl + '/PPCimports/ppcavgmonth/' + company + '/' + date
    );
  }


  public ppctotalrec(company, date): Observable<Ppc[]> {
    return this.http.get<Ppc[]>(
      this.rootUrl + '/PPCimports/ppctotalrec/' + company + '/' + date
    );
  }

  public getColumn1(company, date): Observable<Ppc[]> {
    return this.http.get<Ppc[]>(
      this.rootUrl + '/PPCimports/ppc1TO10below1/' + company + '/' + date
    );
  }
  public getColumn2(company, date): Observable<Ppc[]> {
    return this.http.get<Ppc[]>(
      this.rootUrl + '/PPCimports/ppc1TO10below2/' + company + '/' + date
    );
  }
  public getColumn3(company, date): Observable<Ppc[]> {
    return this.http.get<Ppc[]>(
      this.rootUrl + '/PPCimports/ppc1TO10below3/' + company + '/' + date
    );
  }




  public getColumn4(company, date): Observable<Ppc[]> {
    return this.http.get<Ppc[]>(
      this.rootUrl + '/PPCimports/ppc1TO10avg1/' + company + '/' + date
    );
  }
  public getColumn5(company, date): Observable<Ppc[]> {
    return this.http.get<Ppc[]>(
      this.rootUrl + '/PPCimports/ppc1TO10avg2/' + company + '/' + date
    );
  }
  public getColumn6(company, date): Observable<Ppc[]> {
    return this.http.get<Ppc[]>(
      this.rootUrl + '/PPCimports/ppc1TO10avg3/' + company + '/' + date
    );
  }



  public getColumn7(company, date): Observable<Ppc[]> {
    return this.http.get<Ppc[]>(
      this.rootUrl + '/PPCimports/ppc1TO10above1/' + company + '/' + date
    );
  }
  public getColumn8(company, date): Observable<Ppc[]> {
    return this.http.get<Ppc[]>(
      this.rootUrl + '/PPCimports/ppc1TO10above2/' + company + '/' + date
    );
  }
  public getColumn9(company, date): Observable<Ppc[]> {
    return this.http.get<Ppc[]>(
      this.rootUrl + '/PPCimports/ppc1TO10above3/' + company + '/' + date
    );
  }


  public getPPCCalsummary(date, galvaGroupid): Observable<Ppc[]> {
    return this.http.get<Ppc[]>(
      this.rootUrl + '/PPCimports/' + galvaGroupid + '/' + date
    );
  }

  public ppcimportclones(): Observable<Ppc[]> {
    return this.http.get<Ppc[]>(
      this.rootUrl + '/ppcimportclones'
    );
  }
  public ppcdelete(data) {
    return this.http.delete(this.rootUrl + '/ppcimportclones/' + data.id);
  }
  updatePpcimportclones(row) {
    return this.http.put(this.rootUrl + '/ppcimportclones/' + row.id, row);
  }

  //ppcsummaryclone
  public ppcsummaryclone(date) {
    return this.http.get<Ppc[]>(
      this.rootUrl + '/ppCimports/ppcsummaryclone/'+date
    );
  }
}
