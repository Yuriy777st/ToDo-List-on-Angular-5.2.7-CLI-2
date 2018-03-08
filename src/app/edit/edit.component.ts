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

  constructor(private _service: TodoService,
              private route: ActivatedRoute,
              protected router: Router) {
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = parseInt(params['id'], 10);
      if (id) {
        this.greetingsText = 'Edit item';
      } else {
        this.todo = new Todo('', 'new');
        this.greetingsText = 'Create item';
      }
    });
  }

  save() {
      this._service.save(this.todo)
          .then(() => {
              this.loading = false;
              this.router.navigate(['/list']);
          })
          .catch(err => {
            console.log('error', err);
              this.loading = false;
              this.errors = err;
          });
  }
}
