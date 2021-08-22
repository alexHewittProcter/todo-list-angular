import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TODO_FORM_CLOSE_MODAL_STATES } from 'src/app/core/models/todo-form';
import { Todo } from 'src/app/core/models/todo';
import { IModalConfig, ModalService } from 'src/app/core/services/modal/modal.service';
import { LoadTodosAction } from 'src/app/core/store/actions';
import { AppState } from 'src/app/core/store/reducer';
import { getDoneTodos, getOpenTodos, getTodos } from 'src/app/core/store/selectors';
import { TodoFormComponent, TodoFormModalData } from '../todo-form/todo-form.component';
import { DeleteTodoAction } from 'src/app/core/store/actions/selected-todo';

@Component({
  selector: 'app-view-todos',
  templateUrl: './view-todos.component.html',
  styleUrls: ['./view-todos.component.scss'],
})
export class ViewTodosListComponent {
  breadcrums = ['todos'];
  todos$: Observable<Todo[]>;
  openTodos$: Observable<Todo[]>;
  doneTodos$: Observable<Todo[]>;

  constructor(
    private readonly store: Store<AppState>,
    private readonly router: Router,
    private readonly modalService: ModalService
  ) {
    this.store.dispatch(new LoadTodosAction());
    this.todos$ = this.store.select(getTodos);
    this.openTodos$ = this.store.select(getOpenTodos);
    this.doneTodos$ = this.store.select(getDoneTodos);
  }

  viewTodo(todoId: string) {
    this.router.navigate(['todo', todoId]);
  }

  createTodo() {
    const modalOptions: IModalConfig<TodoFormModalData> = { data: { editMode: false } };
    const modal = this.modalService.open(TodoFormComponent, modalOptions);

    modal.result.then((result) => {
      if (result === TODO_FORM_CLOSE_MODAL_STATES.TODO_CREATED) {
        this.store.dispatch(new LoadTodosAction());
      }
    });
  }

  editTodo(todo: Todo) {
    const modalOptions: IModalConfig<TodoFormModalData> = {
      data: { editMode: true, todo, editLocation: 'list' },
    };
    const modal = this.modalService.open(TodoFormComponent, modalOptions);

    modal.result.then((result) => {
      if (result === TODO_FORM_CLOSE_MODAL_STATES.TODO_UPDATED) {
        this.store.dispatch(new LoadTodosAction());
      }
    });
  }

  deleteTodo(id: string) {
    this.store.dispatch(new DeleteTodoAction(id, 'list'));
  }

  tabSelected() {
    this.store.dispatch(new LoadTodosAction());
  }
}
