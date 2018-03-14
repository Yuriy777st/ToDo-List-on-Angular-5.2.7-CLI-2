import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { TodoService } from '../todo.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  todo: Todo;
  loading = false;
  greetingsText = '';
  errors: any;
  id: number;

  constructor(private _service: TodoService,
              private route: ActivatedRoute,
              protected router: Router) {
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = parseInt(params['id'], 10);
      if (this.id) {
        this.loading = true;
        this.greetingsText = 'Edit item';
          this._service.getById(this.id)
              .then((res) => {
                  this.todo = res as Todo;
                  this.loading = false;
              })
              .catch(err => {
                  this.errors = err;
                  this.loading = false;
              });
      } else {
        this.todo = new Todo('', 'new');
        this.greetingsText = 'Create item';
      }
    });
  }

  save() {
    if (this.id) {
        this._service.edit(this.todo)
            .then(() => {
                this.loading = false;
                this.router.navigate(['/list']);
            })
            .catch(err => {
                this.errors = err;
                this.loading = false;
            });
    } else {
        this._service.save(this.todo)
            .then(() => {
                this.loading = false;
                this.router.navigate(['/list']);
            })
            .catch(err => {
                console.log('error', err);
                this.errors = err;
                this.loading = false;
            });
    }
  }
}
