const express = require("express");
const todoItemsRouter = express.Router();

//local module
const todoItemController = require("../controllers/todoItemsController");

todoItemsRouter.get("/", todoItemController.getTodoItems);
todoItemsRouter.post("/", todoItemController.createTodoItem);
todoItemsRouter.delete("/:id", todoItemController.deleteTodoItem);
todoItemsRouter.patch("/:id/completed", todoItemController.markCompleted);

module.exports = todoItemsRouter;
