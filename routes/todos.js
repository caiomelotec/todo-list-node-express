const express = require("express");

const router = express.Router();

const todoController = require("../controllers/todos");

router.get("/", todoController.getTodos);

router.post("/add-todos", todoController.postWriteTodos);

module.exports = router;
