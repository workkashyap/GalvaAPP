import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Purchasecalendar } from './purchasecalendar.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  readonly rootUrl = environment.apiUrl;
  public purchasecalendar: Purchasecalendar[] = [];
 

  constructor(public http: HttpClient) { }

  public getPurchaseCalendar(id, date): Observable<Purchasecalendar[]> {
    return this.http.get<Purchasecalendar[]>(
      this.rootUrl + '/purchasecalendars/getpurchasecalendar/' + id + '/' + date
    );
  }
  }


