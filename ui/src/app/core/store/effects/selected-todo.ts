import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiService } from '../../services/api/api.service';
import {
  LoadTodosAction,
  UpdateTodoAction,
  UpdateTodoFailureAction,
  UpdateTodoSuccessAction,
  UPDATE_TODO,
} from '../actions';
import {
  LoadSelectedTodoAction,
  LoadSelectedTodoFailureAction,
  LoadSelectedTodoSuccessAction,
  LOAD_SELECTED_TODO,
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

  constructor(private readonly actions$: Actions, private readonly apiService: ApiService) {}
}
