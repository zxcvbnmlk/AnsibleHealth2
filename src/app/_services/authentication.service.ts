import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
      const data: string = 'username=' + username + '&password=' + password + '&grant_type=password';
      const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
      // Todo for api auth
       // return this.http.post<any>(`${environment.apiBaseUrl}Token`, data, { headers: reqHeader })
      return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
        .pipe(map(user => {
                // login successful if there's a jwt token in the response
              // console.log('user', user);
              //   user = {
              //     firstName: "Normal",
              //     id: 2,
              //     lastName: "User",
              //     role: "User",
              //     token: "fake-jwt-token.2",
              //     username: "user",
              //
              //   }
               //if (user && user.access_token) {
                  if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            },
          )

        );
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
