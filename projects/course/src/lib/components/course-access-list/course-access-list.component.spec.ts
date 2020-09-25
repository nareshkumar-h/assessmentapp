import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAccessListComponent } from './course-access-list.component';

describe('CourseAccessListComponent', () => {
  let component: CourseAccessListComponent;
  let fixture: ComponentFixture<CourseAccessListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAccessListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAccessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
