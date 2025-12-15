import { HttpClient } from '@angular/common/http';
import { Injectable, signal, computed, inject } from '@angular/core';
import { AuthModel } from '@models/auth/auth-request.model';
import { AuthResponseModel } from '@models/auth/auth-response.model';
import { SignupRequestModel } from '@models/auth/signup-request.model';
import { SignupResponseModel } from '@models/auth/signup-response.model';
import { UserModel } from '@models/user/user.model';
import { map, Observable } from 'rxjs';

export interface AuthState {
  user: UserModel | null;
  token: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private baseUrl = 'https://localhost:7020/auth';
  private http = inject(HttpClient);
  private state = signal<AuthState>({
    user: null,
    token: localStorage.getItem('accessToken') || null,
  });

  constructor() {
    this.hydrate();
  }

  // Public signals
  user = computed(() => this.state().user);
  token = computed(() => this.state().token);
  isAuthenticated = computed(() => !!this.state().token);
  //isElite = computed(() => this.state().user?.isElite || false);

  login(authModel: AuthModel): Observable<AuthResponseModel> {
    return this.http.post<AuthResponseModel>(`${this.baseUrl}/login`, authModel).pipe(
      map((authResponse) => {
        localStorage.setItem('accessToken', authResponse.accessToken);
        localStorage.setItem('user', JSON.stringify(authResponse.user));
        this.state.update(() => ({ token: authResponse.accessToken, user: authResponse.user }));

        return authResponse;
      })
    );
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.state.set({ user: null, token: null });
  }

  signup(request: SignupRequestModel): Observable<SignupResponseModel> {
    return this.http.post<SignupResponseModel>(`${this.baseUrl}/signup`, request);
  }

  private hydrate() {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.state.update(() => ({ token: storedAccessToken, user: JSON.parse(storedUser) }));
    }
  }
}
