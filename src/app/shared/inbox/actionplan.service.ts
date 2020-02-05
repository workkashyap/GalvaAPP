import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Actionplan } from './actionplan.model';

@Injectable({
  providedIn: 'root'
})
export class ActionplanService {
 public actionplanData: Actionplan;
//  headers= {
//   headers: new HttpHeaders({
//       'Content-Type': 'application/json'
//   })
// }
readonly rootUrl = environment.apiUrl;


  constructor(public http: HttpClient) { }

public insertActionPlans(): any {
   return this.http.post(this.rootUrl + '/actionplans', this.actionplanData);
}
}
