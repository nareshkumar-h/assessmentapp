import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubReportComponent } from './github-report.component';

describe('GithubReportComponent', () => {
  let component: GithubReportComponent;
  let fixture: ComponentFixture<GithubReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
