import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { mockTodo1 } from 'src/app/core/mock/todos';
import { TODO_FORM_CLOSE_MODAL_STATES } from 'src/app/core/models/todo-form';
import { ModalService } from 'src/app/core/services/modal/modal.service';
import { LoadTodosAction } from 'src/app/core/store/actions';
import { DeleteTodoAction } from 'src/app/core/store/actions/selected-todo';
import { SharedModule } from 'src/app/shared/shared.module';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoCardComponent } from './todo-card/todo-card.component';

import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let store: MockStore;

  const initialState = {
    todos: {
      todos: [mockTodo1],
    },
  };

  let navigateSpy: jasmine.Spy;
  let openSpy: jasmine.Spy;
  const setOpenSpyReturn = (state = TODO_FORM_CLOSE_MODAL_STATES.TODO_CREATED) => {
    openSpy.and.returnValue({
      result: new Promise((resolve) => {
        resolve(state);
      }),
    });
  };

  beforeEach(async(() => {
    navigateSpy = jasmine.createSpy();

    openSpy = jasmine.createSpy();
    setOpenSpyReturn();

    TestBed.configureTestingModule({
      declarations: [TodoListComponent, TodoCardComponent],
      imports: [SharedModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: Router, useValue: { navigate: navigateSpy } },
        { provide: ModalService, useValue: { open: openSpy } },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch LoadTodosAction', () => {
    expect(store.dispatch).toHaveBeenCalledWith(new LoadTodosAction());
  });

  it('should navigate to a todo when clicking a todo card', () => {
    const todoCards = fixture.debugElement.queryAll(By.css('.todo-card'));

    todoCards[0].nativeElement.click();

    expect(navigateSpy).toHaveBeenCalledWith(['todo', '1']);
  });

  describe('Calling createTodo', () => {
    it('Should open the TodoFormComponent modal and dispatch LoadTodosAction when successful', () => {
      component.createTodo();

      expect(openSpy).toHaveBeenCalledWith(TodoFormComponent, { data: { editMode: false } });
      expect(store.dispatch).toHaveBeenCalledWith(new LoadTodosAction());
    });

    it('Should only open modal when modal is unsuccessful', () => {
      setOpenSpyReturn(TODO_FORM_CLOSE_MODAL_STATES.TODO_CANCELLED);

      component.createTodo();

      expect(openSpy).toHaveBeenCalledWith(TodoFormComponent, { data: { editMode: false } });
      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
  });

  describe('Calling editTodo', () => {
    it('Should open the TodoFormComponent modal and dispatch LoadTodosAction when successful', () => {
      setOpenSpyReturn(TODO_FORM_CLOSE_MODAL_STATES.TODO_UPDATED);

      component.editTodo(mockTodo1);

      expect(openSpy).toHaveBeenCalledWith(TodoFormComponent, {
        data: { editMode: true, todo: mockTodo1, editLocation: 'list' },
      });
      expect(store.dispatch).toHaveBeenCalledWith(new LoadTodosAction());
    });

    it('Should only open modal when modal is unsuccessful', () => {
      setOpenSpyReturn(TODO_FORM_CLOSE_MODAL_STATES.TODO_CANCELLED);

      component.editTodo(mockTodo1);

      expect(openSpy).toHaveBeenCalledWith(TodoFormComponent, {
        data: { editMode: true, todo: mockTodo1, editLocation: 'list' },
      });
      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
  });

  it('Should dispatch DeleteTodoAction with `list` when calling deleteTodo', () => {
    component.deleteTodo(mockTodo1.id);
    expect(store.dispatch).toHaveBeenCalledWith(new DeleteTodoAction(mockTodo1.id, 'list'));
  });
});
