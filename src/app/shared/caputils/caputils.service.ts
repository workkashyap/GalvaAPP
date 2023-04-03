import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { Caputils } from "./caputils.model";
import { Caputils2 } from "./caputils2.model";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CaputilsService {

  public caputilsData: Caputils;
  public caputilsList: Caputils[] = [];
  public caputils2: Caputils2[] = [];
  public caputils2Data: Caputils2;
  public caputilsReason: any = [];

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

  public getallDataMonth_(year, month, plant, type) {
    //for calendar click event/
    if (month.length > 1) {
      return this.http
        .get(this.rootUrl + "/caputils/Getcaputilbydatetype/" + year + "-" + month + "-12/" + plant + '/' + type)
        .toPromise()
        .then(res => {
          this.caputilsList = res as Caputils[];

        });
    } else {
      return this.http
        .get(this.rootUrl + "/caputils/Getcaputilbydatetype/" + year + "-0" + month + "-12/" + plant + '/' + type)
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
          console.log(this.caputils2[0].percaputil);
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

  public getAvgPer_(year, month, plant, type) {
    if (month.length > 1) {
      return this.http
        .get(this.rootUrl + "/caputils/GetCapacityUtilPerval/" + year + "-" + month + "-12/" + plant + '/' + type)
        .toPromise()
        .then(res => {
          this.caputils2 = res as Caputils2[];
          console.log(this.caputils2[0].percaputil);
        });
    } else {
      return this.http
        .get(this.rootUrl + "/caputils/GetCapacityUtilPerval/" + year + "-0" + month + "-12/" + plant + '/' + type)
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

  public getCaputilsReason() {
    this.http.get(this.rootUrl + "/caputils/Getcaputilreason/reason").toPromise().
      then(res => { this.caputilsReason = res; });
  }

  public getCaputilsWithReason(): Observable<any[]> {
    return this.http.get<any[]>(this.rootUrl + "/caputilsreason");
  }

  public getCaputilsReasonFilter(date: any, plant: any, type: any): Observable<any[]> {
    return this.http.get<any[]>(this.rootUrl + "/caputilsreason/Getcaputilbydatetype/" + date + '/' + plant + '/' + type);
  }

  public savecaputilswithreason(data: any[]): Observable<any> {
    return data.reduce((previous, current) => {
      return previous.pipe(
        concatMap(() => {
          return this.http.post(this.rootUrl + "/caputilsreason", current);
        })
      );
    }, of(null));
  }
}
