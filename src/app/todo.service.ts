import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const _API = 'http://localhost:3000';

@Injectable()
export class TodoService {

  constructor(private http: HttpClient) { }

    getList(): Observable<any[]>{
        return this.http
            .get(_API + '/todos')
            .map((resp) => {
                let todos: any = resp;
                return todos;
            });
        //.catch((error: any) => Observable.throw(error.json()));
    }
}
