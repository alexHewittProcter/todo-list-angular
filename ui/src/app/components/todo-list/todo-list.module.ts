import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TodoCardModule } from '../todo-card/todo-card.module';
import { TodoListComponent } from './todo-list.component';

const DECLARATIONS = [TodoListComponent];

@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
  imports: [CommonModule, TodoCardModule],
})
export class TodoListModule {}
