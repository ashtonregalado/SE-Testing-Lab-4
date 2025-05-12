import { Card } from "@/components/ui/card";
import type { Task } from "../task-type";
import { format } from "date-fns";
import { DeleteButton } from "../delete-button";
import { Clock, AlertCircle } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const TimedTask = ({
  task,
  onDelete,
}: {
  task: Task;
  onDelete: (id: string) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const formattedDate = task.dueDate
    ? format(new Date(task.dueDate), "MM/dd/yyyy")
    : "";

  // Check if task is overdue
  const isOverdue = task.dueDate ? new Date(task.dueDate) < new Date() : false;

  return (
    <Card
      className={`transition-all duration-200 bg-white border-blue-200
        ${isHovered ? "shadow-lg border-blue-200" : "shadow-sm"} 
        ${isOverdue ? "border-l-4 border-l-red-500" : ""}
        relative flex flex-row justify-between items-center p-4 mb-4 border rounded-lg`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col ml-2 flex-1">
        <div className="font-medium text-base text-gray-800">{task.title}</div>

        {task.description && (
          <div className="text-sm mt-1 text-gray-600">{task.description}</div>
        )}

        {task.dueDate && (
          <div
            className={`text-sm mt-2 ${
              isOverdue ? "text-red-600 font-medium" : "text-gray-600"
            }`}
          >
            Task Due: {""}
            {formattedDate}{" "}
            {isOverdue && <span className="font-semibold">(Overdue)</span>}
          </div>
        )}
      </div>

      <div className="flex items-end flex-col space-x-2 justify-start  gap-y-1">
        {task.dueDate && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={`transition-opacity ${isHovered ? "opacity-100" : "opacity-80"}`}
                >
                  {isOverdue ? (
                    <AlertCircle className="h-5 w-5 text-red-500 cursor-pointer" />
                  ) : (
                    <Clock className="h-5 w-5 text-blue-500 cursor-pointer" />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {isOverdue ? "Overdue" : "Due"}: {formattedDate}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <div
          className={`transition-opacity ${isHovered ? "opacity-100" : "opacity-70"}`}
        >
          <DeleteButton taskId={task.id} onDelete={onDelete} />
        </div>
      </div>
    </Card>
  );
};
