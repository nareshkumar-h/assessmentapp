import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourseCurriculumComponent } from './view-course-curriculum.component';

describe('ViewCourseCurriculumComponent', () => {
  let component: ViewCourseCurriculumComponent;
  let fixture: ComponentFixture<ViewCourseCurriculumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCourseCurriculumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCourseCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
