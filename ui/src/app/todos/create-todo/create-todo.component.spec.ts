import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { mockTodo1 } from 'src/app/core/mock/todos';
import { CREATE_TODO_CLOSE_MODAL_STATES } from 'src/app/core/models/create-todo';
import { CreateTodoAction } from 'src/app/core/store/actions';

import { CreateTodoComponent } from './create-todo.component';

const initialState = {
  todos: {
    todos: [mockTodo1],
  },
};

const enum DATA_TEST {
  CANCEL_TODO_BTN = '[data-test="create-todo-cancel-btn"]',
  CREATE_TODO_BTN = '[data-test="create-todo-create-btn"]',
  CROSS_BTN = '[data-test="create-todo-cancel-cross"]',
}

describe('CreateTodoComponent', () => {
  let component: CreateTodoComponent;
  let fixture: ComponentFixture<CreateTodoComponent>;

  function queryUsingSelector(selector) {
    return fixture.debugElement.query(By.css(selector));
  }

  let closeSpy: jasmine.Spy;
  let dispatchSpy: jasmine.Spy;

  beforeEach(() => {
    closeSpy = jasmine.createSpy();
    dispatchSpy = jasmine.createSpy();

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CreateTodoComponent],
      providers: [
        { provide: NgbActiveModal, useValue: { close: closeSpy } },
        { provide: Store, useValue: { dispatch: dispatchSpy } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('UI', () => {
    it('Should render title `Create Todo`', () => {
      const title = queryUsingSelector('.modal-title');

      expect(title.nativeElement.innerText).toEqual('Create Todo');
    });

    it('Should have a `Cancel` button', () => {
      expect(queryUsingSelector(DATA_TEST.CANCEL_TODO_BTN)).not.toBeNull();
    });

    it('Should have a `Create` button', () => {
      expect(queryUsingSelector(DATA_TEST.CREATE_TODO_BTN)).not.toBeNull();
    });

    it('Should call `cancelCreate` method when clicking `X`', () => {
      spyOn(component, 'cancelCreate').and.callThrough();
      const cross = queryUsingSelector(DATA_TEST.CROSS_BTN);

      expect(cross).not.toBeNull();
      expect(component.cancelCreate).not.toHaveBeenCalled();

      cross.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(component.cancelCreate).toHaveBeenCalled();
    });
  });
  describe('Form', () => {
    it('Should not start with `Create` button enabled', () => {
      const button = queryUsingSelector(DATA_TEST.CREATE_TODO_BTN);

      expect(button.nativeElement.disabled).toEqual(true);
    });

    it('Should show a warning when the title is empty and form touched', () => {
      const warning = () =>
        fixture.debugElement.query(By.css('[data-test="create-todo-required-input-warning"]'));

      expect(warning()).toBeNull();

      component.title.setValue('Testing');
      component.title.setValue('');
      component.form.markAllAsTouched();
      fixture.detectChanges();

      expect(warning()).not.toBeNull();
    });

    it('Should enable the `Create` button when the user inputs a title', () => {
      const createButton = () => queryUsingSelector(DATA_TEST.CREATE_TODO_BTN);

      expect(createButton().nativeElement.disabled).toEqual(true);

      component.title.setValue('Testing');

      fixture.detectChanges();

      expect(createButton().nativeElement.disabled).toEqual(false);
    });

    it('Should call `cancelCreate` when clicking the cancel button', () => {
      spyOn(component, 'cancelCreate').and.callThrough();

      expect(component.cancelCreate).not.toHaveBeenCalled();

      queryUsingSelector(DATA_TEST.CANCEL_TODO_BTN).triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(component.cancelCreate).toHaveBeenCalled();
    });

    it('Should call `createTodo` method when clicking the create button', () => {
      spyOn(component, 'createTodo').and.callFake(() => {});

      component.title.setValue('Testing');
      fixture.detectChanges();

      expect(component.createTodo).not.toHaveBeenCalled();

      queryUsingSelector(DATA_TEST.CREATE_TODO_BTN).nativeElement.click();
      fixture.detectChanges();

      expect(component.createTodo).toHaveBeenCalled();
    });
  });
  describe('Methods', () => {
    describe('cancelTodo method', () => {
      it('Should call the activeModal service when called', () => {
        component.cancelCreate();

        fixture.detectChanges();

        expect(closeSpy).toHaveBeenCalledWith(CREATE_TODO_CLOSE_MODAL_STATES.TODO_CANCELLED);
      });
    });

    describe('createTodo method', () => {
      it('Should call the activeModal service and dispatch a `CreateTodoAction` when called', () => {
        component.title.setValue('Testing');
        fixture.detectChanges();

        component.createTodo();
        fixture.detectChanges();

        expect(dispatchSpy).toHaveBeenCalledWith(
          new CreateTodoAction({ title: 'Testing', description: '' })
        );

        expect(closeSpy).toHaveBeenCalledWith(CREATE_TODO_CLOSE_MODAL_STATES.TODO_CREATED);
      });
    });
  });
});
