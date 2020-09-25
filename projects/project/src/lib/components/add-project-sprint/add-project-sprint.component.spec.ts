import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectSprintComponent } from './add-project-sprint.component';

describe('AddProjectSprintComponent', () => {
  let component: AddProjectSprintComponent;
  let fixture: ComponentFixture<AddProjectSprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjectSprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
