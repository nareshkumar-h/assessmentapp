import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchActivityComponent } from './batch-activity.component';

describe('BatchActivityComponent', () => {
  let component: BatchActivityComponent;
  let fixture: ComponentFixture<BatchActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
