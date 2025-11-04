export interface Task {
  id: string;
  description: string;
}

export interface TasksState {
  tasks: Task[];
}