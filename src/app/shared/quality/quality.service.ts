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

  public qualitybyid(id): Observable<Quality[]> {
    return this.http.get<Quality[]>(this.rootUrl + "/Qualities/" + id);
  }

  public saveQuality(): any {
    return this.http.post(this.rootUrl + "/Qualities/", this.qualityData);
  }

}
