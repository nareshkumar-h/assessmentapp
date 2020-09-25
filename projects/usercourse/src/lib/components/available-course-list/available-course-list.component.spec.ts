import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableCourseListComponent } from './available-course-list.component';

describe('AvailableCourseListComponent', () => {
  let component: AvailableCourseListComponent;
  let fixture: ComponentFixture<AvailableCourseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableCourseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
