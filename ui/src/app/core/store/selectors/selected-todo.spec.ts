import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { mockTodo1 } from '../../mock/todos';
import { Todo } from '../../models/todo';
import {
  LoadSelectedTodoAction,
  LoadSelectedTodoFailureAction,
  LoadSelectedTodoSuccessAction,
} from '../actions/selected-todo';
import * as fromRoot from '../reducer';
import { getTodoDetails, isLoadingTodo } from './selected-todo';

describe('Selected todo selectors', () => {
  let store: Store<fromRoot.AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [StoreModule.forRoot(fromRoot.reducers)] });

    store = TestBed.get(Store);
  });

  it('should return todo', () => {
    let result: Todo;
    store.select(getTodoDetails).subscribe((v) => {
      result = v;
    });

    store.dispatch(new LoadSelectedTodoAction({ todoId: '1' }));

    expect(result).toBe(null);

    store.dispatch(new LoadSelectedTodoSuccessAction(mockTodo1));

    expect(result).toEqual(mockTodo1);

    store.dispatch(new LoadSelectedTodoAction({ todoId: '1' }));

    expect(result).toBe(null);

    store.dispatch(new LoadSelectedTodoFailureAction());

    expect(result).toBe(null);
  });

  it('should return if selected todo is loading', () => {
    let result: boolean;
    store.select(isLoadingTodo).subscribe((v) => {
      result = v;
    });

    expect(result).toBe(false);

    store.dispatch(new LoadSelectedTodoAction({ todoId: '1' }));

    expect(result).toBe(true);

    store.dispatch(new LoadSelectedTodoSuccessAction(mockTodo1));

    expect(result).toBe(false);

    store.dispatch(new LoadSelectedTodoAction({ todoId: '1' }));

    expect(result).toBe(true);

    store.dispatch(new LoadSelectedTodoFailureAction());

    expect(result).toBe(false);
  });
});
