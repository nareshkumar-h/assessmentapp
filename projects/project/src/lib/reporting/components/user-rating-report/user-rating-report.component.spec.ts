import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRatingReportComponent } from './user-rating-report.component';

describe('UserRatingReportComponent', () => {
  let component: UserRatingReportComponent;
  let fixture: ComponentFixture<UserRatingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRatingReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRatingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
