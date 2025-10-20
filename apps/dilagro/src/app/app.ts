import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './state/app/app.state';

@Component({
  imports: [RouterModule, CommonModule, MatProgressBarModule, MatToolbarModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private store = inject(Store);

  email$: Observable<string | undefined> = this.store.select(AppState.email);
  
  loading$: Observable<boolean> = this.store.select(AppState.loading);
}