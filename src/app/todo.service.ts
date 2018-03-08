import { Injectable } from '@angular/core';
import { AbstractService } from './base/abstract.service';
import { Todo } from './todo';
import 'rxjs/add/operator/map';

const _API = 'http://localhost:3000/todos';

@Injectable()
export class TodoService extends AbstractService {

    public getList() {
        return this.get(_API);
    }

    public save(record: Todo) {
        return this.post(_API, JSON.stringify(record));
    }
}
