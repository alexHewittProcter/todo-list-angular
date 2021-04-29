import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { mockTodo1 } from 'src/app/core/mock/todos';
import { Todo } from 'src/app/core/models/todo';

import { TodoCardComponent } from './todo-card.component';

@Component({ template: `<app-todo-card [todo]="todo"></app-todo-card>` })
class TestHostComponent {
  todo: Todo = mockTodo1;
}

fdescribe('TodoCardComponent', () => {
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
});
