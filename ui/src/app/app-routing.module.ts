import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewTodosListComponent } from './todos/view-todos/view-todos.component';
import { ViewTodoComponent } from './todos/view-todo/view-todo.component';

const routes: Routes = [
  {
    path: 'todos',
    component: ViewTodosListComponent,
  },
  { path: 'todo/:id', component: ViewTodoComponent },
  { path: '', redirectTo: 'todos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
