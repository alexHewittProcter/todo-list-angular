import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiService } from '../../services/api/api.service';
import { LoadTodosAction } from '../actions';
import {
  DeleteTodoAction,
  DeleteTodoFailureAction,
  DeleteTodoSuccessAction,
  DELETE_TODO,
  LoadSelectedTodoAction,
  LoadSelectedTodoFailureAction,
  LoadSelectedTodoSuccessAction,
  LOAD_SELECTED_TODO,
  UpdateTodoAction,
  UpdateTodoFailureAction,
  UpdateTodoStatusAction,
  UpdateTodoStatusFailureAction,
  UpdateTodoStatusSuccessAction,
  UpdateTodoSuccessAction,
  UPDATE_TODO,
  UPDATE_TODO_STATUS,
} from '../actions/selected-todo';

@Injectable()
export class SelectedTodoEffects {
  @Effect()
  public getTodo$: Observable<Action> = this.actions$.pipe(
    ofType(LOAD_SELECTED_TODO),
    switchMap((action: LoadSelectedTodoAction) => {
      return this.apiService.getTodo(action.payload.todoId).pipe(
        map((v) => {
          return new LoadSelectedTodoSuccessAction(v);
        }),
        catchError(() => of(new LoadSelectedTodoFailureAction()))
      );
    })
  );

  @Effect()
  public updateTodo$: Observable<Action> = this.actions$.pipe(
    ofType(UPDATE_TODO),
    switchMap((action: UpdateTodoAction) => {
      const { id, todo, editLocation } = action;
      return this.apiService.updateTodo(id, todo).pipe(
        switchMap((v) => {
          if (editLocation === 'list') {
            return [new UpdateTodoSuccessAction(), new LoadTodosAction()];
          }
          return [new UpdateTodoSuccessAction(), new LoadSelectedTodoAction({ todoId: id })];
        }),
        catchError(() => of(new UpdateTodoFailureAction()))
      );
    })
  );

  @Effect()
  public updateTodoStatus$: Observable<Action> = this.actions$.pipe(
    ofType(UPDATE_TODO_STATUS),
    switchMap((action: UpdateTodoStatusAction) => {
      const { id, status } = action;
      return this.apiService.updateTodoStatus(id, status).pipe(
        switchMap((v) => {
          return [new UpdateTodoStatusSuccessAction(), new LoadSelectedTodoAction({ todoId: id })];
        }),
        catchError(() => of(new UpdateTodoStatusFailureAction()))
      );
    })
  );

  @Effect()
  public deleteTodo$: Observable<Action> = this.actions$.pipe(
    ofType(DELETE_TODO),
    switchMap((action: DeleteTodoAction) => {
      return this.apiService.deleteTodo(action.id).pipe(
        switchMap((_v) => {
          const actions = [new DeleteTodoSuccessAction()];
          if (action.location === 'list') {
            return [...actions, new LoadTodosAction()];
          } else {
            this.router.navigate(['todos']);
            return actions;
          }
        }),
        catchError(() => of(new DeleteTodoFailureAction()))
      );
    })
  );

  constructor(
    private readonly actions$: Actions,
    private readonly apiService: ApiService,
    private readonly router: Router
  ) {}
}
