import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/core/models/todo';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
})
export class TodoCardComponent {
  @Input()
  todo: Todo;

  @Output()
  onView: EventEmitter<void> = new EventEmitter();
  @Output()
  onEdit: EventEmitter<void> = new EventEmitter();
  @Output()
  onDelete: EventEmitter<void> = new EventEmitter();

  constructor() {}

  private buttonClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  viewTodo(event: Event) {
    this.buttonClick(event);
    this.onView.emit();
  }

  editTodo(event: Event) {
    this.buttonClick(event);
    this.onEdit.emit();
  }

  deleteTodo(event: Event) {
    this.buttonClick(event);
    this.onDelete.emit();
  }
}
