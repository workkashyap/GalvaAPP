import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Holdnbuff } from "./holdnbuff.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class HoldnbuffService {
  readonly rootUrl = environment.apiUrl;
  public holdnbufflist: Holdnbuff[] = [];

  constructor(public http: HttpClient) {}

  public getholdnbuffalldetail(
    werks,
    fromdate,
    todate
  ): Observable<Holdnbuff[]> {
    return this.http.get<Holdnbuff[]>(
      this.rootUrl +
        "/holdnbuffs/holdnbuffdetailmaindata/" +
        werks +
        "/" +
        fromdate +
        "/" +
        todate
    );
  }

  public getholdnbuffdetail(): Observable<Holdnbuff[]> {
    return this.http.get<Holdnbuff[]>(this.rootUrl + "/holdnbuffs");
  }
}
