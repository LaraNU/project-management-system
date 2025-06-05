import { api } from './api';
import type { Task, User, Board, TaskBoard } from '../types';

export const getTasks = () => api.get<{ data: Task[] }>('/tasks');
export const getBoards = () => api.get<{ data: Board[] }>('/boards');
export const getUsers = () => api.get<{ data: User[] }>('/users');
export const getTaskById = (id: number) => api.get<{ data: Task }>(`/tasks/${id}`);
export const getBoardById = (id: number) => api.get<{ data: TaskBoard[] }>(`/boards/${id}`);

export const createTaskApi = (data: {
  title: string;
  description: string;
  boardId: number;
  priority: 'Low' | 'Medium' | 'High';
  assigneeId: number;
}) => api.post<{ data: Task }>('/tasks/create', data);

export const updateTaskApi = (
  id: number,
  data: {
    title: string;
    description?: string;
    priority: 'Low' | 'Medium' | 'High';
    status: 'Backlog' | 'InProgress' | 'Done';
    assigneeId: number;
  },
) => api.put<{ data: Task }>(`/tasks/update/${id}`, data);
