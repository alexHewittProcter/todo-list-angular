import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from 'src/app/core/models/todo';

@Component({
  selector: 'app-view-todo',
  templateUrl: './view-todo.component.html',
  styleUrls: ['./view-todo.component.scss'],
})
export class ViewTodoComponent implements OnInit {
  private todoId: string;

  basicTodo: Todo = { title: 'Test todo', description: 'This is a todo', status: 'open' };

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit() {
    this.todoId = this.route.snapshot.params.id;
    // this.route.queryParams.subscribe((params) => {
    //   this.todoId = params['id'];
    //   console.log(this.todoId);
    // });
  }
}
