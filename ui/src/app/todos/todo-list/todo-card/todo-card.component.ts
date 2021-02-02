import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Todo } from 'src/app/core/models/todo';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
})
export class TodoCardComponent {
  @Input()
  todo: Todo;

  constructor() {}
}
