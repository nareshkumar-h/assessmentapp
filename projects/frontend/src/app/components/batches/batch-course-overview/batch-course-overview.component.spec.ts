import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchCourseOverviewComponent } from './batch-course-overview.component';

describe('BatchCourseOverviewComponent', () => {
  let component: BatchCourseOverviewComponent;
  let fixture: ComponentFixture<BatchCourseOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchCourseOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchCourseOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
