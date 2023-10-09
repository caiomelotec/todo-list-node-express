const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

//EJS
app.set("view engine", "ejs");
app.set("views", "views");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//DB
const sequelize = require("./util/database");
// acess to the public folder
app.use(express.static(path.join(__dirname, "public")));

//Routes
const todosRouter = require("./routes/todos");
app.use(todosRouter);

sequelize
  .sync()
  .then(() => {
    app.listen(port);
  })
  .catch((err) => console.log(err));
//listening
