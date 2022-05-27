import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncentiveService {
  
  readonly rootUrl = environment.apiUrl;
  public url: string;
  constructor(private http: HttpClient) { }

  getMonthlyRej(year, month) {
    if (month.length > 1) {
      return this.http.get<any[]>(this.rootUrl + '/dailyproductions/Getallrejdatasum/P/F/' + year + '-' + month + '-01');
    } else {
      return this.http.get<any[]>(this.rootUrl + '/dailyproductions/Getallrejdatasum/P/F/' + year + '-0' + month + '-01');
    }
  }

  getTodayRej(year, month, date:string) {
    if (month.length > 1) {
      return this.http.get<any[]>(this.rootUrl + '/dailyproductions/Getallrejdatasum/P/S/' + year + '-' + month + '-' + date);  
    }
    else{
      return this.http.get<any[]>(this.rootUrl + '/dailyproductions/Getallrejdatasum/P/S/' + year + '-0' + month + '-' + date);
    }
  }

  getAgGridData(year, month) {
    if (month.length > 1) {
      if (month === '1' || month === '3' || month === '5' || month === '7' || month === '8' || month === '10' || month === '12') {
        return this.http.get<any[]>(this.rootUrl + '/Qualities/GetIncentiveReport/' + year + '-' + month + '-01/' + year + '-' + month + '-31');
      }
      else if (month === '4' || month === '6' || month === '9' || month === '11') {
        return this.http.get<any[]>(this.rootUrl + '/Qualities/GetIncentiveReport/' + year + '-' + month + '-01/' + year + '-' + month + '-30');  
      }
      else {
        return this.http.get<any[]>(this.rootUrl + '/Qualities/GetIncentiveReport/' + year + '-' + month + '-01/' + year + '-' + month + '-28');
      }
    } else {
        if (month === '1' || month === '3' || month === '5' || month === '7' || month === '8' || month === '10' || month === '12') {
          return this.http.get<any[]>(this.rootUrl + '/Qualities/GetIncentiveReport/' + year + '-0' + month + '-01/' + year + '-' + month + '-31');
        }
        else if (month === '4' || month === '6' || month === '9' || month === '11') {
          return this.http.get<any[]>(this.rootUrl + '/Qualities/GetIncentiveReport/' + year + '-0' + month + '-01/' + year + '-' + month + '-30');  
        }
        else {
          return this.http.get<any[]>(this.rootUrl + '/Qualities/GetIncentiveReport/' + year + '-0' + month + '-01/' + year + '-' + month + '-28');
        }
    }
  }

  
}
