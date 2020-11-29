import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositorySidebarComponent } from './repository-sidebar.component';

describe('RepositorySidebarComponent', () => {
  let component: RepositorySidebarComponent;
  let fixture: ComponentFixture<RepositorySidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositorySidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositorySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
