import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { mockTodo1 } from '../../mock/todos';
import { ApiService } from '../../services/api/api.service';
import {
  LoadTodosAction,
  UpdateTodoAction,
  UpdateTodoFailureAction,
  UpdateTodoSuccessAction,
} from '../actions';
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
      updateTodo: jasmine.createSpy(),
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

  describe('updateTodo$ called when receiving a UpdateTodoAction', () => {
    it('should dispatch a UpdateTodoSuccessAction and LoadTodosAction when editing from the list', () => {
      const response = mockTodo1;

      mockApiService.updateTodo.and.returnValue(of(response));

      const inputAction = new UpdateTodoAction('1', mockTodo1, 'list');
      const outputAction1 = new UpdateTodoSuccessAction();
      const outputAction2 = new LoadTodosAction();

      actions$ = hot('-a--', { a: inputAction });

      const expected$ = cold('-(bc)--', { b: outputAction1, c: outputAction2 });

      expect(effects.updateTodo$).toBeObservable(expected$);
      expect(mockApiService.updateTodo).toHaveBeenCalledWith('1', mockTodo1);
    });

    it('should dispatch a UpdateTodoSuccessAction and LoadSelectedTodoAction when editing from the view', () => {
      const response = mockTodo1;

      mockApiService.updateTodo.and.returnValue(of(response));

      const inputAction = new UpdateTodoAction('1', mockTodo1, 'view');
      const outputAction1 = new UpdateTodoSuccessAction();
      const outputAction2 = new LoadSelectedTodoAction({ todoId: '1' });

      actions$ = hot('-a--', { a: inputAction });

      const expected$ = cold('-(bc)--', { b: outputAction1, c: outputAction2 });

      expect(effects.updateTodo$).toBeObservable(expected$);
      expect(mockApiService.updateTodo).toHaveBeenCalledWith('1', mockTodo1);
    });

    it('should dispatch a UpdateTodoFailureAction when api throws error', () => {
      mockApiService.updateTodo.and.returnValue(throwError('Error'));

      const inputAction = new UpdateTodoAction('1', mockTodo1, 'list');
      const outputAction = new UpdateTodoFailureAction();

      actions$ = hot('-a--', { a: inputAction });

      const expected$ = cold('-b--', { b: outputAction });

      expect(effects.updateTodo$).toBeObservable(expected$);
      expect(mockApiService.updateTodo).toHaveBeenCalledWith('1', mockTodo1);
    });
  });
});
