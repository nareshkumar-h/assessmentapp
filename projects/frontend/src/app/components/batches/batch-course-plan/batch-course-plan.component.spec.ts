import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchCoursePlanComponent } from './batch-course-plan.component';

describe('BatchCoursePlanComponent', () => {
  let component: BatchCoursePlanComponent;
  let fixture: ComponentFixture<BatchCoursePlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchCoursePlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchCoursePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
