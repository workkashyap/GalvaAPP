import { User } from './User.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
public userData: User;
list: User[];
private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

readonly rootUrl = environment.apiUrl;

constructor(public http: HttpClient) { 
  this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  this.currentUser = this.currentUserSubject.asObservable();
}

public get currentUserValue(): User {
  return this.currentUserSubject.value;
}

public login(): any {
 // return this.http.post(this.rootUrl + '/token', this.userData);
 return this.http.post<any>(this.rootUrl + '/token', this.userData)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.list = user;
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
   }
   logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}
 }
