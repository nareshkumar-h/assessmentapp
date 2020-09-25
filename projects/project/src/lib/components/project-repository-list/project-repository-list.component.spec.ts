import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRepositoryListComponent } from './project-repository-list.component';

describe('ProjectRepositoryListComponent', () => {
  let component: ProjectRepositoryListComponent;
  let fixture: ComponentFixture<ProjectRepositoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectRepositoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectRepositoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
