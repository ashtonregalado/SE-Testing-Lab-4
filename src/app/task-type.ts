export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  complete?: boolean;
  type: string;
}
