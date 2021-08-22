import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewTodosListComponent } from './view-todos/view-todos.component';
import { SharedModule } from '../components/shared.module';
import { ViewTodoComponent } from './view-todo/view-todo.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TodoCardModule } from '../components/todo-card/todo-card.module';
import { TodoListModule } from '../components/todo-list/todo-list.module';

@NgModule({
  declarations: [ViewTodosListComponent, ViewTodoComponent, TodoFormComponent],
  entryComponents: [TodoFormComponent],
  exports: [ViewTodosListComponent, ViewTodoComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgbModalModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    TodoCardModule,
    TodoListModule,
  ],
})
export class TodosModule {}
