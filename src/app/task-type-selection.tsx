import { useState } from "react";
import { TaskFactory } from "./task-factory";
import { type Task } from "./task-type";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { X } from "lucide-react";

export type TaskType = "basic" | "timed" | "checklist" | null;

export const TaskTypeSelection = ({
  setTasks,
}: {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  const [taskType, setTaskType] = useState<TaskType>(null);
  const [showFactoryUI, setShowFactoryUI] = useState(false);
  const [showClearButton, setShowClearButton] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSelectType = (type: TaskType) => {
    setTaskType(type);
    setShowClearButton(true);
    setShowFactoryUI(true);
  };

  const handleClear = () => {
    setShowFactoryUI(false);
    setShowClearButton(false);
    setTaskType(null);
  };

  return (
    <div className="px-6 my-6">
      <DropdownMenu>
        <DropdownMenuTrigger className="mb-6" asChild>
          <Button
            variant="outline"
            className={`cursor-pointer border-blue-200 ${
              isHovered ? "shadow-md" : "shadow-sm"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Select type of task
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white opacity-100 shadow-md border border-gray-200">
          <DropdownMenuLabel>Tasks</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelectType("basic")}
          >
            Basic Task
          </DropdownMenuItem>
          <DropdownMenuItem
            className="hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelectType("checklist")}
          >
            Checklist Task
          </DropdownMenuItem>
          <DropdownMenuItem
            className="hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelectType("timed")}
          >
            Timed Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {showClearButton && (
        <button className="w-4 h-4 ml-4 cursor-pointer" onClick={handleClear}>
          <X className="w-5 h-5" />
        </button>
      )}

      {showFactoryUI && taskType && (
        <TaskFactory type={taskType} setTasks={setTasks} />
      )}
    </div>
  );
};
