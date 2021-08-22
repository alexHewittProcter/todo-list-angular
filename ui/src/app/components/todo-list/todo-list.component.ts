import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from 'src/app/core/models/todo';

@Component({ selector: 'app-todo-list', templateUrl: './todo-list.component.html' })
export class TodoListComponent {
  @Input()
  todos: Todo[];

  @Output()
  onView: EventEmitter<number> = new EventEmitter();

  @Output()
  onEdit: EventEmitter<Todo> = new EventEmitter();

  @Output()
  onDelete: EventEmitter<number> = new EventEmitter();
}
