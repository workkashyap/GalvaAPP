import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CustomerMaster } from "./customer-master.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class CustomerMasterService {
  public custData: CustomerMaster;
  public custList: CustomerMaster[] = [];

  readonly rootUrl = environment.apiUrl;
  public custid: number;

  constructor(public http: HttpClient) {}

  public getCustomerList(): any {
    return this.http
      .get(this.rootUrl + "/CustomerMasters")
      .toPromise()
      .then(res => {
        this.custList = res as CustomerMaster[];
      });
  }
  public getCustomersbyid(id): any {
    return this.http
      .get(this.rootUrl + "/CustomerMasters/" + id)
      .toPromise()
      .then(res => {
        this.custData = res as CustomerMaster;
      });
  }

  public postCustomer(): any {
    return this.http.post(this.rootUrl + "/CustomerMasters", this.custData);
  }

  public putCustomer(): any {
    return this.http.put(
      this.rootUrl + "/CustomerMasters/" + this.custData.id,
      this.custData
    );
  }

  public deleteCustomerbyid(id): any {
    return this.http.delete(this.rootUrl + "/CustomerMasters/" + id);
  }
}
