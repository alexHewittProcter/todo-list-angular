import {
  LoadTodosAction,
  LoadTodosFailureAction,
  LoadTodosSuccessAction,
  LOAD_TODOS,
  LOAD_TODOS_FAILURE,
  LOAD_TODOS_SUCCESS,
} from "./todos";

describe("Todos Actions", () => {
  it("Should return a LoadTodosAction", () => {
    const action = new LoadTodosAction();

    expect({ ...action }).toEqual({ type: LOAD_TODOS });
  });

  it("Should return a LoadTodosSuccessAction", () => {
    const action = new LoadTodosSuccessAction([]);

    expect({ ...action }).toEqual({ type: LOAD_TODOS_SUCCESS, payload: [] });
  });

  it("Should return a LoadTodosFailureAction", () => {
    const action = new LoadTodosFailureAction();

    expect({ ...action }).toEqual({ type: LOAD_TODOS_FAILURE });
  });
});
