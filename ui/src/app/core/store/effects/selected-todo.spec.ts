import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { mockTodo1 } from '../../mock/todos';
import { ApiService } from '../../services/api/api.service';
import {
  LoadSelectedTodoAction,
  LoadSelectedTodoFailureAction,
  LoadSelectedTodoSuccessAction,
} from '../actions/selected-todo';
import { SelectedTodoEffects } from './selected-todo';

describe('SelectedTodo effecets', () => {
  let effects: SelectedTodoEffects;
  let actions$ = new Observable<Actions>();

  let mockApiService;
  beforeEach(() => {
    mockApiService = {
      getTodo: jasmine.createSpy(),
    };

    TestBed.configureTestingModule({
      providers: [
        SelectedTodoEffects,
        provideMockActions(() => actions$),
        { provide: ApiService, useValue: mockApiService },
      ],
    });

    effects = TestBed.get(SelectedTodoEffects);
  });

  describe('getTodo effect', () => {
    it('should dispatch a LoadSelectedTodoSuccessAction when receiving a LoadSelectedTodoAction', () => {
      const response = mockTodo1;

      mockApiService.getTodo.and.returnValue(of(response));

      const inputAction = new LoadSelectedTodoAction({ todoId: '1' });
      const outputAction = new LoadSelectedTodoSuccessAction(response);

      actions$ = hot('-a--', { a: inputAction });

      const expected$ = cold('-b--', { b: outputAction });

      expect(effects.getTodo$).toBeObservable(expected$);
      expect(mockApiService.getTodo).toHaveBeenCalledWith('1');
    });

    it('should dispatch a LoadSelectedTodoFailureAction when there is an api error', () => {
      mockApiService.getTodo.and.returnValue(throwError('Error'));

      const inputAction = new LoadSelectedTodoAction({ todoId: '1' });
      const outputAction = new LoadSelectedTodoFailureAction();

      actions$ = hot('-a--', { a: inputAction });

      const expected$ = cold('-b--', { b: outputAction });

      expect(effects.getTodo$).toBeObservable(expected$);
    });
  });
});
