import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReportSidebarComponent } from './user-report-sidebar.component';

describe('UserReportSidebarComponent', () => {
  let component: UserReportSidebarComponent;
  let fixture: ComponentFixture<UserReportSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReportSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReportSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
