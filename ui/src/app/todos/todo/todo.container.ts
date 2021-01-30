import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/core/models/todo';
import { LoadTodosAction } from 'src/app/core/store/actions';
import { AppState } from 'src/app/core/store/reducer';
import { getTodos } from 'src/app/core/store/selectors';

@Component({
  selector: 'app-todo-container',
  templateUrl: './todo.container.html',
  styleUrls: ['./todo.container.scss'],
})
export class TodoContainer {
  todos$: Observable<Todo[]>;
  constructor(private readonly store: Store<AppState>) {
    this.store.dispatch(new LoadTodosAction());
    this.todos$ = this.store.select(getTodos);
    this.todos$.subscribe((v) => console.log(v));
  }

  test(event) {
    console.log('Hello');
  }
}
