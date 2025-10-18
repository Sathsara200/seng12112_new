import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DailyStock } from 'apps/dilagro/src/app/services/daily-stock/daily-stock';
import { AsyncPipe, JsonPipe, DatePipe, NgIf, NgFor } from '@angular/common'; // ✅ import needed pipes/directives
import { IDailyStock } from '@seng41293-2025/model';

@Component({
  selector: 'app-admin-daily',
  standalone: true, // make sure this is a standalone component
  imports: [AsyncPipe, JsonPipe, DatePipe, NgIf, NgFor], // ✅ add pipes/directives here
  templateUrl: './admin-daily.html',
  styleUrls: ['./admin-daily.scss']
})
export class AdminDaily {
  dailyStocks$: Observable<IDailyStock[]>; // Observable for template

  constructor(private dailyStock: DailyStock) {
    this.dailyStocks$ = dailyStock.findAll();
  }
}
