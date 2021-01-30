import { ActionReducerMap } from "@ngrx/store";
import { todosReducer, TodosState } from "./todos";

export interface AppState {
  todos: TodosState;
}

export const reducers: ActionReducerMap<AppState> = { todos: todosReducer };
