import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoCardComponent } from './todo-list/todo-card/todo-card.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TodoListComponent, TodoCardComponent],
  exports: [TodoListComponent],
  imports: [CommonModule, SharedModule],
})
export class TodosModule {}
