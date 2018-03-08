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

    public edit(record: Todo) {
        return this.put(_API + '/' + record.id, JSON.stringify(record));
    }

    public getById(id: number) {
        return this.get(_API + '/' + id);
    }
    public remove(id: number) {
        return this.delete(_API + '/' + id);
    }
}
