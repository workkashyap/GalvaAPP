import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncentiveService {
  
  readonly rootUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getMonthlyRej(year, month) {
    if (month.length > 1) {
      return this.http.get<any[]>(this.rootUrl + '/dailyproductions/Getallrejdatasum/P/F/' + year + '-' + month + '-01');
    } else {
      return this.http.get<any[]>(this.rootUrl + '/dailyproductions/Getallrejdatasum/P/F/' + year + '-0' + month + '-01');
    }
  }

  getTodayRej(year, month, date) {
    if (month.length > 1 && date.length > 1) {
      return this.http.get<any[]>(this.rootUrl + '/dailyproductions/Getallrejdatasum/P/S/' + year + '-' + month + '-' + date);
    } else {
      return this.http.get<any[]>(this.rootUrl + '/dailyproductions/Getallrejdatasum/P/S/' + year + '-0' + month + '-0' + date);
    }

  }

  getAgGridData() {
    return this.http.get<any[]>('http://103.236.154.122:2222/api/dailyproductions/Getallrejdata/2022-03-01');
  }

  
}
