import { mockTodo1 } from '../../mock/todos';
import {
  LoadSelectedTodoAction,
  LoadSelectedTodoFailureAction,
  LoadSelectedTodoSuccessAction,
  LOAD_SELECTED_TODO,
  LOAD_SELECTED_TODO_FAILURE,
  LOAD_SELECTED_TODO_SUCCESS,
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
});
