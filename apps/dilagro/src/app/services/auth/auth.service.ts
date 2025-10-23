import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  // ✅ import Observable

@Injectable({
  providedIn: 'root', 
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signIn(username: string, password: string): Observable<any> {
    return this.http.post('auth/login', { username, password });
  }
}
