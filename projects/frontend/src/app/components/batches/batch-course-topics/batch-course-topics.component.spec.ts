import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchCourseTopicsComponent } from './batch-course-topics.component';

describe('BatchCourseTopicsComponent', () => {
  let component: BatchCourseTopicsComponent;
  let fixture: ComponentFixture<BatchCourseTopicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchCourseTopicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchCourseTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
