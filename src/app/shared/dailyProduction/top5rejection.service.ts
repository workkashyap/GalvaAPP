import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Top5rejectionService {

  readonly rootUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTop5Rejection(finyear, plantcode) {
    return this.http.get<any[]>(this.rootUrl + '/Top5Rejection/gettoprejection/' + finyear + '/' + plantcode);
  }
  getTop5RejectionSum(finyear, plantcode) {
    return this.http.get<any[]>(this.rootUrl + '/Top5Rejection/gettoprejectionsum/' + finyear + '/' + plantcode);
  }
  getTop5RejectionSize(finyear, plantcode) {
    return this.http.get<any[]>(this.rootUrl + '/Top5Rejection/gettoprejectionsize/' + finyear + '/' + plantcode);
  }
  getTop5RejectionValue(finyear, plantcode) {
    return this.http.get<any[]>(this.rootUrl + '/Top5Rejection/gettoprejectionvalue/' + finyear + '/' + plantcode);
  }

}
