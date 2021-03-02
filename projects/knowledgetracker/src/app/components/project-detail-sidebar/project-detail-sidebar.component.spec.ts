import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailSidebarComponent } from './project-detail-sidebar.component';

describe('ProjectDetailSidebarComponent', () => {
  let component: ProjectDetailSidebarComponent;
  let fixture: ComponentFixture<ProjectDetailSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDetailSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
