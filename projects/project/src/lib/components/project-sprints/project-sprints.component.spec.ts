import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSprintsComponent } from './project-sprints.component';

describe('ProjectSprintsComponent', () => {
  let component: ProjectSprintsComponent;
  let fixture: ComponentFixture<ProjectSprintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSprintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSprintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
