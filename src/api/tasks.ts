import { api } from './api';

export const getTasks = () => api.get('/tasks');
export const getBoards = () => api.get('/boards');
export const getTaskById = (id: string) => api.get(`/tasks/${id}`);
