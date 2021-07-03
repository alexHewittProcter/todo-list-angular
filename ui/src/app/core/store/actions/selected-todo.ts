import { Action } from '@ngrx/store';
import { Todo } from '../../models/todo';

export const LOAD_SELECTED_TODO = 'LOAD_SELECTED_TODO';
export const LOAD_SELECTED_TODO_SUCCESS = 'LOAD_SELECTED_TODO_SUCCESS';
export const LOAD_SELECTED_TODO_FAILURE = 'LOAD_SELECTED_TODO_FAILURE';

export const UPDATE_TODO = 'UPDATE_TODO';
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS';
export const UPDATE_TODO_FAILURE = 'UPDATE_TODO_FAILURE';

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
export class UpdateTodoAction implements Action {
  readonly type = UPDATE_TODO;
  constructor(public id: string, public todo: Todo, public editLocation: 'list' | 'view') {}
}

export class UpdateTodoSuccessAction implements Action {
  readonly type = UPDATE_TODO_SUCCESS;
}

export class UpdateTodoFailureAction implements Action {
  readonly type = UPDATE_TODO_FAILURE;
}

export type SelectedTodoActions =
  | LoadSelectedTodoAction
  | LoadSelectedTodoSuccessAction
  | LoadSelectedTodoFailureAction
  | UpdateTodoAction
  | UpdateTodoSuccessAction
  | UpdateTodoFailureAction;
