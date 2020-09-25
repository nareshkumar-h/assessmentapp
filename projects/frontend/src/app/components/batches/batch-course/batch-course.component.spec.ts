import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchCourseComponent } from './batch-course.component';

describe('BatchCourseComponent', () => {
  let component: BatchCourseComponent;
  let fixture: ComponentFixture<BatchCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
