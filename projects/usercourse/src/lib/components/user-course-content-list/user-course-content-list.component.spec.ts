import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCourseContentListComponent } from './user-course-content-list.component';

describe('UserCourseContentListComponent', () => {
  let component: UserCourseContentListComponent;
  let fixture: ComponentFixture<UserCourseContentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCourseContentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCourseContentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
