import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AppService } from 'apps/dilagro/src/app/services/app/app';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngxs/store';
import { ShowLoading } from 'apps/dilagro/src/app/state/app/app.actions';

@Component({
  selector: 'app-admin-grn',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './admin-grn.html',
  styleUrl: './admin-grn.scss'
})
export class AdminGrn {
  @Input({ required: true }) label!: string;
  @Output() update = new EventEmitter<string>();

    private store = inject(Store);
  
  toggle() {
    this.store.dispatch(new ShowLoading(true))
  }
}

