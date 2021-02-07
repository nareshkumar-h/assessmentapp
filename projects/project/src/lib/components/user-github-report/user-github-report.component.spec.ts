import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGithubReportComponent } from './user-github-report.component';

describe('UserGithubReportComponent', () => {
  let component: UserGithubReportComponent;
  let fixture: ComponentFixture<UserGithubReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGithubReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGithubReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
