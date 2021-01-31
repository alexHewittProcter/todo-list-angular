import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/core/models/todo';
import { LoadTodosAction } from 'src/app/core/store/actions';
import { AppState } from 'src/app/core/store/reducer';
import { getTodos } from 'src/app/core/store/selectors';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
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
