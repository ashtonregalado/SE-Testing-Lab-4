import { useEffect, useState } from "react";
import { TaskList } from "./task-list";
import { TaskTypeSelection } from "./task-type-selection";
import type { Task } from "./task-type";
import { taskManager } from "./task-manager";

export const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await taskManager.getTask();
      setTasks(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center font-medium p-3">
        Task Manager
      </div>
      <TaskTypeSelection setTasks={setTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};
