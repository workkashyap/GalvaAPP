import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Audit } from "./audit.model";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  public auditData: Audit;
  public auditList: Audit[] = [];

  readonly rootUrl = environment.apiUrl;
  public id: number;

  constructor(public http: HttpClient) { }

  public getallData() {
    //for calendar click event
    return this.http
      .get(this.rootUrl + "/auditsheets")
      .toPromise()
      .then(res => {
        this.auditList = res as Audit[];
      });
  }

  public auditbyid(id): Observable<Audit[]> {
    return this.http.get<Audit[]>(this.rootUrl + "/auditsheets/" + id);
  }

  public saveaudit(): any {
    return this.http.post(this.rootUrl + "/auditsheets/", this.auditData);
  }

  public updateaudit(id): any {
    return this.http.put(this.rootUrl + "/auditsheets/" + id, this.auditData)
  }

  public deleteaudit(id): any {
    return this.http.delete(this.rootUrl + "/auditsheets/" + id);
  }
}
