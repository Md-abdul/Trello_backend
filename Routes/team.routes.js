const express = require("express");
const teamroutes = express.Router();
const {TeamModel} = require("../Models/team.model");


// get data from task routes
teamroutes.get("/", async (req, res) => {
  try {
    const tasks = await TeamModel.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new task
teamroutes.post("/create", async (req, res) => {
  try {
    const task = new TeamModel(req.body);
    const savedTask = await task.save();
    res.json(savedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a task by ID for single data
teamroutes.get("/team/:id", async (req, res) => {
  try {
    const task = await TeamModel.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "team not found!!" });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a task by ID
teamroutes.put("/update/:id", async (req, res) => {
  try {
    const updatedTask = await TeamModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "team not found !!" });
    }
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a task by ID
teamroutes.delete("/delete/:id", async (req, res) => {
  try {
    const deletedTask = await TeamModel.findByIdAndRemove(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: "team not found" });
    }
    res.json({ message: "Team deleted successfully !!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = { teamroutes };
