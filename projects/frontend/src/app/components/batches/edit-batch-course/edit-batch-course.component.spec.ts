import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBatchCourseComponent } from './edit-batch-course.component';

describe('EditBatchCourseComponent', () => {
  let component: EditBatchCourseComponent;
  let fixture: ComponentFixture<EditBatchCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBatchCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBatchCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
