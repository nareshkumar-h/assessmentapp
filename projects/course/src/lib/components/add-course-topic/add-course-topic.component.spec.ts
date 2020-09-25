import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseTopicComponent } from './add-course-topic.component';

describe('AddCourseTopicComponent', () => {
  let component: AddCourseTopicComponent;
  let fixture: ComponentFixture<AddCourseTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCourseTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
