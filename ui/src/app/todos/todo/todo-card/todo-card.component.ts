import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Todo } from 'src/app/core/models/todo';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
})
export class TodoCardComponent implements OnInit, OnChanges {
  @Input()
  todo: Todo;

  constructor() {}

  ngOnInit() {
    console.log(this.todo);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
}
