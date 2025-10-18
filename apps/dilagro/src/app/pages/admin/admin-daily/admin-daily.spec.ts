import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDaily } from './admin-daily';

describe('AdminDaily', () => {
  let component: AdminDaily;
  let fixture: ComponentFixture<AdminDaily>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDaily]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDaily);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
