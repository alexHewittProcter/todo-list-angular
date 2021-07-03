import { mockTodo1 } from '../../mock/todos';
import {
  LoadSelectedTodoAction,
  LoadSelectedTodoFailureAction,
  LoadSelectedTodoSuccessAction,
  LOAD_SELECTED_TODO,
  LOAD_SELECTED_TODO_FAILURE,
  LOAD_SELECTED_TODO_SUCCESS,
  UpdateTodoAction,
  UpdateTodoFailureAction,
  UpdateTodoSuccessAction,
  UPDATE_TODO,
  UPDATE_TODO_FAILURE,
  UPDATE_TODO_SUCCESS,
} from './selected-todo';

describe('Selected todo actions', () => {
  it('should return LoadSelectedTodoAction', () => {
    const payload = { todoId: '1' };
    const action = new LoadSelectedTodoAction(payload);

    expect({ ...action }).toEqual({ type: LOAD_SELECTED_TODO, payload });
  });

  it('should return LoadSelectedTodoSuccessAction', () => {
    const payload = mockTodo1;
    const action = new LoadSelectedTodoSuccessAction(payload);

    expect({ ...action }).toEqual({ type: LOAD_SELECTED_TODO_SUCCESS, payload });
  });

  it('should return LoadSelectedTodoFailureAction', () => {
    const action = new LoadSelectedTodoFailureAction();

    expect({ ...action }).toEqual({ type: LOAD_SELECTED_TODO_FAILURE });
  });

  it('Should return a UpdateTodoAction', () => {
    const action = new UpdateTodoAction('1', mockTodo1, 'list');

    expect({ ...action }).toEqual({
      type: UPDATE_TODO,
      id: '1',
      todo: mockTodo1,
      editLocation: 'list',
    });
  });

  it('Should return a UpdateTodoSuccessAction', () => {
    const action = new UpdateTodoSuccessAction();

    expect({ ...action }).toEqual({ type: UPDATE_TODO_SUCCESS });
  });

  it('Should return a UpdateTodoFailureAction', () => {
    const action = new UpdateTodoFailureAction();

    expect({ ...action }).toEqual({ type: UPDATE_TODO_FAILURE });
  });
});
