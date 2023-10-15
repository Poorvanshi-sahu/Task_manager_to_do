const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-errors");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  return res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(200).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;

  const updatedTask = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  console.log("updatedTask", updatedTask);
  if (!updatedTask) {
    return next(createCustomError(`No task with id ${taskID}`, 404));
  }
  return res.status(200).json({ updatedTask });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const taskID = req.params.id;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id ${taskID}`, 404));
  }

  const deletedTask = await Task.findByIdAndDelete({ _id: taskID });
  return res.status(200).json({ task });
});

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
