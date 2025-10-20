import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDailyStock } from '@seng12112-new/my-lib';

@Injectable({
  providedIn: 'root'
})
export class DailyStock {
  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<IDailyStock[]> {
    // ✅ Fixed endpoint with /api prefix
    return this.httpClient.get<IDailyStock[]>('daily-stock');
  }
}
