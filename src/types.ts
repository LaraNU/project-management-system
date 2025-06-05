type Assignee = {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string;
};

export type Task = {
  id: number;
  title: string;
  description?: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Backlog' | 'InProgress' | 'Done';
  assignee: Assignee;
  boardId: number;
  boardName: string;
};

export type TaskBoard = {
  id: number;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Backlog' | 'InProgress' | 'Done';
  assignee: Assignee;
};

export type Board = {
  description: string;
  id: number;
  name: string;
  taskCount: number;
};

export type User = {
  avatarUrl: string;
  description: string;
  email: string;
  fullName: string;
  id: number;
  tasksCount: number;
  teamId: number;
  teamName: string;
};
