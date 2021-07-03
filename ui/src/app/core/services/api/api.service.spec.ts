import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { mockTodo1 } from '../../mock/todos';

describe('ApiService', () => {
  let apiService: ApiService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    apiService = TestBed.get(ApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });

  it('should return an array of todos', fakeAsync(() => {
    const todos = [mockTodo1];
    const response = { todos };

    apiService.getTodos().subscribe((v) => {
      expect(v).toEqual(todos);
    });

    const req = httpMock.expectOne('/api/todos');
    expect(req.request.method).toBe('GET');
    req.flush(response);
    tick(100);
  }));

  it('should return a single todo', fakeAsync(() => {
    const todo = mockTodo1;
    const response = { todo };

    apiService.getTodo('1').subscribe((v) => {
      expect(v).toEqual(todo);
    });

    const req = httpMock.expectOne('/api/todo?id=1');
    expect(req.request.method).toBe('GET');
    req.flush(response);
    tick(100);
  }));

  it('should return an updated todo', fakeAsync(() => {
    const todo = mockTodo1;
    const response = { todo };

    apiService.updateTodo('1', { ...todo, title: 'Test' }).subscribe((v) => {
      expect(v).toEqual(todo);
    });

    const req = httpMock.expectOne('/api/todo');
    expect(req.request.method).toBe('PUT');
    req.flush(response);
    tick(100);
  }));

  it('should return the id of the deleted todo', fakeAsync(() => {
    const id = '1';
    const response = { id };

    apiService.deleteTodo(id).subscribe((v) => expect(v).toEqual(id));

    const req = httpMock.expectOne('/api/todo');
    expect(req.request.method).toBe('DELETE');
    req.flush(response);
    tick(100);
  }));
});
