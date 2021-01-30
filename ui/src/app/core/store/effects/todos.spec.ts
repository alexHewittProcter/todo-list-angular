import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { mockTodo1 } from '../../mock/todos';
import { ApiService } from '../../services/api/api.service';
import { LoadTodosAction, LoadTodosFailureAction, LoadTodosSuccessAction } from '../actions';
import { TodosEffects } from './todos';

describe('TodosEffects', () => {
  let effects: TodosEffects;
  let actions$ = new Observable<Actions>();

  let mockApiService;
  beforeEach(() => {
    mockApiService = {
      getTodos: jasmine.createSpy(),
    };
    TestBed.configureTestingModule({
      providers: [
        TodosEffects,
        provideMockActions(() => actions$),
        {
          provide: ApiService,
          useValue: mockApiService,
        },
      ],
    });

    effects = TestBed.get(TodosEffects);
  });

  describe('loadTodos effect', () => {
    it('should dispatch a LoadTodosSuccessAction when receiving a LoadTodosAction', () => {
      mockApiService.getTodos.and.returnValue(of([mockTodo1]));

      const inputAction = new LoadTodosAction();
      const outputAction = new LoadTodosSuccessAction([mockTodo1]);

      actions$ = hot('-a--', { a: inputAction });

      const expected$ = cold('-b', { b: outputAction });

      expect(effects.loadTodos$).toBeObservable(expected$);
    });

    it('should dispatch a LoadTodosFailureAction when receiving an error with getTodos', () => {
      mockApiService.getTodos.and.returnValue(throwError('Error'));

      const inputAction = new LoadTodosAction();
      const outputAction = new LoadTodosFailureAction();

      actions$ = hot('-a--', { a: inputAction });

      const expected$ = cold('-b', { b: outputAction });

      expect(effects.loadTodos$).toBeObservable(expected$);
    });
  });
});
