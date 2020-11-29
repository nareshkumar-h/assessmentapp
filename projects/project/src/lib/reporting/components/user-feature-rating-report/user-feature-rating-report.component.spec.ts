import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFeatureRatingReportComponent } from './user-feature-rating-report.component';

describe('UserFeatureRatingReportComponent', () => {
  let component: UserFeatureRatingReportComponent;
  let fixture: ComponentFixture<UserFeatureRatingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFeatureRatingReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFeatureRatingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
