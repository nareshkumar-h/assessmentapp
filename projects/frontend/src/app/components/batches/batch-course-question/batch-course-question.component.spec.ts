import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchCourseQuestionComponent } from './batch-course-question.component';

describe('BatchCourseQuestionComponent', () => {
  let component: BatchCourseQuestionComponent;
  let fixture: ComponentFixture<BatchCourseQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchCourseQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchCourseQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
