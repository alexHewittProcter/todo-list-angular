import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/core/models/todo';
import { LoadSelectedTodoAction } from 'src/app/core/store/actions/selected-todo';
import { AppState } from 'src/app/core/store/reducer';
import { getTodoDetails } from 'src/app/core/store/selectors/selected-todo';

@Component({
  selector: 'app-view-todo',
  templateUrl: './view-todo.component.html',
  styleUrls: ['./view-todo.component.scss'],
})
export class ViewTodoComponent implements OnInit {
  private todoId: string;

  todoDetails$: Observable<Todo>;

  constructor(private readonly store: Store<AppState>, private readonly route: ActivatedRoute) {
    this.todoDetails$ = this.store.select(getTodoDetails);
  }

  ngOnInit() {
    this.todoId = this.route.snapshot.params.id;
    this.store.dispatch(new LoadSelectedTodoAction({ todoId: this.todoId }));
  }
}
