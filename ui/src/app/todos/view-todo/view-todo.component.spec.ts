import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { mockTodo1 } from 'src/app/core/mock/todos';
import { TODO_FORM_CLOSE_MODAL_STATES } from 'src/app/core/models/todo-form';
import { ModalService } from 'src/app/core/services/modal/modal.service';
import {
  DeleteTodoAction,
  LoadSelectedTodoAction,
  UpdateTodoStatusAction,
} from 'src/app/core/store/actions/selected-todo';
import { getTodoDetails } from 'src/app/core/store/selectors';
import { SharedModule } from 'src/app/shared/shared.module';
import { TodoFormComponent } from '../todo-form/todo-form.component';

import { ViewTodoComponent } from './view-todo.component';

describe('ViewTodoComponent', () => {
  let component: ViewTodoComponent;
  let fixture: ComponentFixture<ViewTodoComponent>;
  let openSpy: jasmine.Spy;
  const setOpenSpyReturn = (state = TODO_FORM_CLOSE_MODAL_STATES.TODO_CREATED) => {
    openSpy.and.returnValue({
      result: new Promise((resolve) => {
        resolve(state);
      }),
    });
  };

  let dispatch: jasmine.Spy;
  let select: jasmine.Spy;

  beforeEach(async(() => {
    dispatch = jasmine.createSpy();
    select = jasmine.createSpy();

    select.and.callFake((selector) => {
      if ((selector = getTodoDetails)) {
        return of(mockTodo1);
      }
    });

    openSpy = jasmine.createSpy();
    setOpenSpyReturn();

    TestBed.configureTestingModule({
      declarations: [ViewTodoComponent],
      imports: [SharedModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '1' } },
          },
        },
        { provide: Store, useValue: { dispatch, select } },
        { provide: ModalService, useValue: { open: openSpy } },
        { provide: Router, useValue: { navigate: jasmine.createSpy() } },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on init', () => {
    it('should select to these selectors', () => {
      expect(select).toHaveBeenCalledWith(getTodoDetails);
    });

    it('should dispatch', () => {
      expect(dispatch).toHaveBeenCalledWith(new LoadSelectedTodoAction({ todoId: '1' }));
    });
  });

  describe('Calling editTodo', () => {
    beforeEach(() => {
      select.and.returnValue(of(mockTodo1));
    });
    it('Should open the TodoFormComponent modal and dispatch LoadTodosAction when successful', () => {
      setOpenSpyReturn(TODO_FORM_CLOSE_MODAL_STATES.TODO_UPDATED);

      component.editTodo();

      expect(openSpy).toHaveBeenCalledWith(TodoFormComponent, {
        data: { editMode: true, todo: mockTodo1, editLocation: 'view' },
      });
      expect(dispatch).toHaveBeenCalledWith(new LoadSelectedTodoAction({ todoId: '1' }));
    });

    it('Should only open modal when modal is unsuccessful', () => {
      setOpenSpyReturn(TODO_FORM_CLOSE_MODAL_STATES.TODO_CANCELLED);

      component.editTodo();

      expect(openSpy).toHaveBeenCalledWith(TodoFormComponent, {
        data: { editMode: true, todo: mockTodo1, editLocation: 'view' },
      });
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });

  it('Should dispatch DeleteTodoAction with `view` when calling deleteTodo', () => {
    component.deleteTodo();
    expect(dispatch).toHaveBeenCalledWith(new DeleteTodoAction(mockTodo1.id, 'view'));
  });

  it('Should dispatch UpdateTodoStatusAction when calling updateTodoStatus', () => {
    component.updateTodoStatus('open');
    expect(dispatch).toHaveBeenCalledWith(new UpdateTodoStatusAction(mockTodo1.id, 'open'));
  });
});
