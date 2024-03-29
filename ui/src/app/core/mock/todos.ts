import { Todo } from '../models/todo';

export const mockTodo1: Todo = {
  id: '1',
  title: 'Todo1',
  description: 'Test',
  status: 'open',
};

export const mockTodo2: Todo = { id: '2', title: 'Todo 2', description: 'Test', status: 'done' };

export const mockTodos = [mockTodo1, mockTodo2];
