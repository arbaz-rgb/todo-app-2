const Todoitem = require("../models/Todoitem");

exports.createTodoItem = async (req, res, next) => {
  try {
    const { task, date } = req.body;
    const todoItem = new Todoitem({ task, date });
    await todoItem.save();
    res.status(201).json(todoItem);
  } catch (err) {
    console.log("There is an error during the POST operation:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getTodoItems = async (req, res, next) => {
  try {
    const todoItems = await Todoitem.find();
    res.json(todoItems);
  } catch (err) {
    console.error("Error during GET:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteTodoItem = async (req, res, next) => {
  const { id } = req.params;
  await Todoitem.findByIdAndDelete(id);
  res.status(204).json({ _id: id });
};

exports.markCompleted = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todoItem = await Todoitem.findById(id);
    if (!todoItem) {
      return res.status(404).json({ message: "Todo not found" });
    }
    todoItem.completed = !todoItem.completed;
    await todoItem.save();

    res.json(todoItem);
  } catch (err) {
    console.error("Error during markCompleted:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
