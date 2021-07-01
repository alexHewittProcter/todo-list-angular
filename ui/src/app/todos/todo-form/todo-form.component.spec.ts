import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { mockTodo1 } from 'src/app/core/mock/todos';
import { TODO_FORM_CLOSE_MODAL_STATES } from 'src/app/core/models/todo-form';
import { MODAL_DATA } from 'src/app/core/services/modal/modal.service';
import { CreateTodoAction, UpdateTodoAction } from 'src/app/core/store/actions';

import { TodoFormComponent, TodoFormModalData } from './todo-form.component';

const initialState = {
  todos: {
    todos: [mockTodo1],
  },
};

const editModeData: TodoFormModalData = {
  editMode: true,
  todo: mockTodo1,
};

const enum DATA_TEST {
  CANCEL_TODO_FORM_BTN = '[data-test="todo-form-cancel-btn"]',
  SUBMIT_TODO_FORM_BTN = '[data-test="todo-form-submit-btn"]',
  CROSS_BTN = '[data-test="todo-form-cancel-cross"]',
}

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  function queryUsingSelector(selector) {
    return fixture.debugElement.query(By.css(selector));
  }

  let closeSpy: jasmine.Spy;
  let dispatchSpy: jasmine.Spy;
  function initialise(
    modalData: TodoFormModalData = {
      editMode: false,
    }
  ) {
    closeSpy = jasmine.createSpy();
    dispatchSpy = jasmine.createSpy();

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TodoFormComponent],
      providers: [
        { provide: NgbActiveModal, useValue: { close: closeSpy } },
        { provide: Store, useValue: { dispatch: dispatchSpy } },
        { provide: MODAL_DATA, useValue: modalData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
  beforeEach(() => {
    initialise();
  });

  describe('UI', () => {
    describe('Modal title', () => {
      it('Should render title `Create Todo` when in create mode', () => {
        const title = queryUsingSelector('.modal-title');

        expect(title.nativeElement.innerText).toEqual('Create Todo');
      });

      it('Should render title `Edit Todo` when in edit mode', () => {
        TestBed.resetTestingModule();
        initialise(editModeData);
        const title = queryUsingSelector('.modal-title');

        expect(title.nativeElement.innerText).toEqual('Edit Todo');
      });
    });

    it('Should have a `Cancel` button', () => {
      expect(queryUsingSelector(DATA_TEST.CANCEL_TODO_FORM_BTN)).not.toBeNull();
    });
    describe('Submit form button', () => {
      it('Should have a `Create` button when in create mode', () => {
        const button = queryUsingSelector(DATA_TEST.SUBMIT_TODO_FORM_BTN);
        expect(button).not.toBeNull();
        expect(button.nativeElement.innerText).toEqual('Create');
      });

      it('Should have a `Update` button when in edit mode', () => {
        TestBed.resetTestingModule();
        initialise(editModeData);

        const button = queryUsingSelector(DATA_TEST.SUBMIT_TODO_FORM_BTN);
        expect(button).not.toBeNull();
        expect(button.nativeElement.innerText).toEqual('Update');
      });
    });

    it('Should call `cancelForm` method when clicking `X`', () => {
      spyOn(component, 'cancelForm').and.callThrough();
      const cross = queryUsingSelector(DATA_TEST.CROSS_BTN);

      expect(cross).not.toBeNull();
      expect(component.cancelForm).not.toHaveBeenCalled();

      cross.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(component.cancelForm).toHaveBeenCalled();
    });
  });
  describe('Form', () => {
    describe('Enabling the Submit button', () => {
      describe('Create mode', () => {
        it('Should not start with `Create` button enabled', () => {
          const button = queryUsingSelector(DATA_TEST.SUBMIT_TODO_FORM_BTN);

          expect(button.nativeElement.disabled).toEqual(true);
        });

        it('Should enable the `Create` button when the user inputs a title', () => {
          const createButton = () => queryUsingSelector(DATA_TEST.SUBMIT_TODO_FORM_BTN);

          expect(createButton().nativeElement.disabled).toEqual(true);

          component.title.setValue('Testing');

          fixture.detectChanges();

          expect(createButton().nativeElement.disabled).toEqual(false);
        });
      });

      describe('Edit mode', () => {
        beforeEach(() => {
          TestBed.resetTestingModule();
          initialise(editModeData);
        });

        it('Should not start with `Edit` button enabled', () => {
          const button = queryUsingSelector(DATA_TEST.SUBMIT_TODO_FORM_BTN);

          expect(button.nativeElement.disabled).toEqual(true);
        });

        it('Should enable the `Edit` button when the user changes title from previous value', () => {
          const createButton = () => queryUsingSelector(DATA_TEST.SUBMIT_TODO_FORM_BTN);

          expect(createButton().nativeElement.disabled).toEqual(true);

          component.title.setValue('Testing');

          fixture.detectChanges();

          expect(createButton().nativeElement.disabled).toEqual(false);

          component.title.setValue(editModeData.todo.title);

          fixture.detectChanges();

          expect(createButton().nativeElement.disabled).toEqual(true);
        });

        it('Should enable the `Edit` button when the user changes description from previous value', () => {
          const createButton = () => queryUsingSelector(DATA_TEST.SUBMIT_TODO_FORM_BTN);

          expect(createButton().nativeElement.disabled).toEqual(true);

          component.description.setValue('Hello');

          fixture.detectChanges();

          expect(createButton().nativeElement.disabled).toEqual(false);

          component.description.setValue(editModeData.todo.description);

          fixture.detectChanges();

          expect(createButton().nativeElement.disabled).toEqual(true);
        });
      });
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

    it('Should call `cancelForm` when clicking the cancel button', () => {
      spyOn(component, 'cancelForm').and.callThrough();

      expect(component.cancelForm).not.toHaveBeenCalled();

      queryUsingSelector(DATA_TEST.CANCEL_TODO_FORM_BTN).triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(component.cancelForm).toHaveBeenCalled();
    });

    describe('Submitting form', () => {
      it('Should call `createTodo` method when clicking the create button in create mode', () => {
        spyOn(component, 'submitForm').and.callThrough();
        spyOn(component, 'createTodo').and.callFake(() => {});

        component.title.setValue('Testing');
        fixture.detectChanges();

        expect(component.createTodo).not.toHaveBeenCalled();

        queryUsingSelector(DATA_TEST.SUBMIT_TODO_FORM_BTN).nativeElement.click();
        fixture.detectChanges();

        expect(component.submitForm).toHaveBeenCalled();
        expect(component.createTodo).toHaveBeenCalled();
      });

      it('Should call `updateTodo` method when clicking the update button in edit mode', () => {
        TestBed.resetTestingModule();
        initialise(editModeData);

        spyOn(component, 'submitForm').and.callThrough();
        spyOn(component, 'updateTodo').and.callFake(() => {});

        component.title.setValue('Testing');
        fixture.detectChanges();

        expect(component.updateTodo).not.toHaveBeenCalled();

        queryUsingSelector(DATA_TEST.SUBMIT_TODO_FORM_BTN).nativeElement.click();
        fixture.detectChanges();

        expect(component.submitForm).toHaveBeenCalled();
        expect(component.updateTodo).toHaveBeenCalled();
      });
    });
  });

  describe('Methods', () => {
    describe('cancelForm method', () => {
      it('Should call the activeModal service when called', () => {
        component.cancelForm();

        fixture.detectChanges();

        expect(closeSpy).toHaveBeenCalledWith(TODO_FORM_CLOSE_MODAL_STATES.TODO_CANCELLED);
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

        expect(closeSpy).toHaveBeenCalledWith(TODO_FORM_CLOSE_MODAL_STATES.TODO_CREATED);
      });
    });

    describe('updateTodo method', () => {
      it('Should call the activeModal service and dispatch a `UpdateTodoAction` when called', () => {
        TestBed.resetTestingModule();
        initialise(editModeData);

        component.title.setValue('Testing');
        fixture.detectChanges();

        component.updateTodo();
        fixture.detectChanges();

        expect(dispatchSpy).toHaveBeenCalledWith(
          new UpdateTodoAction('1', { title: 'Testing', description: mockTodo1.description })
        );

        expect(closeSpy).toHaveBeenCalledWith(TODO_FORM_CLOSE_MODAL_STATES.TODO_UPDATED);
      });
    });
  });
});
