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


  public productions(code): Observable<Productions[]> {
    // return this.http.get<Productions[]>(this.rootUrl + "/productions");
    return this.http.get<Productions[]>(this.rootUrl + "/productions/GetProductionbycomp/" + code);
  }
  public productionbyid(id): Observable<Productions[]> {
    return this.http.get<Productions[]>(this.rootUrl + "/productions/" + id);

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
