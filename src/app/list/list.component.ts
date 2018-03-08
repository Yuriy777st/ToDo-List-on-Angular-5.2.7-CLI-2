import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';

import { AuthenticationService} from '../authentication-service.service';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    order = 'status';
    reverse = false;
    collection: any[];
    sortedCollection: any[];
    todos: Todo[] = [];
    loading = false;
    errors: any;

  constructor(
      private router: Router,
      private _service: TodoService,
      private authenticationService: AuthenticationService,
      private orderPipe: OrderPipe
  ) {
      this.sortedCollection = orderPipe.transform(this.collection, 'info.name');
      console.log(this.sortedCollection);
  }

  ngOnInit() {
      this.loading = true;
      // this._service.getList().subscribe(res => {
      //     this.loading = false;
      //     this.todos = res as Todo[];
      // }, err => {
      //     console.log(err);
      //     this.loading = false;
      // });
      this.errors = null;
      this._service.getList().then(res => {
          this.todos = res as Todo[];
          this.loading = false;
      })
          .catch(err => {
              this.loading = false;
              this.errors = err.error;
          });
  }

    logOut() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    setOrder(value: string) {
        if (this.order === value) {
            this.reverse = !this.reverse;
        }

        this.order = value;
    }
    add() {
        this.router.navigate(['/create']);
    }

    delItem(item: any) {
      console.log('Delete');
    }
}
