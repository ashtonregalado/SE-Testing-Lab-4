import type { Task } from "./task-type";

export class TaskSortingStrategy {
  static sortByDate(tasks: Task[]) {
    return [...tasks]
      .filter((task) => task.dueDate)
      .sort(
        (a, b) =>
          new Date(b.dueDate!).getTime() - new Date(a.dueDate!).getTime()
      );
  }

  static sortByName(tasks: Task[]) {
    return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
  }

  static sortById(tasks: Task[]) {
    return [...tasks].sort((a, b) => a.id.localeCompare(b.id));
  }
}
