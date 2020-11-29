import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserFeatureRatingReportComponent } from './edit-user-feature-rating-report.component';

describe('EditUserFeatureRatingReportComponent', () => {
  let component: EditUserFeatureRatingReportComponent;
  let fixture: ComponentFixture<EditUserFeatureRatingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserFeatureRatingReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserFeatureRatingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
