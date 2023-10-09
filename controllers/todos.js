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
  // const todo = new Todos(todoTitle, date.replace("T", " Time: "));
  Todo.create({ title: todoTitle, date: date.replace("T", " Time: ") })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
  // todo.writeTodos();
  // res.redirect("/");
};

exports.postDeleteTodo = (req, res) => {
  const todoId = req.body.id;
  Todo.destroy({ where: { id: todoId } })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.editTodo = (req, res) => {
  const todoId = req.params.id;
  const updatedTitle = req.body.todoName;
  const updatedDate = req.body.dateInput;

  Todo.findByPk(todoId)
    .then((todo) => {
      todo.title = updatedTitle;
      todo.date = updatedDate.replace("T", " Time: ");
      return todo.save();
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log("Failed to edit todo", err));
};
