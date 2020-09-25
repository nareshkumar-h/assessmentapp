import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignBatchCourseComponent } from './assign-batch-course.component';

describe('AssignBatchCourseComponent', () => {
  let component: AssignBatchCourseComponent;
  let fixture: ComponentFixture<AssignBatchCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignBatchCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignBatchCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
