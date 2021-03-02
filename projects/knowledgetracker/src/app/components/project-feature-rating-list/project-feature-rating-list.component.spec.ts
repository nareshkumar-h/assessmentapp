import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFeatureRatingListComponent } from './project-feature-rating-list.component';

describe('ProjectFeatureRatingListComponent', () => {
  let component: ProjectFeatureRatingListComponent;
  let fixture: ComponentFixture<ProjectFeatureRatingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectFeatureRatingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFeatureRatingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
