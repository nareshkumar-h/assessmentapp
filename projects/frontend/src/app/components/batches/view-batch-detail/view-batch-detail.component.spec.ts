import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBatchDetailComponent } from './view-batch-detail.component';

describe('ViewBatchDetailComponent', () => {
  let component: ViewBatchDetailComponent;
  let fixture: ComponentFixture<ViewBatchDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBatchDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBatchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
