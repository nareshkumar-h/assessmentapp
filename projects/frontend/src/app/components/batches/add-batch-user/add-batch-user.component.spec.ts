import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBatchUserComponent } from './add-batch-user.component';

describe('AddBatchUserComponent', () => {
  let component: AddBatchUserComponent;
  let fixture: ComponentFixture<AddBatchUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBatchUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBatchUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
