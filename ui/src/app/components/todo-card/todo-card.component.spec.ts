import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { mockTodo1 } from 'src/app/core/mock/todos';
import { Todo } from 'src/app/core/models/todo';

import { TodoCardComponent } from './todo-card.component';

@Component({
  template: `<app-todo-card
    [todo]="todo"
    (onView)="onView($event)"
    (onEdit)="onEdit($event)"
    (onDelete)="onDelete($event)"
  ></app-todo-card>`,
})
class TestHostComponent {
  todo: Todo = mockTodo1;
  onView = jasmine.createSpy();
  onEdit = jasmine.createSpy();
  onDelete = jasmine.createSpy();
}

describe('TodoCardComponent', () => {
  let testHostComponent: TestHostComponent;
  let component: TodoCardComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, TodoCardComponent],
      imports: [CommonModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = fixture.componentInstance;
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should display todo title', () => {
    const title = fixture.debugElement.query(By.css('.card-title'));

    expect(title.nativeElement.innerText).toEqual(mockTodo1.title);
  });

  describe('View todo', () => {
    it('Should call `viewTodo` when clicking the `View` button', () => {
      spyOn(component, 'viewTodo');

      const button = fixture.debugElement.query(By.css('[data-test="todo-card-view-btn"]'));

      expect(component.viewTodo).not.toHaveBeenCalled();

      button.nativeElement.click();
      fixture.detectChanges();

      expect(component.viewTodo).toHaveBeenCalled();
    });

    it('Should emit `onView` event when calling `viewTodo`', () => {
      expect(testHostComponent.onView).not.toHaveBeenCalled();

      component.viewTodo(new Event('click'));

      fixture.detectChanges();

      expect(testHostComponent.onView).toHaveBeenCalled();
    });
  });

  describe('Edit todo', () => {
    it('Should call `editTodo` when clicking the `Edit` button', () => {
      spyOn(component, 'editTodo');

      const button = fixture.debugElement.query(By.css('[data-test="todo-card-edit-btn"]'));

      expect(component.editTodo).not.toHaveBeenCalled();

      button.nativeElement.click();
      fixture.detectChanges();

      expect(component.editTodo).toHaveBeenCalled();
    });

    it('Should emit `onEdit` event when calling `editTodo`', () => {
      expect(testHostComponent.onEdit).not.toHaveBeenCalled();

      component.editTodo(new Event('click'));

      fixture.detectChanges();

      expect(testHostComponent.onEdit).toHaveBeenCalled();
    });
  });

  describe('Delete todo', () => {
    it('Should call `deleteTodo` when clicking the `Delete` button', () => {
      spyOn(component, 'deleteTodo');

      const button = fixture.debugElement.query(By.css('[data-test="todo-card-delete-btn"]'));

      expect(component.deleteTodo).not.toHaveBeenCalled();

      button.nativeElement.click();
      fixture.detectChanges();

      expect(component.deleteTodo).toHaveBeenCalled();
    });

    it('Should emit `onDelete` event when calling `deleteTodo`', () => {
      expect(testHostComponent.onDelete).not.toHaveBeenCalled();

      component.deleteTodo(new Event('click'));

      fixture.detectChanges();

      expect(testHostComponent.onDelete).toHaveBeenCalled();
    });
  });
});
