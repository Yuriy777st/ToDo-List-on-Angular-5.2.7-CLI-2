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
  greetingsText: string = '';
  constructor(private _service: TodoService,
              private route: ActivatedRoute,
              protected router: Router) {
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var id = parseInt(params['id'], 10);
      if (id) {
        this.greetingsText = 'Edit item';
      } else {
        this.todo = Todo(0, '', 'new');
        console.log('create**', this.todo);
        this._service.getList().subscribe(res => {
          this.loading = false;
          this.todo.id = res.length;
        }, err => {
          console.log(err);
          this.loading = false;
        });
        this.greetingsText = 'Create item';
      }
    });
  }

}
