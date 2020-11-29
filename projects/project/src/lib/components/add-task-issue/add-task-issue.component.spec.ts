import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskIssueComponent } from './add-task-issue.component';

describe('AddTaskIssueComponent', () => {
  let component: AddTaskIssueComponent;
  let fixture: ComponentFixture<AddTaskIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaskIssueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
