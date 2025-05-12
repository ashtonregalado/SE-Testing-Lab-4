import { Card } from "@/components/ui/card";
import { type Task } from "../task-type";
import { DeleteButton } from "../delete-button";
import { useState } from "react";

export const BasicTask = ({
  task,
  onDelete,
}: {
  task: Task;
  onDelete: (id: string) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={`transition-all duration-200 bg-white border-blue-200
      ${isHovered ? "shadow-lg border-blue-200" : "shadow-sm"} 
      flex flex-row justify-between items-center p-4 mb-4 border rounded-lg`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col ml-2 flex-1">
        <div className="font-medium text-base text-gray-800">{task.title}</div>
        {task.description && (
          <div className="text-sm mt-1 text-gray-600">{task.description}</div>
        )}
      </div>

      <div
        className={`ml-4 transition-opacity ${isHovered ? "opacity-100" : "opacity-70"}`}
      >
        <DeleteButton taskId={task.id} onDelete={onDelete} />
      </div>
    </Card>
  );
};
