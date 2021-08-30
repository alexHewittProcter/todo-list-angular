import { mockTodo1, mockTodos } from '../../mock/todos';
import {
  CreateTodoAction,
  CreateTodoFailureAction,
  CreateTodoSuccessAction,
  LoadTodosSuccessAction,
  SearchTodosSuccessAction,
} from '../actions';
import { todosReducer, TodosState } from './todos';

describe('Todos reducer', () => {
  const initialState: TodosState = {
    todos: [],
    isCreatingTodo: false,
    todoSearch: [],
  };
  it('should add todos when receving LoadTodosSuccessAction', () => {
    const state = initialState;
    const payload = [mockTodo1];
    const action = new LoadTodosSuccessAction(payload);

    const actual = todosReducer(state, action);

    expect(actual.todos).toEqual(payload);
  });

  it('should set isCreatingTodo to true when receiving CreateTodoAction', () => {
    const state = initialState;
    const action = new CreateTodoAction(mockTodo1);

    const actual = todosReducer(state, action);

    expect(actual.isCreatingTodo).toBe(true);
  });

  it('should set isCreatingTodo to false when receiving CreateTodoSuccessAction', () => {
    const state = { ...initialState, isCreatingTodo: true };
    const action = new CreateTodoSuccessAction();

    const actual = todosReducer(state, action);

    expect(actual.isCreatingTodo).toBe(false);
  });

  it('should set isCreatingTodo to false when receiving CreateTodoFailureAction', () => {
    const state = { ...initialState, isCreatingTodo: true };
    const action = new CreateTodoFailureAction();

    const actual = todosReducer(state, action);

    expect(actual.isCreatingTodo).toBe(false);
  });

  it('Should set todoSearch with todos when receiving a SearchTodosSuccessAction', () => {
    const state = { ...initialState, todoSearch: [] };
    const action = new SearchTodosSuccessAction(mockTodos);

    const actual = todosReducer(state, action);

    expect(actual.todoSearch).toEqual(mockTodos);
  });
});
