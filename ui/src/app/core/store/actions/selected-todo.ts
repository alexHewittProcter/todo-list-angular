import { Action } from '@ngrx/store';
import { Todo } from '../../models/todo';

export const LOAD_SELECTED_TODO = 'LOAD_SELECTED_TODO';
export const LOAD_SELECTED_TODO_SUCCESS = 'LOAD_SELECTED_TODO_SUCCESS';
export const LOAD_SELECTED_TODO_FAILURE = 'LOAD_SELECTED_TODO_FAILURE';

export class LoadSelectedTodoAction implements Action {
  readonly type = LOAD_SELECTED_TODO;
  constructor(public payload: { todoId: string }) {}
}

export class LoadSelectedTodoSuccessAction implements Action {
  readonly type = LOAD_SELECTED_TODO_SUCCESS;
  constructor(public payload: Todo) {}
}

export class LoadSelectedTodoFailureAction implements Action {
  readonly type = LOAD_SELECTED_TODO_FAILURE;
}

export type SelectedTodoActions =
  | LoadSelectedTodoAction
  | LoadSelectedTodoSuccessAction
  | LoadSelectedTodoFailureAction;
