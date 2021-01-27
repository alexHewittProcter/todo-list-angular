const request = require("supertest");
const app = require("../index");
const { todos } = require("../../data/mock-todos");

function removeDatesFromTodos(todos) {
  return todos.map((item) => {
    delete item.createdAt;
    delete item.updatedAt;
    delete item.id;
    return item;
  });
}

function filterTodos(todos, filter, value) {
  return todos.filter((v) => v[filter] == value);
}

function searchTodos(todos, value) {
  return todos.filter(
    (v) => v.title.includes(value) || v.description.includes(value)
  );
}

const mockTodo = {
  title: "Hello there",
  description: "General kenobi",
  status: "open",
};

let todoId;

describe("Base endpoints", () => {
  describe("/todos GET endpoint", () => {
    it("should return all todos", async (done) => {
      const res = await request(app).get("/api/todos");
      expect(res.status).toBe(200);
      const resTodos = removeDatesFromTodos(res.body.todos);
      expect(resTodos.length).toBe(todos.length);
      expect(resTodos).toEqual(todos);
      done();
    });

    describe("filtering by status", () => {
      it("should return all todos with status of `open`", async (done) => {
        const res = await request(app).get("/api/todos?status=open");
        expect(res.status).toBe(200);
        const filteredTodos = filterTodos(todos, "status", "open");
        const resTodos = removeDatesFromTodos(res.body.todos);
        expect(resTodos.length).toBe(filteredTodos.length);
        expect(resTodos).toEqual(filteredTodos);
        done();
      });

      it("should return all todos with status of `done`", async (done) => {
        const res = await request(app).get("/api/todos?status=done");
        expect(res.status).toBe(200);
        const filteredTodos = filterTodos(todos, "status", "done");
        const resTodos = removeDatesFromTodos(res.body.todos);
        expect(resTodos.length).toBe(filteredTodos.length);
        expect(resTodos).toEqual(filteredTodos);
        done();
      });

      it("should return a 422 status code when the filter is invalid", async (done) => {
        const res = await request(app).get("/api/todos?status=olbas");
        expect(res.status).toBe(422);
        done();
      });
    });
  });

  describe("/search GET endpoint", () => {
    it("should return all todos with `project` as title or description", async (done) => {
      const res = await request(app).get("/api/search?query=project");
      expect(res.status).toBe(200);
      const resTodos = removeDatesFromTodos(res.body.todos);
      const searchedTodos = searchTodos(todos, "project");
      expect(resTodos).toEqual(searchedTodos);
      done();
    });
    it("should return no todos when the string doesn't match", async (done) => {
      const res = await request(app).get("/api/search?query=blahblahblah");
      expect(res.status).toBe(200);
      const resTodos = removeDatesFromTodos(res.body.todos);
      expect(resTodos.length).toBe(0);
      done();
    });
  });

  describe("/todo GET endpoint", () => {
    it("should return an individual todo", async (done) => {
      const res = await request(app).get("/api/todo?id=1");
      expect(res.status).toBe(200);
      const resTodo = removeDatesFromTodos([res.body.todo])[0];
      expect(resTodo).toEqual(todos[0]);
      done();
    });
    it("should get 404 error status when todo does not exist", async (done) => {
      const res = await request(app).get("/api/todo?id=1000");
      expect(res.status).toBe(404);
      done();
    });
  });

  describe("/todo POST endpoint", () => {
    it("should create a new todo", async (done) => {
      const res = await request(app).post("/api/todo").send({ todo: mockTodo });
      todoId = res.body.todo.id;
      expect(res.status).toBe(200);
      const resTodo = removeDatesFromTodos([res.body.todo])[0];
      expect(resTodo).toEqual({ ...mockTodo, status: "open" });
      await request(app).delete("/api/todo").send({ id: todoId });
      done();
    });
  });

  describe("/todo PUT endpoint", () => {
    it("should update endpoint", async (done) => {
      const createRes = await request(app)
        .post("/api/todo")
        .send({ todo: mockTodo });
      todoId = createRes.body.todo.id;
      const updatedTodo = { ...mockTodo, title: "WHAT YOU GUNNA DO" };
      const res = await request(app)
        .put("/api/todo")
        .send({ id: todoId, todo: updatedTodo });
      expect(res.status).toBe(200);
      const todo = removeDatesFromTodos([res.body.todo])[0];
      expect(todo).toEqual(updatedTodo);
      await request(app).delete("/api/todo").send({ id: todoId });
      done();
    });

    it("should return 404 when todo does not exist", async (done) => {
      const updatedTodo = { ...todos[0], title: "WHAT YOU GUNNA DO" };
      const res = await request(app)
        .put("/api/todo")
        .send({ id: "1000", todo: updatedTodo });
      expect(res.status).toBe(404);
      done();
    });
  });

  describe("/todo DELETE endpoint", () => {
    it("should delete endpoint", async (done) => {
      const createRes = await request(app)
        .post("/api/todo")
        .send({ todo: mockTodo });
      todoId = createRes.body.todo.id;
      const res = await request(app).delete("/api/todo").send({ id: todoId });
      expect(res.status).toBe(200);
      const res2 = await request(app).get(`/api/todo?id=${todoId}`);
      expect(res2.status).toBe(404);
      await request(app).delete("/api/todo").send({ id: todoId });
      done();
    });

    it("should return 404 error status when todo does not exist", async (done) => {
      const res = await request(app).delete("/api/todo").send({ id: "1000" });
      expect(res.status).toBe(404);
      done();
    });
  });
});
