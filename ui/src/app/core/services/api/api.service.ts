import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from '../../models/todo';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get('/api/todos').pipe(
      map((v: { todos: [] }) => {
        return v.todos;
      })
    );
  }

  getTodo(todoId: string): Observable<Todo> {
    let params = new HttpParams().set('id', todoId);
    return this.http.get('/api/todo', { params }).pipe(map((v: { todo: Todo }) => v.todo));
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post('/api/todo', { todo }).pipe(map((v: { todo: Todo }) => v.todo));
  }

  updateTodo(id: string, todo: Todo): Observable<Todo> {
    return this.http.put('/api/todo', { todo, id }).pipe(map((v: { todo: Todo }) => v.todo));
  }
}
