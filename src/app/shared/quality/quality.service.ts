import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Quality } from "./quality.model";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class QualityService {

  public qualityData: Quality;
  public qualityList: Quality[] = [];

  readonly rootUrl = environment.apiUrl;
  public id: number;

  constructor(public http: HttpClient) { }

  public getallData() {
    //for calendar click event
    return this.http
      .get(this.rootUrl + "/Qualities")
      .toPromise()
      .then(res => {
        this.qualityList = res as Quality[];
      });
  }

  public qualitybyid(id): Observable<Quality[]> {
    return this.http.get<Quality[]>(this.rootUrl + "/Qualities/" + id);
  }

  public saveQuality(): any {
    return this.http.post(this.rootUrl + "/Qualities/", this.qualityData);
  }

  public updatequality(id): any {
    return this.http.put(this.rootUrl + "/Qualities/" + id, this.qualityData)
  }

  public deletequality(id): any {
    return this.http.delete(this.rootUrl + "/Qualities/" + id);
  }

  public getSummaryAllReport(plantcode , fnyear) {
    return this.http.get<any[]>(this.rootUrl + "/qualities/getSummaryallReport/" + plantcode + "/" + fnyear);
  }

  public getDefectWiseReport(plantcode, zcrm, fnyear) {
    return this.http.get<any[]>(this.rootUrl + "/qualities/getdefectwisereport/" + plantcode + "/" + zcrm + "/" + fnyear);
  }

  public getDefectWiseReportSum(plantcode, zcrm, fnyear) {
    return this.http.get<any[]>(this.rootUrl + "/qualities/getdefectwisereportsum/" + plantcode + "/" + zcrm + "/" + fnyear);
  }
}
