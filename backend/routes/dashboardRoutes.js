const express = require("express");

const Task = require("../models/Task");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const totalTasks = await Task.countDocuments();

      const completedTasks = await Task.countDocuments({
        status: "Completed",
      });

      const pendingTasks = await Task.countDocuments({
        status: "Todo",
      });

      const inProgressTasks = await Task.countDocuments({
        status: "In Progress",
      });

      res.status(200).json({
        totalTasks,
        completedTasks,
        pendingTasks,
        inProgressTasks,
      });

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;