import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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
    closeResult: string;

  constructor(
      private router: Router,
      private _service: TodoService,
      private authenticationService: AuthenticationService,
      private orderPipe: OrderPipe,
      private modalService: NgbModal
  ) {
      this.sortedCollection = orderPipe.transform(this.collection, 'info.name');
      console.log(this.sortedCollection);
  }

  ngOnInit() {
      this.loading = true;
      this.errors = null;
      this._loadList();
  }

  private _loadList() {
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

    open(content: any, id: number) {
        this.modalService.open(content).result.then((result) => {
            this.loading = true;
            this._service.remove(id).then( () => {
                this._loadList();
            })
                .catch(err => {
                    this.loading = false;
                    this.errors = err.error;
                });
        }, (reason) => {
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }
}

