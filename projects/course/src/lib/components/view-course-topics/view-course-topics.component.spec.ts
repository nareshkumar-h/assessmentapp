import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourseTopicsComponent } from './view-course-topics.component';

describe('ViewCourseTopicsComponent', () => {
  let component: ViewCourseTopicsComponent;
  let fixture: ComponentFixture<ViewCourseTopicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCourseTopicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCourseTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
