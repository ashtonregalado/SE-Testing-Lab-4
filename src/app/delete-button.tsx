import { Button } from "@/components/ui/button";
import { taskManager } from "./task-manager";
import { Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DeleteButtonProps {
  taskId: string;
  onDelete: (deletedId: string) => void;
}

export const DeleteButton = ({ taskId, onDelete }: DeleteButtonProps) => {
  const handleDelete = () => {
    taskManager.deleteTask(taskId);
    onDelete(taskId);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            aria-label="Delete task"
            variant="ghost"
            size="icon"
            className="text-red-500 hover:bg-red-100 hover:text-red-600 transition cursor-pointer"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  );
};
