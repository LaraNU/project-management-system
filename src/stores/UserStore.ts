import { makeAutoObservable, runInAction } from 'mobx';
import { type User } from '../types';
import { getUsers } from '../api/tasks';

class UserStore {
  users: User[] = [];
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUsers() {
    this.loading = true;
    this.error = null;

    try {
      const response = await getUsers();
      const data: User[] = response.data.data;
      runInAction(() => {
        this.users = data;
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

export const userStore = new UserStore();
