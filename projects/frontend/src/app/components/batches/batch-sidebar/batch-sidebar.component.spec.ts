import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchSidebarComponent } from './batch-sidebar.component';

describe('BatchSidebarComponent', () => {
  let component: BatchSidebarComponent;
  let fixture: ComponentFixture<BatchSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
