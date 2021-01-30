import { Action } from "@ngrx/store";
import { Todo } from "../../models/todo";

export const LOAD_TODOS = "LOAD_TODOS";
export const LOAD_TODOS_SUCCESS = "LOAD_TODOS_SUCCESS";
export const LOAD_TODOS_FAILURE = "LOAD_TODOS_FAILURE";

export class LoadTodosAction implements Action {
  readonly type = LOAD_TODOS;
}

export class LoadTodosSuccessAction implements Action {
  readonly type = LOAD_TODOS_SUCCESS;
  constructor(public payload: Todo[]) {}
}

export class LoadTodosFailureAction implements Action {
  readonly type = LOAD_TODOS_FAILURE;
}

export type TodosActions =
  | LoadTodosAction
  | LoadTodosSuccessAction
  | LoadTodosFailureAction;
