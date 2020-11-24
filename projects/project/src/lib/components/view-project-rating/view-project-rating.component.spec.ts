import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectRatingComponent } from './view-project-rating.component';

describe('ViewProjectRatingComponent', () => {
  let component: ViewProjectRatingComponent;
  let fixture: ComponentFixture<ViewProjectRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProjectRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProjectRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
