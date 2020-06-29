import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Pages } from "./pages.model";

@Injectable({
  providedIn: "root"
})
export class PagesService {
  readonly rootUrl = environment.apiUrl;
  public pagelist: Pages[] = [];
  constructor(public http: HttpClient) {}

  public getPagesDetail(userid): any {
    return this.http
      .get(this.rootUrl + "/pages/getpages/" + userid)
      .toPromise()
      .then(res => {
        this.pagelist = res as Pages[];
      });
  }
}
