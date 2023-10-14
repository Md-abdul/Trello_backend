const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskID: Number,
  title: String,
  description: String,
  dueDate: String,
  priority: String,
  status: String,
  projectID: Number,
  // parentTask: Number, // Reference to Tasks collection
});

const TaskModel = mongoose.model("task", taskSchema);
module.exports = { TaskModel };