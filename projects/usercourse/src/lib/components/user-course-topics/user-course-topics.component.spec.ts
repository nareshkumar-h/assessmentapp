import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCourseTopicsComponent } from './user-course-topics.component';

describe('UserCourseTopicsComponent', () => {
  let component: UserCourseTopicsComponent;
  let fixture: ComponentFixture<UserCourseTopicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCourseTopicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCourseTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
