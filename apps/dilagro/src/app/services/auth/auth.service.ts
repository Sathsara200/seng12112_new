import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  // ✅ import Observable

export interface AccessTokenResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root', 
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signIn(username: string, password: string): Observable<any> {
    return this.http.post<AccessTokenResponse>('auth/login', { username, password });
  }
}
