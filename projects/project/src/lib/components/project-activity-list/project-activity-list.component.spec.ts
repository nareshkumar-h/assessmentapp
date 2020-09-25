import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectActivityListComponent } from './project-activity-list.component';

describe('ProjectActivityListComponent', () => {
  let component: ProjectActivityListComponent;
  let fixture: ComponentFixture<ProjectActivityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectActivityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
