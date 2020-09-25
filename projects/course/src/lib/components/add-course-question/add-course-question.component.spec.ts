import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseQuestionComponent } from './add-course-question.component';

describe('AddCourseQuestionComponent', () => {
  let component: AddCourseQuestionComponent;
  let fixture: ComponentFixture<AddCourseQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCourseQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
