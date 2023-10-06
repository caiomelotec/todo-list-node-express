const express = require("express");

const router = express.Router();

const todoController = require("../controllers/todos");
const Todos = require("../models/todos");

router.get("/", todoController.getTodos);

router.post("/add-todos", todoController.postWriteTodos);

router.post("/delete/todos", todoController.postDeleteTodo);

router.post("/edit-todos/:id", todoController.editTodo);

router.get("/todos", (req, res) => {
  Todos.fetchAllTodos((todos) => {
    res.json(todos);
  });
});

router.delete("/todos/:id", (req, res) => {
  const todoId = req.params.id;
  Todos.deleteTodoById(todoId, (err) => {
    if (err) {
      // Handle the error, e.g., return a 500 internal server error
      res.status(500).json({ err: "Failed to delete todo." });
    } else {
      // Respond with a success status code
      res.status(200).json({ message: "Todo deleted successfully." });
    }
  });
});

module.exports = router;
