import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReportingComponent } from './user-reporting.component';

describe('UserReportingComponent', () => {
  let component: UserReportingComponent;
  let fixture: ComponentFixture<UserReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReportingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
