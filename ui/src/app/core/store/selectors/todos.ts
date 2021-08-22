import { createSelector } from '@ngrx/store';
import { Todo } from '../../models/todo';
import { AppState } from '../reducer';

export const getTodos = (state: AppState) => state.todos.todos || [];

export const getOpenTodos = createSelector(getTodos, (v: Todo[]) =>
  v.filter((v) => v.status === 'open')
);

export const getDoneTodos = createSelector(getTodos, (v: Todo[]) =>
  v.filter((v) => v.status === 'done')
);
