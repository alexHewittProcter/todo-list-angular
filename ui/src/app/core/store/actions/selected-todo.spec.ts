import { act } from '@ngrx/effects';
import { mockTodo1 } from '../../mock/todos';
import {
  DeleteTodoAction,
  DeleteTodoFailureAction,
  DeleteTodoSuccessAction,
  DELETE_TODO,
  DELETE_TODO_FAILURE,
  DELETE_TODO_SUCCESS,
  LoadSelectedTodoAction,
  LoadSelectedTodoFailureAction,
  LoadSelectedTodoSuccessAction,
  LOAD_SELECTED_TODO,
  LOAD_SELECTED_TODO_FAILURE,
  LOAD_SELECTED_TODO_SUCCESS,
  UpdateTodoAction,
  UpdateTodoFailureAction,
  UpdateTodoStatusAction,
  UpdateTodoStatusFailureAction,
  UpdateTodoStatusSuccessAction,
  UpdateTodoSuccessAction,
  UPDATE_TODO,
  UPDATE_TODO_FAILURE,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_STATUS_FAILURE,
  UPDATE_TODO_STATUS_SUCCESS,
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

  it('Should return a UpdateTodoStatusAction', () => {
    const action = new UpdateTodoStatusAction('1', 'open');

    expect({ ...action }).toEqual({ type: UPDATE_TODO_STATUS, id: '1', status: 'open' });
  });

  it('Should return a UpdateTodoStatusSuccessAction', () => {
    const action = new UpdateTodoStatusSuccessAction();

    expect({ ...action }).toEqual({ type: UPDATE_TODO_STATUS_SUCCESS });
  });

  it('Should return a UpdateTodoStatusFailureAction', () => {
    const action = new UpdateTodoStatusFailureAction();

    expect({ ...action }).toEqual({ type: UPDATE_TODO_STATUS_FAILURE });
  });

  it('Should return DeleteTodoAction', () => {
    const id = '1';
    const action = new DeleteTodoAction(id, 'list');

    expect({ ...action }).toEqual({ type: DELETE_TODO, id, location: 'list' });
  });

  it('Should return DeleteTodoSuccessAction', () => {
    const action = new DeleteTodoSuccessAction();

    expect({ ...action }).toEqual({ type: DELETE_TODO_SUCCESS });
  });

  it('Should return DeleteTodoFailureAction', () => {
    const action = new DeleteTodoFailureAction();

    expect({ ...action }).toEqual({ type: DELETE_TODO_FAILURE });
  });
});
