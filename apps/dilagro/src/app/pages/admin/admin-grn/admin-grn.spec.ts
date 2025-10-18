import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGrn } from './admin-grn';

describe('AdminGrn', () => {
  let component: AdminGrn;
  let fixture: ComponentFixture<AdminGrn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminGrn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGrn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
