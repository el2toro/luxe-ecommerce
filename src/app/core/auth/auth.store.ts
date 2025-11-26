// src/app/core/auth/auth.store.ts
import { Injectable, signal, computed } from '@angular/core';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isElite: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private state = signal<AuthState>({
    user: null,
    token: localStorage.getItem('luxe_token') || null
  });

  // Public signals
  user = computed(() => this.state().user);
  token = computed(() => this.state().token);
  isAuthenticated = computed(() => !!this.state().token);
  isElite = computed(() => this.state().user?.isElite || false);

  login(token: string, user: User) {
    localStorage.setItem('luxe_token', token);
    this.state.update(() => ({ token, user }));
  }

  logout() {
    localStorage.removeItem('luxe_token');
    this.state.set({ user: null, token: null });
  }

  // Called on app init
  init() {
    const token = localStorage.getItem('luxe_token');
    if (token) {
      // In real app: validate token with /me endpoint
      this.state.update(s => ({
        ...s,
        token,
        user: { id: '1', name: 'Alexander Voss', email: 'alexander@luxe.com', isElite: true }
      }));
    }
  }
}