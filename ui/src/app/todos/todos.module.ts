import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoCardComponent } from './todo-list/todo-card/todo-card.component';
import { SharedModule } from '../shared/shared.module';
import { ViewTodoComponent } from './view-todo/view-todo.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TodoListComponent, TodoCardComponent, ViewTodoComponent, CreateTodoComponent],
  entryComponents: [CreateTodoComponent],
  exports: [TodoListComponent, ViewTodoComponent],
  imports: [CommonModule, SharedModule, NgbModalModule, ReactiveFormsModule],
})
export class TodosModule {}
