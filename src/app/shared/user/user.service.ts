import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../login/User.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
public userlist: User[];
readonly rootUrl = environment.apiUrl;

constructor(public http: HttpClient) { }

public getuserbyid(id): any {
  return this.http.get(this.rootUrl + '/users/byuser/' + id)
  .toPromise()
  .then(res => {
    this.userlist = res as User[];
    }
    );


}


}
