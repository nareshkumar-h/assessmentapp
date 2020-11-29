import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMainSidebarComponent } from './project-main-sidebar.component';

describe('ProjectMainSidebarComponent', () => {
  let component: ProjectMainSidebarComponent;
  let fixture: ComponentFixture<ProjectMainSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectMainSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMainSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
