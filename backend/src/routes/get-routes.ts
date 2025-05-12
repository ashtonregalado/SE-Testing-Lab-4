import { Router } from "express";
import { Request, Response } from "express";
import { TaskData } from "../task-data";
const router = Router();

router.get("/get-task", (req: Request, res: Response) => {
  res.json(TaskData);
});

export default router;
