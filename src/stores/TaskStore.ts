import { makeAutoObservable, runInAction } from 'mobx';
import { type Task } from '../types';
import { getTasks, getTaskById } from '../api/tasks';

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
      const data: Task[] = response.data.data || response.data;
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
      const data: Task = response.data.data || response.data;
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

  clearSelectedTask() {
    this.selectedTask = null;
  }
}

export const taskStore = new TaskStore();
