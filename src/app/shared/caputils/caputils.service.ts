import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Caputils } from "./caputils.model";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CaputilsService {

  public caputilsData: Caputils;
  public caputilsList: Caputils[] = [];

  readonly rootUrl = environment.apiUrl;
  public id: number;

  constructor(public http: HttpClient) { }

  public getallData() {
    //for calendar click event
    return this.http
      .get(this.rootUrl + "/caputils")
      .toPromise()
      .then(res => {
        this.caputilsList = res as Caputils[];
      });
  }

  public caputilsbyid(id): Observable<Caputils[]> {
    return this.http.get<Caputils[]>(this.rootUrl + "/caputils/" + id);
  }

  public savecaputils(): any {
    return this.http.post(this.rootUrl + "/caputils/", this.caputilsData);
  }

  public updatecaputils(id): any {
    return this.http.put(this.rootUrl + "/caputils/" + id, this.caputilsData);
  }

  public deletecaputils(id): any {
    return this.http.delete(this.rootUrl + "/caputils/" + id);
  }
}
