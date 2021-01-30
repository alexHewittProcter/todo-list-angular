import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { LoadTodosAction } from "src/app/core/store/actions";

import { TodoContainer } from "./todo.container";

describe("TodoComponent", () => {
  let component: TodoContainer;
  let fixture: ComponentFixture<TodoContainer>;
  let store: MockStore;

  const initialState = {
    todos: {
      todos: [],
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoContainer],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, "dispatch").and.callThrough();

    fixture = TestBed.createComponent(TodoContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should dispatch LoadTodosAction", () => {
    expect(store.dispatch).toHaveBeenCalledWith(new LoadTodosAction());
  });
});
