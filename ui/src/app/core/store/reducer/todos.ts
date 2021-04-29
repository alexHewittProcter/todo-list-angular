import { Todo } from '../../models/todo';
import {
  CREATE_TODO,
  CREATE_TODO_FAILURE,
  CREATE_TODO_SUCCESS,
  LOAD_TODOS_SUCCESS,
  TodosActions,
} from '../actions';

export interface TodosState {
  todos: Todo[];
  isCreatingTodo: boolean;
}

const initialTodosState: TodosState = { todos: [], isCreatingTodo: false };

export function todosReducer(state = initialTodosState, action: TodosActions) {
  switch (action.type) {
    case LOAD_TODOS_SUCCESS:
      return { ...state, todos: action.payload };
    case CREATE_TODO:
      return { ...state, isCreatingTodo: true };
    case CREATE_TODO_SUCCESS:
      return { ...state, isCreatingTodo: false };
    case CREATE_TODO_FAILURE:
      return { ...state, isCreatingTodo: false };
    default:
      return state;
  }
}
