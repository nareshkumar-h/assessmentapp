import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchUsersComponent } from './batch-users.component';

describe('BatchUsersComponent', () => {
  let component: BatchUsersComponent;
  let fixture: ComponentFixture<BatchUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
