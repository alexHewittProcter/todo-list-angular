import { mockTodo1 } from '../../mock/todos';
import { LoadTodosSuccessAction } from '../actions';
import { todosReducer, TodosState } from './todos';

describe('Todos reducer', () => {
  const initialState: TodosState = {
    todos: [],
  };
  it('should add todos when receving LoadTodosSuccessAction', () => {
    const state = initialState;
    const payload = [mockTodo1];
    const action = new LoadTodosSuccessAction(payload);

    const actual = todosReducer(state, action);

    expect(actual.todos).toEqual(payload);
  });
});
