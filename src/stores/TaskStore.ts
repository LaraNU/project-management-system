import { makeAutoObservable, runInAction } from 'mobx';
import { type Task } from '../types';
import { getTasks, getTaskById, createTaskApi, updateTaskApi } from '../api/tasks';

class TaskStore {
  tasks: Task[] = [];
  selectedTask: Task | null = null;
  loading = false;
  loadingSelected = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchTasks() {
    this.loading = true;
    this.error = null;

    try {
      const response = await getTasks();
      const data: Task[] = response.data.data;
      runInAction(() => {
        this.tasks = data;
        this.loading = false;
      });
    } catch (err) {
      runInAction(() => {
        if (err instanceof Error) this.error = err.message || 'Unknown error';
        this.loading = false;
      });
    }
  }

  async fetchTaskById(id: number) {
    this.loadingSelected = true;
    this.error = null;
    try {
      const response = await getTaskById(id);
      const data: Task = response.data.data;
      runInAction(() => {
        this.selectedTask = data;
        this.loadingSelected = false;
      });
    } catch (err) {
      runInAction(() => {
        if (err instanceof Error) this.error = err.message || 'Unknown error';
        this.loadingSelected = false;
      });
    }
  }

  async createTask(values: {
    title: string;
    description: string;
    boardId: number;
    priority: 'Low' | 'Medium' | 'High';
    assigneeId: number;
  }) {
    this.loadingSelected = true;
    this.error = null;
    try {
      const response = await createTaskApi(values);
      const newTask: Task = response.data.data;
      runInAction(() => {
        this.tasks = [newTask, ...this.tasks];
        this.loadingSelected = false;
      });
    } catch (err) {
      runInAction(() => {
        if (err instanceof Error) this.error = err.message || 'Error creating task';
        this.loadingSelected = false;
      });
      throw err;
    }
  }

  async updateTask(
    id: number,
    values: {
      title: string;
      description?: string;
      priority: 'Low' | 'Medium' | 'High';
      status: 'Backlog' | 'InProgress' | 'Done';
      assigneeId: number;
    },
  ) {
    this.loadingSelected = true;
    this.error = null;
    try {
      const response = await updateTaskApi(id, values);
      const updatedTask: Task = response.data.data;
      runInAction(() => {
        this.tasks = this.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));

        if (this.selectedTask && this.selectedTask.id === updatedTask.id) {
          this.selectedTask = updatedTask;
        }
        this.loadingSelected = false;
      });
    } catch (err) {
      runInAction(() => {
        if (err instanceof Error) this.error = err.message || 'Error updating task';
        this.loadingSelected = false;
      });
      throw err;
    }
  }

  clearSelectedTask() {
    this.selectedTask = null;
  }
}

export const taskStore = new TaskStore();
