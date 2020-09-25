import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCourseDashboardComponent } from './user-course-dashboard.component';

describe('UserCourseDashboardComponent', () => {
  let component: UserCourseDashboardComponent;
  let fixture: ComponentFixture<UserCourseDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCourseDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCourseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
