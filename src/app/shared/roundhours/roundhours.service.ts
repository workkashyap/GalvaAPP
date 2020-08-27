import { Injectable } from '@angular/core';
import { Roundhours } from "./roundhours.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RoundhoursService {
  public roundhourInfo: Roundhours;

  public RoundhourData: Roundhours[] = [];
  public id: number;
  public date: string;
  public plant: number;


  constructor(public http: HttpClient) { }

  readonly rootUrl = environment.apiUrl;
  //get Round Hours Data

  public roundHoursList(): Observable<Roundhours[]> {
    return this.http.get<Roundhours[]>(
      this.rootUrl + "/roundHours"
    );
  }
  public getRoundHour(date, plant): any {
    return this.http.get(this.rootUrl + "/roundHours/purchasegrouptotal/" + date + "/" + plant).toPromise()
      .then(res => {
        const roundhourInfo = res as Roundhours;
        if (roundhourInfo && roundhourInfo != null) {
          this.roundhourInfo = roundhourInfo[0];
        }
      });
  }

  public getRoundHourById(id): any {
    return this.http
      .get(this.rootUrl + "/roundHours/purchasegrouptotal/" + id)
      .toPromise()
      .then(res => {
        this.roundhourInfo = res as Roundhours;
      });
  }

  public saveRoundHour(): any {
    return this.http
      .post(this.rootUrl + "/roundHours", this.roundhourInfo)
  }
  public updateRoundHour(date): any {
    return this.http
      .put(this.rootUrl + "/roundHours/" + date, this.roundhourInfo)
  }
  public deleteRoundHour(date): any {
    return this.http
      .delete(this.rootUrl + "/roundHours/" + date)
  }
}
