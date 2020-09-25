import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCourseQuestionsComponent } from './user-course-questions.component';

describe('UserCourseQuestionsComponent', () => {
  let component: UserCourseQuestionsComponent;
  let fixture: ComponentFixture<UserCourseQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCourseQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCourseQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
