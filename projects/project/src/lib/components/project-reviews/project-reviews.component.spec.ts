import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectReviewsComponent } from './project-reviews.component';

describe('ProjectReviewsComponent', () => {
  let component: ProjectReviewsComponent;
  let fixture: ComponentFixture<ProjectReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
