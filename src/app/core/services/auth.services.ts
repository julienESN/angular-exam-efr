import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private storageKey = 'currentUser';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map((users) => {
        const user = users[0] ?? null;
        if (user) {
          localStorage.setItem(this.storageKey, JSON.stringify(user));
        }
        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem(this.storageKey);
  }

  getCurrentUser(): User | null {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }
}
