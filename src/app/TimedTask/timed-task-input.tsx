import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import type { Task } from "../task-type";
import { taskManager } from "../task-manager";
import { v4 as uuidv4 } from "uuid";
import { Card } from "@/components/ui/card";

export const TimedTaskInput = ({
  setTasks,
}: {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleAddTask = async () => {
    if (!title.trim() || !date) return;

    const newTask: Task = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      dueDate: date.toISOString(),
      complete: false,
      type: "timed",
    };

    try {
      const postData = await taskManager.postTask(newTask);

      setTasks((prev) => [...prev, postData]);
      setTitle("");
      setDescription("");
      setDate(undefined);

      // Keep form expanded if user might want to add multiple tasks
      if (!isHovered) {
        setIsActive(false);
      }
    } catch (err) {
      console.error("Error posting task", err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddTask();
    }
  };

  // Calculate if today's date is selected
  const isToday = (someDate?: Date) => {
    if (!someDate) return false;
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <Card
      className={`transition-all duration-200 mb-6 p-4 border ${
        isActive || isHovered
          ? "shadow-md border-blue-200"
          : "shadow-sm border-blue-200"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="space-y-3">
        <Input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onClick={() => setIsActive(true)}
          onKeyDown={handleKeyDown}
          className="font-medium  border-gray-200 focus:outline-hidden  rounded-md px-3 py-2"
          autoComplete="off"
        />

        {(isActive || description) && (
          <Input
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            className="text-sm border-b border-gray-200 rounded-md px-3 py-2"
            autoComplete="off"
          />
        )}

        {(isActive || date) && (
          <div className="flex gap-2 items-center">
            <Popover
              open={isCalendarOpen}
              onOpenChange={(open) => {
                setIsCalendarOpen(open);
                if (!open && !isActive) setIsActive(!!date);
              }}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal transition-all cursor-pointer ${
                    !date
                      ? "text-gray-400"
                      : isToday(date)
                        ? "text-blue-600"
                        : "text-gray-700"
                  } ${date ? "border-blue-200" : "border-gray-200"}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select due date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 border-2 border-blue-200 shadow-lg bg-white "
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate);
                    setIsCalendarOpen(false);
                  }}
                  initialFocus
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                  className="bg-white rounded-md p-3 "
                  classNames={{
                    day_selected:
                      "bg-blue-500 text-white hover:bg-blue-600 hover:text-white font-bold cursor-pointer",
                    day_today:
                      "border-2 border-blue-400 font-semibold cursor-pointer",
                    day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 cursor-pointer",
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        )}

        <div
          className={`flex justify-end transition-opacity duration-300 ${
            !isActive && !isHovered ? "opacity-0" : "opacity-100"
          }`}
        >
          <Button
            onClick={handleAddTask}
            disabled={!title.trim() || !date}
            className={`transition-all ${
              !title.trim() || !date
                ? "opacity-50 "
                : "hover:bg-blue-300 hover:text-white bg-blue-200 text-white cursor-pointer"
            }`}
          >
            <Clock className="w-4 h-4 mr-2" />
            Add Timed Task
          </Button>
        </div>
      </div>
    </Card>
  );
};
