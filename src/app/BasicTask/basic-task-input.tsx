import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import type { Task } from "../task-type";
import { taskManager } from "../task-manager";
import { v4 as uuidv4 } from "uuid";
import { Card } from "@/components/ui/card";

export const BasicTaskInput = ({
  setTasks,
}: {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddTask = async () => {
    if (!title.trim()) return;

    const newTask: Task = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      complete: false,
      type: "basic",
    };

    try {
      const postData = await taskManager.postTask(newTask);

      setTasks((prev) => [...prev, postData]);
      setTitle("");
      setDescription("");

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
          className="font-medium border-b border-gray-200 rounded-md px-3 py-2"
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

        <div
          className={`flex justify-end transition-opacity duration-300 ${
            !isActive && !isHovered ? "opacity-0" : "opacity-100"
          }`}
        >
          <Button
            onClick={handleAddTask}
            disabled={!title.trim()}
            className={`transition-all ${
              !title.trim()
                ? "opacity-50"
                : "hover:bg-blue-300 hover:text-white bg-blue-200 text-white cursor-pointer"
            }`}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>
    </Card>
  );
};
