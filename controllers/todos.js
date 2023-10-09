const Todo = require("../models/todos");

exports.getTodos = (req, res) => {
  Todo.findAll().then((todos) => {
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
  const todo = new Todos(todoTitle, date.replace("T", " Time: "));
  todo.writeTodos();
  res.redirect("/");
};

exports.postDeleteTodo = (req, res) => {
  const todoId = req.body.id;
  Todos.deleteTodoById(todoId);
  res.redirect("/");
};

exports.editTodo = (req, res) => {
  const todoId = req.params.id;
  const updatedTitle = req.body.todoName;
  const updatedDate = req.body.dateInput;

  Todos.updateTodo(
    todoId,
    updatedTitle,
    updatedDate.replace("T", " Time: "),
    (err) => {
      if (err) {
        // Handle the error, return a 500 internal server error
        res.status(500).json({ err: "Failed to edit todo." });
      } else {
        //if success redirect to home
        res.redirect("/");
      }
    }
  );
};
