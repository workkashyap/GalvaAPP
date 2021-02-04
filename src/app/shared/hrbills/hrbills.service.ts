import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { hrbills } from "./hrbills.model";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HrbillsService {
  public hrbillsData: hrbills;
  public hrbillsList: hrbills[] = [];
  public hrbillsSumData: hrbills;

  readonly rootUrl = environment.apiUrl;
  public id: number;

  constructor(public http: HttpClient) { }


  public getallData() {
    //for calendar click event
    return this.http
      .get(this.rootUrl + "/hrbills")
      .toPromise()
      .then(res => {
        this.hrbillsList = res as hrbills[];
      });
  }

  public getallDatahrbill(monthyear, name) {
    //for calendar click event
    
    return this.http
      .get(this.rootUrl + '/hrbills/loadhrbill/' + monthyear + '/' + name);
     
  }
  public getDataById(id): any {
    return this.http.get<hrbills[]>(this.rootUrl + '/hrbills/' + id);
  }

  public insertbill(): any {
    return this.http.post(this.rootUrl + "/hrbills", this.hrbillsSumData);
  }

  public updatebill(id): any {
    return this.http.put(this.rootUrl + "/hrbills/" + id, this.hrbillsData);
  }

  public deletebill(id): any {
    return this.http.delete(this.rootUrl + "/hrbills/" + id);
  }

  
}  
