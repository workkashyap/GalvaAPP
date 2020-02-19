import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import 'rxjs/add/operator/map'; 
import { Observable } from 'rxjs';
import { Filesettings } from './filesettings.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FileSettingService {
filesettingsData: Filesettings;
list: Filesettings[];
filesettings: [];
deleteOption: boolean;

readonly rootUrl = environment.apiUrl;

constructor(public http: HttpClient) { }

postExpence() {
  return  this.http.post(this.rootUrl + '/filesettings', this.filesettingsData);
 }

 putExpence() {
   return  this.http.put(this.rootUrl + '/filesettings/' + this.filesettingsData.id, this.filesettingsData);
  }

  deleteExpence(id) {
   return  this.http.delete(this.rootUrl + '/filesettings/' + id);
  }

public refreshList(): any {
  return this.http.get(this.rootUrl + '/filesettings')
   .toPromise()
   .then(res => this.list = res as Filesettings[]);

 }

 public getfilesettings(id): Observable<Filesettings[]> {
  return this.http.get<Filesettings[]>(this.rootUrl + '/filesettings' + id);
  

 }

 }
