import { Todo } from "../../models/todo";
import { LOAD_TODOS_SUCCESS, TodosActions } from "../actions";

export interface TodosState {
  todos: Todo[];
}

const initialTodosState: TodosState = { todos: [] };

export function todosReducer(state = initialTodosState, action: TodosActions) {
  switch (action.type) {
    case LOAD_TODOS_SUCCESS:
      return { todos: action.payload };
    default:
      return state;
  }
}
