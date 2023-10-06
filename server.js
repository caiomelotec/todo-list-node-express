const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
//EJS
app.set("view engine", "ejs");
app.set("views", "views");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// acess to the public folder
app.use(express.static(path.join(__dirname, "public")));

//Routes
const todosRouter = require("./routes/todos");
app.use(todosRouter);

app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

//listening
app.listen(port, () => {
  console.log(`running on port: ${port}`);
});
