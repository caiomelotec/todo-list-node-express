const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const filePath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "todos.json"
);

const getTodosFromFile = (cb) => {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      cb(err, []); // Pass the error as the first argument
    } else {
      cb(JSON.parse(fileContent)); // Pass null as the first argument to indicate no error
    }
  });
};

module.exports = class Todos {
  constructor(title, date) {
    this.title = title;
    this.date = date;
    this.id = uuidv4();
  }

  writeTodos() {
    fs.readFile(filePath, (err, fileContent) => {
      let todos = [];

      if (!err) {
        todos = JSON.parse(fileContent);
      }

      todos.push(this); // Create a new object with title and id

      fs.writeFile(filePath, JSON.stringify(todos), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAllTodos(cb) {
    getTodosFromFile(cb);
  }

  static deleteTodoById(id) {
    getTodosFromFile((todos) => {
      let updatedTodos = todos.filter((todo) => {
        return todo.id !== id;
      });
      fs.writeFile(filePath, JSON.stringify(updatedTodos), (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  }

  static findById(id, cb) {
    getTodosFromFile((todos) => {
      let todo = todos.find((todo) => todo.id === id);
      cb(todo);
    });
  }

  static updateTodo(id, updatedTitle, updatedDate, cb) {
    getTodosFromFile((todos) => {
      const updatedTodos = todos.map((todo) => {
        if (todo.id == id) {
          todo.title = updatedTitle;
          todo.date = updatedDate;
        }
        return todo;
      });

      fs.writeFile(filePath, JSON.stringify(updatedTodos), (err) => {
        if (err) {
          console.error(err);
          cb(err);
        } else {
          cb(null); // No error, callback with success
        }
      });
    });
  }
};
