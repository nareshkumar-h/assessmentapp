import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRepositorySidebarComponent } from './view-repository-sidebar.component';

describe('ViewRepositorySidebarComponent', () => {
  let component: ViewRepositorySidebarComponent;
  let fixture: ComponentFixture<ViewRepositorySidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRepositorySidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRepositorySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
