import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Top5rejectionService {

  readonly rootUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTop5Rejection() {
    return this.http.get<any[]>(this.rootUrl + '/Top5Rejection/gettoprejection');
  }

}
