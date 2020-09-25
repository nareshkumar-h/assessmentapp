import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchCourseContentComponent } from './batch-course-content.component';

describe('BatchCourseContentComponent', () => {
  let component: BatchCourseContentComponent;
  let fixture: ComponentFixture<BatchCourseContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchCourseContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchCourseContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
