import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) {
    }
    protected static getAdditionalHeaders() {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'If-Modified-Since': 'Mon, 26 Jul 1997 05:00:00 GMT',//no cache
            'Cache-Control': 'no-cache',//no cache
            'Pragma': 'no-cache'//no cache
        });
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

    registration(username: string, password: string): Observable<boolean> {
        let options = {
            headers: AuthenticationService.getAdditionalHeaders()
        };

        return this.http.post('http://localhost:3000/users', JSON.stringify({
            login:  username,
            pas: password,
            token: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        }),options).map((response: any) => {
                return true;
            });
    }

    logout(): void {
        sessionStorage.removeItem('currentUser');
    }

}
