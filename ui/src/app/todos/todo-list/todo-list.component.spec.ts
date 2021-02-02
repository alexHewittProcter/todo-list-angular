import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { mockTodo1 } from 'src/app/core/mock/todos';
import { LoadTodosAction } from 'src/app/core/store/actions';
import { SharedModule } from 'src/app/shared/shared.module';
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

  beforeEach(async(() => {
    navigateSpy = jasmine.createSpy();
    TestBed.configureTestingModule({
      declarations: [TodoListComponent, TodoCardComponent],
      imports: [SharedModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: Router, useValue: { navigate: navigateSpy } },
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

  xit('should create', () => {
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
});
