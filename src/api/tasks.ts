import { api } from './api';
import { type Task } from '../types';

export const getTasks = () => api.get<{ data: Task[] }>('/tasks');
export const getBoards = () => api.get('/boards');
export const getTaskById = (id: number) => api.get<{ data: Task }>(`/tasks/${id}`);
