import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchCourseListComponent } from './batch-course-list.component';

describe('BatchCourseListComponent', () => {
  let component: BatchCourseListComponent;
  let fixture: ComponentFixture<BatchCourseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchCourseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
