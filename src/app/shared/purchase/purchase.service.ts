import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Purchasecalendar } from './purchasecalendar.model';
import { Observable } from 'rxjs';
import { Purchasesummary } from './purchasesummary.model';
import { Purchasedetail } from './purchasedetail.model';


@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  readonly rootUrl = environment.apiUrl;
  public purchasecalendar: Purchasecalendar[] = [];
  public purchasedetail: Purchasedetail[] = [];


  constructor(public http: HttpClient) { }

  public getPurchaseCalendar(id, date): Observable<Purchasecalendar[]> {
    return this.http.get<Purchasecalendar[]>(
      this.rootUrl + '/purchasecalendars/getpurchasecalendar/' + id + '/' + date
    );
  }
  
  /*purchase calendar */
  /*public getPurchaseCalendar(id, date): Observable<Dailyproduction[]> {
    return this.http.get<Dailyproduction[]>(
      this.rootUrl + '/purchasecalendars/getpurchasecalendar/' + id + '/' + date
    );
  }*/
  
  public getPurchaseCaldetail(plantcode, date): Observable<Purchasedetail[]> {
    return this.http.get<Purchasedetail[]>(
      this.rootUrl +
      '/purchasecalendars/purchasegroupdate/' +
      plantcode +
      '/' +
      date
    );
  }
  //for button value 
  public getPurchaseBtnInfo(url, plantcode, date): Observable<Purchasesummary[]> {
    return this.http.get<Purchasesummary[]>(
      this.rootUrl + '/purchasecalendars/' + url + '/' + plantcode + '/' + date
    );
  }
  
  //button click event
  public getPurchaseBtnClickEvent(url, plantcode, date): Observable<Purchasedetail[]> {
    return this.http.get<Purchasedetail[]>(
      this.rootUrl + '/purchasecalendars/' + url + '/' + plantcode + '/' + date
    );
  }
  /*end purchase calendar */
}


