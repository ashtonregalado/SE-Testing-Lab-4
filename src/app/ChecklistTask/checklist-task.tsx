import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { type Task } from "../task-type";
import { useState } from "react";
import { DeleteButton } from "../delete-button";
import { taskManager } from "../task-manager";

export const CheckListTask = ({
  task,
  onDelete,
}: {
  task: Task;
  onDelete: (id: string) => void;
}) => {
  const [check, setCheck] = useState<boolean | undefined>(task.complete);
  const [isHovered, setIsHovered] = useState(false);

  const handleUpdate = async (taskId: string, completed: boolean) => {
    setCheck(completed);

    try {
      const updatedTask = await taskManager.patchComplete(taskId, completed);
      console.log("Updated Task:", updatedTask);
    } catch (error) {
      console.error("Error:", error);
      setCheck(!completed);
    }
  };

  return (
    <Card
      className={`transition-all duration-200 ${check ? "bg-white border-blue-200 opacity-50" : "bg-white border-blue-200"} 
      ${isHovered ? "shadow-lg border-blue-200" : "shadow-sm"} 
      flex flex-row justify-between items-center p-4 mb-4 border rounded-lg`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`flex items-center flex-1 `}>
        <div className={`flex items-center justify-center p-2 `}>
          <Checkbox
            id={`task-${task.id}`}
            checked={check}
            onCheckedChange={() => handleUpdate(task.id, !check)}
            className={`h-5 w-5 rounded border-2 ${check ? "bg-green-500 border-green-500 text-white cursor-pointer" : "border-gray-300 cursor-pointer"}`}
          />
        </div>

        <div className="flex flex-col ml-3 flex-1">
          <div
            className={`font-medium text-base transition-all ${check ? " text-gray-400" : "text-gray-800"}`}
          >
            {task.title}
          </div>
          {task.description && (
            <div
              className={`text-sm mt-1 transition-all ${check ? "text-gray-400" : "text-gray-600"}`}
            >
              {task.description}
            </div>
          )}
        </div>
      </div>

      <div
        className={`ml-4 transition-opacity ${isHovered ? "opacity-100" : "opacity-70"}`}
      >
        <DeleteButton taskId={task.id} onDelete={onDelete} />
      </div>
    </Card>
  );
};
