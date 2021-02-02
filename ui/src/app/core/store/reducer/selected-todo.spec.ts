import { mockTodo1 } from '../../mock/todos';
import {
  LoadSelectedTodoAction,
  LoadSelectedTodoFailureAction,
  LoadSelectedTodoSuccessAction,
} from '../actions/selected-todo';
import { selectedTodoInitialState, selectedTodoReducer } from './selected-todo';

describe('Selected todo reducer', () => {
  it('should set `isLoadingTodo` to true when receiving a `LoadSelectedTodoAction`', () => {
    const action = new LoadSelectedTodoAction({ todoId: '1' });

    const actual = selectedTodoReducer(selectedTodoInitialState, action);

    expect(actual.isLoadingTodo).toBe(true);
  });

  it('should set `todoDetails` when receiving a `LoadSelectedTodoSuccessAction`', () => {
    const initialState = selectedTodoReducer(
      selectedTodoInitialState,
      new LoadSelectedTodoAction({ todoId: '1' })
    );
    const action = new LoadSelectedTodoSuccessAction(mockTodo1);

    const actual = selectedTodoReducer(initialState, action);

    expect(actual.isLoadingTodo).toBe(false);
    expect(actual.todoDetails).toEqual(mockTodo1);
  });

  it('should set `isLoadingTodo` to false when receiving a `LoadSelectedTodoFailureAction`', () => {
    const initialState = selectedTodoReducer(
      selectedTodoInitialState,
      new LoadSelectedTodoAction({ todoId: '1' })
    );

    const action = new LoadSelectedTodoFailureAction();

    const actual = selectedTodoReducer(initialState, action);

    expect(actual.isLoadingTodo).toBe(false);
  });
});
