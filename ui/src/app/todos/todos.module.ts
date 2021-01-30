import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoContainer } from './todo/todo.container';
import { TodoCardComponent } from './todo/todo-card/todo-card.component';

@NgModule({
  declarations: [TodoContainer, TodoCardComponent],
  exports: [TodoContainer],
  imports: [CommonModule],
})
export class TodosModule {}
