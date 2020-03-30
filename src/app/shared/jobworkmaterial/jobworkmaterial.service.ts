import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { jobworkmaterial } from "./jobworkmaterial.model";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class JobworkmaterialService {
  public jobworkMData: jobworkmaterial;
  public jobworkMlist: jobworkmaterial[] = [];

  readonly rootUrl = environment.apiUrl;
  public jobid: number;

  constructor(public http: HttpClient) {}

  // public Getjobworkmaterial(): Observable<jobworkmaterial[]> {
  //   return this.http.get<jobworkmaterial[]>(this.rootUrl + "/jobworkmaterials");
  // }

  public Getjobworkmaterial(): any {
    return this.http
      .get(this.rootUrl + "/jobworkmaterials")
      .toPromise()
      .then(res => {
        this.jobworkMlist = res as jobworkmaterial[];
      });
  }
  public getjobworkmaterialbyid(id): any {
    return this.http
      .get(this.rootUrl + "/jobworkmaterials/" + id)
      .toPromise()
      .then(res => {
        this.jobworkMData = res as jobworkmaterial;
      });
  }

  public insertJobWorkMaterial(): any {
    return this.http.post(
      this.rootUrl + "/jobWorkMaterials",
      this.jobworkMData
    );
  }

  public putJobWorkData(): any {
    return this.http.put(
      this.rootUrl + "/jobWorkMaterials/" + this.jobworkMData.id,
      this.jobworkMData
    );
  }

  public deletejobworkbyid(id): any {
    return this.http.delete(this.rootUrl + "/jobworkmaterials/" + id);
  }
}
