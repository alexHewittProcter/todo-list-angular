import { mockTodo1 } from '../../mock/todos';
import {
  CreateTodoAction,
  CreateTodoFailureAction,
  CreateTodoSuccessAction,
  CREATE_TODO,
  CREATE_TODO_FAILURE,
  CREATE_TODO_SUCCESS,
  LoadTodosAction,
  LoadTodosFailureAction,
  LoadTodosSuccessAction,
  LOAD_TODOS,
  LOAD_TODOS_FAILURE,
  LOAD_TODOS_SUCCESS,
} from './todos';

describe('Todos Actions', () => {
  it('Should return a LoadTodosAction', () => {
    const action = new LoadTodosAction();

    expect({ ...action }).toEqual({ type: LOAD_TODOS });
  });

  it('Should return a LoadTodosSuccessAction', () => {
    const action = new LoadTodosSuccessAction([]);

    expect({ ...action }).toEqual({ type: LOAD_TODOS_SUCCESS, payload: [] });
  });

  it('Should return a LoadTodosFailureAction', () => {
    const action = new LoadTodosFailureAction();

    expect({ ...action }).toEqual({ type: LOAD_TODOS_FAILURE });
  });

  it('Should return a CreateTodoAction', () => {
    const payload = mockTodo1;
    const action = new CreateTodoAction(payload);

    expect({ ...action }).toEqual({ type: CREATE_TODO, payload });
  });

  it('Should return a CreateTodoSuccessAction', () => {
    const action = new CreateTodoSuccessAction();

    expect({ ...action }).toEqual({ type: CREATE_TODO_SUCCESS });
  });

  it('Should return a CreateTodoFailureAction', () => {
    const action = new CreateTodoFailureAction();

    expect({ ...action }).toEqual({ type: CREATE_TODO_FAILURE });
  });
});
