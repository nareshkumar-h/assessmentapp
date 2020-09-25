import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerCourseListComponent } from './trainer-course-list.component';

describe('TrainerCourseListComponent', () => {
  let component: TrainerCourseListComponent;
  let fixture: ComponentFixture<TrainerCourseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerCourseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
