const express = require("express");

const Task = require("../models/Task");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();


// CREATE TASK
router.post(
  "/",
  authMiddleware,
  roleMiddleware("Admin"),
  async (req, res) => {

    try {

      const {
        title,
        description,
        assignedTo,
        project,
        priority,
        deadline,
      } = req.body;

      const task = await Task.create({
        title,
        description,
        assignedTo,
        project,
        priority,
        deadline,
        createdBy: req.user.id,
      });

      res.status(201).json({
        message: "Task created successfully",
        task,
      });

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);


// GET TASKS
router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const tasks = await Task.find()
        .populate("assignedTo", "name email")
        .populate("project", "title")
        .populate("createdBy", "name");

      res.status(200).json(tasks);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);


// UPDATE TASK STATUS
router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const { status } = req.body;

      const task = await Task.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );

      res.status(200).json({
        message: "Task updated successfully",
        task,
      });

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;