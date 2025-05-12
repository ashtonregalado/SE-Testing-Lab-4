import { Router, Request, Response } from "express";
import { TaskData } from "../task-data";

const router = Router();

router.post("/post-task", (req: Request, res: Response) => {
  const task = req.body;

  TaskData.push(task);
  console.log(TaskData);
  res.status(201).json(task);
});

export default router;
