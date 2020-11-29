import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectReportFeedbackComponent } from './project-report-feedback.component';

describe('ProjectReportFeedbackComponent', () => {
  let component: ProjectReportFeedbackComponent;
  let fixture: ComponentFixture<ProjectReportFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectReportFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectReportFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
