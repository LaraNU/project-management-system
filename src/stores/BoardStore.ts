import { makeAutoObservable, runInAction } from 'mobx';
import { type Board } from '../types';
import { getBoards } from '../api/tasks';

class BoardStore {
  boards: Board[] = [];
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchBoards() {
    this.loading = true;
    this.error = null;

    try {
      const response = await getBoards();
      const data: Board[] = response.data.data;
      runInAction(() => {
        this.boards = data;
        this.loading = false;
      });
    } catch (err) {
      runInAction(() => {
        if (err instanceof Error) this.error = err.message || 'Unknown error';
        this.loading = false;
      });
    }
  }
}

export const boardStore = new BoardStore();
