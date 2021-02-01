import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoCardComponent } from './todo-list/todo-card/todo-card.component';
import { SharedModule } from '../shared/shared.module';
import { ViewTodoComponent } from './view-todo/view-todo.component';

@NgModule({
  declarations: [TodoListComponent, TodoCardComponent, ViewTodoComponent],
  exports: [TodoListComponent, ViewTodoComponent],
  imports: [CommonModule, SharedModule],
})
export class TodosModule {}
