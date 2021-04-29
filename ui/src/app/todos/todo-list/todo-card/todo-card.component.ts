import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
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

  constructor() {}

  viewTodo(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.onView.emit();
  }
}
