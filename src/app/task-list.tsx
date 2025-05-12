import type { Task } from "./task-type";
import { CheckListTask } from "./ChecklistTask/checklist-task";
import { BasicTask } from "./BasicTask/basic-task";
import { TimedTask } from "./TimedTask/timed-task";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { TaskSortingStrategy } from "./task-sorting-strategy";
import { useState } from "react";
import { OverdueAlert } from "./overdue-alert";

export const TaskList = ({
  tasks,
  setTasks,
}: {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  const [sortBy, setSortBy] = useState<string>("");

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const getSortedTasks = () => {
    switch (sortBy) {
      case "dueDate":
        return TaskSortingStrategy.sortByDate(tasks);
      case "name":
        return TaskSortingStrategy.sortByName(tasks);
      case "id":
        return TaskSortingStrategy.sortById(tasks);
      default:
        return tasks;
    }
  };

  const sortedTasks = getSortedTasks();

  const overdueCount = tasks.filter(
    (task) => task.dueDate && new Date(task.dueDate) < new Date()
  ).length;

  return (
    <section className="space-y-2 px-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Label htmlFor="task-filter" className="text-base font-medium">
            Sort by:
          </Label>
          <Select onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] border-blue-200 cursor-pointer">
              <SelectValue placeholder="Select sort type" />
            </SelectTrigger>
            <SelectContent className="bg-white opacity-100 shadow-md border border-gray-200">
              <SelectItem
                className="hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
                value="default"
              >
                Default
              </SelectItem>
              <SelectItem
                className="hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
                value="dueDate"
              >
                Due Date
              </SelectItem>
              <SelectItem
                className="hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
                value="name"
              >
                Name
              </SelectItem>
              <SelectItem
                className="hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
                value="id"
              >
                ID
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {overdueCount > 0 && <OverdueAlert count={overdueCount} />}
      {/* Task List */}
      <div className="grid gap-4">
        {sortedTasks.map((task) => {
          switch (task.type) {
            case "checklist":
              return (
                <CheckListTask
                  key={task.id}
                  task={task}
                  onDelete={handleDelete}
                />
              );
            case "basic":
              return (
                <BasicTask key={task.id} task={task} onDelete={handleDelete} />
              );
            case "timed":
              return (
                <TimedTask key={task.id} task={task} onDelete={handleDelete} />
              );
            default:
              return null;
          }
        })}
      </div>
    </section>
  );
};
