import { api } from './api';
import { type Task, type User, type Board } from '../types';

export const getTasks = () => api.get<{ data: Task[] }>('/tasks');
export const getBoards = () => api.get<{ data: Board[] }>('/boards');
export const getUsers = () => api.get<{ data: User[] }>('/users');
export const getTaskById = (id: number) => api.get<{ data: Task }>(`/tasks/${id}`);
