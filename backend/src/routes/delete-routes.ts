import { Router, Request, Response } from "express";
import { TaskData } from "../task-data";

const router = Router();

router.delete("/delete-task", (req: Request, res: Response) => {
  const { id } = req.query;

  if (!id) {
    res.status(400).json({ message: "Task ID is required" });
  }

  const taskIndex = TaskData.findIndex((task) => task.id == id);

  if (taskIndex === -1) {
    res.status(404).json({ message: "User not found" });
  }

  TaskData.splice(taskIndex, 1)[0];

  res.json("Task deleted successfully");
});

export default router;
