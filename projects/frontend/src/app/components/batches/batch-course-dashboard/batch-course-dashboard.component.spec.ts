import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchCourseDashboardComponent } from './batch-course-dashboard.component';

describe('BatchCourseDashboardComponent', () => {
  let component: BatchCourseDashboardComponent;
  let fixture: ComponentFixture<BatchCourseDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchCourseDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchCourseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
