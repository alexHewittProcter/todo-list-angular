import { ActionReducerMap } from '@ngrx/store';
import { selectedTodoReducer, SelectedTodoState } from './selected-todo';
import { todosReducer, TodosState } from './todos';

export interface AppState {
  todos: TodosState;
  selectedTodo: SelectedTodoState;
}

export const reducers: ActionReducerMap<AppState> = {
  todos: todosReducer,
  selectedTodo: selectedTodoReducer,
};
