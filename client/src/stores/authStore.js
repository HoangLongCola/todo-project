import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: !!localStorage.getItem('access_token'),
  }),
  actions: {
    login(token) {
      this.isAuthenticated = true;
      localStorage.setItem('access_token', token);
    },
    logout() {
      this.isAuthenticated = false;
      localStorage.removeItem('access_token');
    }
  }
});
