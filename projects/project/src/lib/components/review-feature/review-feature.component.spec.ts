import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewFeatureComponent } from './review-feature.component';

describe('ReviewFeatureComponent', () => {
  let component: ReviewFeatureComponent;
  let fixture: ComponentFixture<ReviewFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
