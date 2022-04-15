import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaserepoService {

  readonly rootUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getData(year) {
    return this.http.get<any[]>(this.rootUrl + '/purchaseheaders/getpurchaserepo/' + year + '-01-01');
  }
  getDataall(year, plant) {
    return this.http.get<any[]>(this.rootUrl + '/purchaseheaders/getpurchaserepoplant/' + plant + '/all');
  }
}
