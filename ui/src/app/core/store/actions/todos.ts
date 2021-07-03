import { Action } from '@ngrx/store';
import { Todo } from '../../models/todo';

export const LOAD_TODOS = 'LOAD_TODOS';
export const LOAD_TODOS_SUCCESS = 'LOAD_TODOS_SUCCESS';
export const LOAD_TODOS_FAILURE = 'LOAD_TODOS_FAILURE';

export const CREATE_TODO = 'CREATE_TODO';
export const CREATE_TODO_SUCCESS = 'CREATE_TODO_SUCCESS';
export const CREATE_TODO_FAILURE = 'CREATE_TODO_FAILURE';

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

export class CreateTodoAction implements Action {
  readonly type = CREATE_TODO;
  constructor(public payload: Todo) {}
}

export class CreateTodoSuccessAction implements Action {
  readonly type = CREATE_TODO_SUCCESS;
}

export class CreateTodoFailureAction implements Action {
  readonly type = CREATE_TODO_FAILURE;
}

export type TodosActions =
  | LoadTodosAction
  | LoadTodosSuccessAction
  | LoadTodosFailureAction
  | CreateTodoAction
  | CreateTodoSuccessAction
  | CreateTodoFailureAction;
