import { Router, Request, Response } from "express";
import { TaskData } from "../task-data";
const router = Router();

router.patch("/patch-complete", (req: Request, res: Response) => {
  const { id } = req.query;
  const updatedData = req.body;

  const index = TaskData.findIndex((task) => task.id == id);

  if (index != -1) {
    TaskData[index] = { ...TaskData[index], ...updatedData };
    console.log("Full Data Array:", TaskData);
    res.json(TaskData[index]);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

export default router;
