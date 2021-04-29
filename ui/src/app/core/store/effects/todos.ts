import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ApiService } from '../../services/api/api.service';
import {
  CreateTodoAction,
  CREATE_TODO,
  LoadTodosAction,
  LoadTodosFailureAction,
  LoadTodosSuccessAction,
  LOAD_TODOS,
} from '../actions';

@Injectable()
export class TodosEffects {
  @Effect()
  public loadTodos$: Observable<Action> = this.actions$.pipe(
    ofType(LOAD_TODOS),
    mergeMap((_action: LoadTodosAction) => {
      return this.apiService.getTodos().pipe(
        map((v) => {
          return new LoadTodosSuccessAction(v);
        }),
        catchError(() => of(new LoadTodosFailureAction()))
      );
    })
  );

  @Effect()
  public createTodo$: Observable<Action> = this.actions$.pipe(
    ofType(CREATE_TODO),
    mergeMap((action: CreateTodoAction) => {
      return this.apiService.createTodo(action.payload).pipe(
        map((v) => {
          return new LoadTodosAction();
        })
      );
    })
  );

  constructor(private readonly actions$: Actions, private readonly apiService: ApiService) {}
}
