import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewRatingFormComponent } from './review-rating-form.component';

describe('ReviewRatingFormComponent', () => {
  let component: ReviewRatingFormComponent;
  let fixture: ComponentFixture<ReviewRatingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewRatingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewRatingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
