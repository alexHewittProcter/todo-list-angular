import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import { ViewTodoComponent } from './todos/view-todo/view-todo.component';

const routes: Routes = [
  {
    path: 'todos',
    component: TodoListComponent,
  },
  { path: 'todo/:id', component: ViewTodoComponent },
  { path: '', redirectTo: 'todos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
