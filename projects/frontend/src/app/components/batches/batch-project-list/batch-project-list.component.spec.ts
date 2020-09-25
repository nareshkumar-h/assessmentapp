import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchProjectListComponent } from './batch-project-list.component';

describe('BatchProjectListComponent', () => {
  let component: BatchProjectListComponent;
  let fixture: ComponentFixture<BatchProjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchProjectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
