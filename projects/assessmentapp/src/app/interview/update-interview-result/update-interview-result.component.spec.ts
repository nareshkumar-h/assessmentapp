import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInterviewResultComponent } from './update-interview-result.component';

describe('UpdateInterviewResultComponent', () => {
  let component: UpdateInterviewResultComponent;
  let fixture: ComponentFixture<UpdateInterviewResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateInterviewResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInterviewResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
