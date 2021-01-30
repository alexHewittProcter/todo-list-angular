import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { ApiService } from "../../services/api/api.service";
import {
  LoadTodosAction,
  LoadTodosFailureAction,
  LoadTodosSuccessAction,
  LOAD_TODOS,
} from "../actions";

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

  constructor(
    private readonly actions$: Actions,
    private readonly apiService: ApiService
  ) {}
}
