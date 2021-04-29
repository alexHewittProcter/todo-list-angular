import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CREATE_TODO_CLOSE_MODAL_STATES } from 'src/app/core/models/create-todo';
import { Todo } from 'src/app/core/models/todo';
import { LoadTodosAction } from 'src/app/core/store/actions';
import { AppState } from 'src/app/core/store/reducer';
import { getTodos } from 'src/app/core/store/selectors';
import { CreateTodoComponent } from '../create-todo/create-todo.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  todos$: Observable<Todo[]>;

  constructor(
    private readonly store: Store<AppState>,
    private readonly router: Router,
    private readonly modalService: NgbModal
  ) {
    this.store.dispatch(new LoadTodosAction());
    this.todos$ = this.store.select(getTodos);
  }

  todoClick(todoId: string) {
    this.router.navigate(['todo', todoId]);
  }

  createTodo() {
    this.modalService.open(CreateTodoComponent).result.then((result) => {
      if (result === CREATE_TODO_CLOSE_MODAL_STATES.TODO_CREATED) {
        this.store.dispatch(new LoadTodosAction());
      }
    });
  }
}
