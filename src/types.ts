export type Task = {
  assignee: {
    avatarUrl: string;
    email: string;
    fullName: string;
    id: number;
  };
  boardName: string;
  description: string;
  id: number;
  priority: string;
  status: string;
  title: string;
};

export type Board = {
  description: string;
  id: number;
  name: string;
  taskCount: number;
};
