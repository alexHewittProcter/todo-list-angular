import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Todo } from 'src/app/core/models/todo';
import { TODO_FORM_CLOSE_MODAL_STATES } from 'src/app/core/models/todo-form';
import { IModalConfig, ModalService } from 'src/app/core/services/modal/modal.service';
import {
  DeleteTodoAction,
  LoadSelectedTodoAction,
  UpdateTodoStatusAction,
} from 'src/app/core/store/actions/selected-todo';
import { AppState } from 'src/app/core/store/reducer';
import { getTodoDetails } from 'src/app/core/store/selectors/selected-todo';
import { TodoFormComponent, TodoFormModalData } from '../todo-form/todo-form.component';

@Component({
  selector: 'app-view-todo',
  templateUrl: './view-todo.component.html',
  styleUrls: ['./view-todo.component.scss'],
})
export class ViewTodoComponent implements OnDestroy {
  breadcrums = ['todos', 'todo'];
  private todoId: string;
  private todo: Todo;

  private destroy$: Subject<boolean> = new Subject();

  todoDetails$: Observable<Todo>;

  constructor(
    private readonly store: Store<AppState>,
    private readonly route: ActivatedRoute,
    private readonly modalService: ModalService,
    private readonly router: Router
  ) {
    this.todoDetails$ = this.store.select(getTodoDetails);
    this.todoDetails$.pipe(takeUntil(this.destroy$)).subscribe((todo) => {
      this.todo = todo;
    });
    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter((e): e is NavigationEnd => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.todoId = this.route.snapshot.params.id;
        this.loadTodo();
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  loadTodo() {
    this.store.dispatch(new LoadSelectedTodoAction({ todoId: this.todoId }));
  }

  editTodo() {
    const modalOptions: IModalConfig<TodoFormModalData> = {
      data: { editMode: true, todo: this.todo, editLocation: 'view' },
    };
    const modal = this.modalService.open(TodoFormComponent, modalOptions);

    modal.result.then((result) => {
      if (result === TODO_FORM_CLOSE_MODAL_STATES.TODO_UPDATED) {
        this.loadTodo();
      }
    });
  }

  deleteTodo() {
    this.store.dispatch(new DeleteTodoAction(this.todo.id, 'view'));
  }

  updateTodoStatus(status: 'open' | 'done'): void {
    this.store.dispatch(new UpdateTodoStatusAction(this.todo.id, status));
  }
}
