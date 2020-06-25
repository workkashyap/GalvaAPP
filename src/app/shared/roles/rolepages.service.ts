import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs";
import { Rolepages } from "./rolepages.model";
import { Roles } from "./roles.model";

@Injectable({
  providedIn: 'root'
})
export class RolepagesService {
  readonly rootUrl = environment.apiUrl;

  constructor(public http: HttpClient) { }
  /*-------------roles------------1*/
  public getAllRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>(
      this.rootUrl + "/roles"
    );
  }
  public insertRoles(data) {
    return this.http.post(this.rootUrl + '/roles', data);
  }
  public updateRoles(data) {
    return this.http.put(this.rootUrl + '/roles/' + data.id, data);
  }
  public deleteRoles(data) {
    return this.http.delete(this.rootUrl + '/roles/' + data.id);
  }
  /*-------------roles end------------1*/


  /*-------------pages------------2*/
  public getAllPages(): Observable<Rolepages[]> {
    return this.http.get<Rolepages[]>(
      this.rootUrl + "/pages"
    );
  }
  public insertPage(data) {
    return this.http.post(this.rootUrl + '/pages', data);
  }
  public updatePage(data) {
    return this.http.put(this.rootUrl + '/pages/' + data.id, data);
  }
  public deletePage(data) {
    return this.http.delete(this.rootUrl + '/pages/' + data.id);
  }
  /*-------------pages end------------2*/


  /*-------------role pages------------3*/
  public getAllRolePages(): Observable<Rolepages[]> {
    return this.http.get<Rolepages[]>(
      this.rootUrl + "/rolespages"
    );
  }
  public insertRolePage(data) {
    return this.http.post(this.rootUrl + '/rolespages', data);
  }
  public updateRolePage(data) {
    return this.http.put(this.rootUrl + '/rolespages/' + data.id, data);
  }
  public deleteRolePage(id) {
    return this.http.delete(this.rootUrl + '/rolespages/' + id);
  }
  /*-------------role pages end------------3*/


  /*-------------user role------------4*/
  public getAllUserRole(): Observable<Rolepages[]> {
    return this.http.get<Rolepages[]>(
      this.rootUrl + "/pages/getuserroles"
    );
  }
  public insertUserRole(data) {
    return this.http.post(this.rootUrl + '/userroles', data);
  }
  public updateUserRole(data) {
    return this.http.put(this.rootUrl + '/userroles/' + data.id, data);
  }
  public deleteUserRole(id) {
    return this.http.delete(this.rootUrl + '/userroles/' + id);
  }
  /*-------------user role end------------4*/




  public getParentPages() {
    return this.http.get(this.rootUrl + '/pages/getparentpages/');
  }
  public saveParentPages(data) {
    return this.http.post(this.rootUrl + '/pages/getparentpages', data);
  }

  public getPagesByParentID(id) {
    return this.http.get(this.rootUrl + '/pages/getpagesbyparent/' + id);
  }

  //Role To Pages
  public getpagesbyrole(id) {
    return this.http.get(this.rootUrl + '/pages/getpagesbyrole/' + id);
  }

  //Role To User
  public getpagesbyuser(id) {
    return this.http.get(this.rootUrl + '/pages/getpagesbyuser/' + id);
  }

  public getAllusers(): Observable<Rolepages[]> {
    return this.http.get<Rolepages[]>(
      this.rootUrl + "/users"
    );
  }
}
