import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { itemmsts } from "./itemmsts.model";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ItemmstsService {
  public itemmstsData: itemmsts;
  public itemmstsList: itemmsts[] = [];

  readonly rootUrl = environment.apiUrl;
  public id: number;

  constructor(public http: HttpClient) { }


  public getallData() {
    //for calendar click event
    return this.http
      .get(this.rootUrl + "/itemmsts")
      .toPromise()
      .then(res => {
        this.itemmstsList = res as itemmsts[];
      });
  }
  public getallDataQ() {
    //for calendar click event
    return this.http
      .get(this.rootUrl + "/itemmsts/getAllItem/item")
      .toPromise()
      .then(res => {
        this.itemmstsList = res as itemmsts[];
      });
  }
  public getDataById(id): any {
    return this.http.get<itemmsts[]>(this.rootUrl + '/itemmsts/' + id);
  }

  public insertItm(): any {
    return this.http.post(this.rootUrl + "/itemmsts", this.itemmstsData);
  }

  public updateItm(id): any {
    return this.http.put(this.rootUrl + "/itemmsts/" + id, this.itemmstsData);
  }

  public deleteItem(id): any {
    return this.http.delete(this.rootUrl + "/itemmsts/" + id);
  }
}
