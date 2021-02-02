import { Todo } from '../../models/todo';
import {
  LOAD_SELECTED_TODO,
  LOAD_SELECTED_TODO_FAILURE,
  LOAD_SELECTED_TODO_SUCCESS,
  SelectedTodoActions,
} from '../actions/selected-todo';

export interface SelectedTodoState {
  isLoadingTodo: boolean;
  todoDetails: Todo;
}

export const selectedTodoInitialState: SelectedTodoState = {
  isLoadingTodo: false,
  todoDetails: null,
};

export function selectedTodoReducer(
  state = selectedTodoInitialState,
  action: SelectedTodoActions
): SelectedTodoState {
  switch (action.type) {
    case LOAD_SELECTED_TODO:
      return { ...state, isLoadingTodo: true, todoDetails: null };
    case LOAD_SELECTED_TODO_SUCCESS:
      return { ...state, isLoadingTodo: false, todoDetails: action.payload };
    case LOAD_SELECTED_TODO_FAILURE:
      return { ...state, isLoadingTodo: false };
    default:
      return state;
  }
}
