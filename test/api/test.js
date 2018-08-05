const chakram = require('chakram');

const { expect } = require('chakram');

describe('Redux-ToDoApp', () => {
  describe('API', () => {

    before(() => {
      const response = chakram.post("http://localhost:3000/reset");
      expect(response).to.have.status(200);
      return chakram.wait();
    });

    describe('DELETE', () => {
      const task = {
        "text": "todo",
        "completed": false,
        "id": 1,
      };

      before(() => {
        const response = chakram.post("http://localhost:3000/todos", task);
        expect(response).to.have.status(201);
        return chakram.wait();
      });

      it("DELETE todos/:id", () => {
        const response = chakram.delete(`http://localhost:3000/todos/${task.id}`);
        expect(response).to.have.status(200);
        expect(response).to.have.header("content-type", "application/json; charset=utf-8");
        expect(response).to.comprise.of.json({});
        return chakram.wait();
      });

      it("check deleted from list", () => {
        const response = chakram.get("http://localhost:3000/todos");
        expect(response).to.comprise.of.json([]);
        return chakram.wait();
      });

      it("check not exists", () => {
        const response = chakram.get("http://localhost:3000/todos/1");
        expect(response).to.have.status(404);
        return chakram.wait();
      });
    });
  });
});