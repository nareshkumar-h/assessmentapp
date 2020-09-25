import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSlackComponent } from './view-slack.component';

describe('ViewSlackComponent', () => {
  let component: ViewSlackComponent;
  let fixture: ComponentFixture<ViewSlackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSlackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSlackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
