import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  // - Create task
  // - Attach owner = req.user._id
  try {
    const { title, description } = req.body;
    const task = new Task({
      title,
      description,
      owner: req.user._id,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

export const getTasks = async (req, res) => {
  // - Return only tasks belonging to req.user
  try {
    const tasks = await Task.find({ owner: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

export const deleteTask = async (req, res) => {
  // - Check ownership
  // - Delete task
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};
