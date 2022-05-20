import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Rejectionreview } from "./rejectionreview.model";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RejectionreviewService {

  public rejectionreviewData: Rejectionreview;
  public rejectionreviewList: Rejectionreview[] = [];

  readonly rootUrl = environment.apiUrl;
  public id: number;

  constructor(public http: HttpClient) { }

  public getallData() {
    //for calendar click event
    return this.http
      .get(this.rootUrl + "/rejectionreview")
      .toPromise()
      .then(res => {
        this.rejectionreviewList = res as Rejectionreview[];
      });
  }

  public rejbyid(id): Observable<Rejectionreview[]> {
    return this.http.get<Rejectionreview[]>(this.rootUrl + "/rejectionreview/" + id);
  }

  public saverej(): any {
    return this.http.post(this.rootUrl + "/rejectionreview/", this.rejectionreviewData);
  }

  public updaterej(id): any {
    return this.http.put(this.rootUrl + "/rejectionreview/" + id, this.rejectionreviewData)
  }

  public deleterej(id): any {
    return this.http.delete(this.rootUrl + "/rejectionreview/" + id);
  }
}
