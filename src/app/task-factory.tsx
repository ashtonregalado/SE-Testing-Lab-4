import { CheckListTaskInput } from "./ChecklistTask/checklist-task-input";
import { TimedTaskInput } from "./TimedTask/timed-task-input";
import { type TaskType } from "./task-type-selection";
import { type Task } from "./task-type";
import { BasicTaskInput } from "./BasicTask/basic-task-input";
export const TaskFactory = ({
  type,
  setTasks,
}: {
  type: TaskType;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  if (!type) return null;

  return (
    <div>
      {type === "basic" && <BasicTaskInput setTasks={setTasks} />}
      {type === "checklist" && <CheckListTaskInput setTasks={setTasks} />}
      {type === "timed" && <TimedTaskInput setTasks={setTasks} />}
    </div>
  );
};
