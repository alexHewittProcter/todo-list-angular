import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoContainer } from './todo/todo.container';
import { TodoCardComponent } from './todo/todo-card/todo-card.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TodoContainer, TodoCardComponent],
  exports: [TodoContainer],
  imports: [CommonModule, SharedModule],
})
export class TodosModule {}
