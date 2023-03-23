import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesrepoService {

  readonly rootUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAgGridData(year) {
    return this.http.get<any[]>(this.rootUrl + '/sales/getsalesrepo/' + year + '-01-01');
  }
  getAgGridDataall(year) {
    return this.http.get<any[]>(this.rootUrl + '/sales/getsalesrepo/all');
  }
  getAgGridDataForFnYear(fnyear) {
    return this.http.get<any[]>(this.rootUrl + '/sales/getsalesrepofin/' + fnyear);
  }

  getSalesRepoFinWithMould(fnyear) {
    return this.http.get<any[]>(this.rootUrl + '/sales/getsalesrepofinwithmould/' + fnyear);
  }
}
