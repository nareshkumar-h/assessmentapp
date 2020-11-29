import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserRatingReportComponent } from './view-user-rating-report.component';

describe('ViewUserRatingReportComponent', () => {
  let component: ViewUserRatingReportComponent;
  let fixture: ComponentFixture<ViewUserRatingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUserRatingReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserRatingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
