import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Caputils } from "./caputils.model";
import { Caputils2 } from "./caputils2.model";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CaputilsService {

  public caputilsData: Caputils;
  public caputilsList: Caputils[] = [];
  public caputils2: Caputils2[] = [];
  public caputils2Data: Caputils2;

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

  public getallDataMonth(year, month, plant) {
    //for calendar click event/
    if (month.length > 1) {
      return this.http
      .get(this.rootUrl + "/caputils/Getcaputilbydate/" + year + "-" + month + "-12/" + plant)
      .toPromise()
      .then(res => {
        this.caputilsList = res as Caputils[];
      });
    } else {
      return this.http
      .get(this.rootUrl + "/caputils/Getcaputilbydate/" + year + "-0" + month + "-12/" + plant)
      .toPromise()
      .then(res => {
        this.caputilsList = res as Caputils[];
      });
    }
  }

  public getAvgPer(year, month, plant) {
    if (month.length > 1) {
      return this.http
      .get(this.rootUrl + "/caputils/GetCapacityUtilPerval/" + year + "-" + month + "-12/" + plant)
      .toPromise()
      .then(res => {
        this.caputils2 = res as Caputils2[];
      });
    } else {
      return this.http
      .get(this.rootUrl + "/caputils/GetCapacityUtilPerval/" + year + "-0" + month + "-12/" + plant)
      .toPromise()
      .then(res => {
        this.caputils2 = res as Caputils2[];
      });
    }
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
