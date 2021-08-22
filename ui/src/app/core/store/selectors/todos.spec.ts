import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { from } from 'rxjs';
import { mockTodo1, mockTodo2 } from '../../mock/todos';
import { Todo } from '../../models/todo';
import { LoadTodosSuccessAction } from '../actions';
import * as fromRoot from '../reducer';
import { getDoneTodos, getOpenTodos, getTodos } from './todos';

describe('Todos selectors', () => {
  let store: Store<fromRoot.AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(fromRoot.reducers)],
    });

    store = TestBed.get(Store);
  });

  it('Should return the current state of todos', () => {
    let result: Todo[];
    store.select(getTodos).subscribe((todos) => {
      result = todos;
    });

    expect(result).toEqual([]);

    const payload = [mockTodo1];

    store.dispatch(new LoadTodosSuccessAction(payload));

    expect(result).toEqual(payload);
  });

  it('Should return only open todos', () => {
    let result: Todo[];
    store.select(getOpenTodos).subscribe((todos) => {
      result = todos;
    });

    expect(result).toEqual([]);

    const payload = [mockTodo1, mockTodo2];

    store.dispatch(new LoadTodosSuccessAction(payload));

    expect(result).toEqual([mockTodo1]);
  });

  it('Should return only done todos', () => {
    let result: Todo[];
    store.select(getDoneTodos).subscribe((todos) => {
      result = todos;
    });

    expect(result).toEqual([]);

    const payload = [mockTodo1, mockTodo2];

    store.dispatch(new LoadTodosSuccessAction(payload));

    expect(result).toEqual([mockTodo2]);
  });
});
