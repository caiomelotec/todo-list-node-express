const express = require("express");

const router = express.Router();

const todoController = require("../controllers/todos");

router.get("/", todoController.getTodos);

router.post("/add-todos", todoController.postWriteTodos);

router.post("/delete/todos", todoController.postDeleteTodo);

router.post("/edit-todos/:id", todoController.editTodo);

module.exports = router;
