import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectReviewRatingComponent } from './view-project-review-rating.component';

describe('ViewProjectReviewRatingComponent', () => {
  let component: ViewProjectReviewRatingComponent;
  let fixture: ComponentFixture<ViewProjectReviewRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProjectReviewRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProjectReviewRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
