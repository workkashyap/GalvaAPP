import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Productions } from "./productions.model";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ProductionsService {
  public productionData: Productions;
  public productionlist: Productions[] = [];

  readonly rootUrl = environment.apiUrl;
  public id: number;

  constructor(public http: HttpClient) { }


  public productions(): Observable<Productions[]> {
    return this.http
      .get<Productions[]>(this.rootUrl + "/productions");
  }
  public productionbyid(id): any {
    return this.http
      .get(this.rootUrl + "/productions/" + id)
      .toPromise()
      .then(res => {
        this.productionData = res as Productions;
      });
  }

  public saveProduction(): any {
    return this.http
      .post(this.rootUrl + "/productions/", this.productionData)
  }
  public updateProduction(id): any {
    return this.http
      .put(this.rootUrl + "/productions/" + id, this.productionData)
  }
}
