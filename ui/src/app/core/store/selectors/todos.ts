import { AppState } from "../reducer";

export const getTodos = (state: AppState) => state.todos.todos;
