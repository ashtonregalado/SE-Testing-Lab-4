import type { Task } from "./task-type";

class TaskManager {
  private static instance: TaskManager;

  private baseURL = "http://localhost:3000";

  private constructor() {}

  static getInstance(): TaskManager {
    if (!TaskManager.instance) {
      TaskManager.instance = new TaskManager();
    }
    return TaskManager.instance;
  }

  async getTask(): Promise<Task[]> {
    const response = await fetch(`${this.baseURL}/get/get-task`);
    if (!response.ok) throw new Error("Failed to fetch tasks");
    return response.json();
  }

  async postTask(newTask: Task): Promise<Task> {
    const response = await fetch(`${this.baseURL}/post/post-task`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    if (!response.ok) throw new Error("Failed to add task");
    return response.json();
  }

  async deleteTask(taskId: string): Promise<string> {
    const response = await fetch(
      `${this.baseURL}/delete/delete-task?id=${taskId}`,
      { method: "DELETE" }
    );

    if (!response.ok) {
      throw new Error("Failed to delete employee");
    }

    return response.json();
  }

  async patchComplete(taskId: string, complete: boolean): Promise<Task> {
    const response = await fetch(
      `${this.baseURL}/patch/patch-complete?id=${taskId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complete }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update checkbox status");
    }

    return response.json();
  }
}

export const taskManager = TaskManager.getInstance();
