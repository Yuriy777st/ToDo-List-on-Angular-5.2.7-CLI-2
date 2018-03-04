import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) {
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.get('http://localhost:3000/users')
            .map((response: any) => {
                let users = response;
                let isAuthorized = false;
                users.forEach(user => {
                    if (username === user.login && password === user.pas) {
                        sessionStorage.setItem('currentUser', JSON.stringify({ username: username, token: user.token }));
                        isAuthorized = true;
                    }
                });
                return isAuthorized;
            });
    }

    logout(): void {
        sessionStorage.removeItem('currentUser');
    }

}
