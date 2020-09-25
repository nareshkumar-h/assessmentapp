import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSlackComponent } from './add-slack.component';

describe('AddSlackComponent', () => {
  let component: AddSlackComponent;
  let fixture: ComponentFixture<AddSlackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSlackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSlackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
