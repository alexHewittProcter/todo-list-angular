import { AppState } from '../reducer';

export const getTodoDetails = (state: AppState) => state.selectedTodo.todoDetails;

export const isLoadingTodo = (state: AppState) => state.selectedTodo.isLoadingTodo;
