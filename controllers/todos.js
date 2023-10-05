const Todos = require("../models/todos");

exports.getTodos = (req, res) => {
  Todos.fetchAllTodos((todos) => {
    res.render("todos", {
      docTitle: "Todo List",
      path: "/todos",
      todos: todos,
    });
  });
};

exports.postWriteTodos = (req, res) => {
  const todoTitle = req.body.todoName;
  const date = req.body.dateInput;
  const todo = new Todos(todoTitle, date);
  todo.writeTodos();
  res.redirect("/");
};
