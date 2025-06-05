import { makeAutoObservable, runInAction } from 'mobx';
import { type Board, type TaskBoard } from '../types';
import { getBoards, getBoardById } from '../api/tasks';

class BoardStore {
  boards: Board[] = [];
  selectedBoard: TaskBoard[] = [];
  loading = false;
  loadingSelected = false;
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

  async fetchBoardById(id: number) {
    this.loadingSelected = true;
    this.error = null;
    try {
      const response = await getBoardById(id);
      const data: TaskBoard[] = response.data.data;
      runInAction(() => {
        this.selectedBoard = data;
        this.loadingSelected = false;
      });
    } catch (err) {
      runInAction(() => {
        if (err instanceof Error) this.error = err.message || 'Unknown error';
        this.loadingSelected = false;
      });
    }
  }
}

export const boardStore = new BoardStore();
