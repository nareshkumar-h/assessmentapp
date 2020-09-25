import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTypeBadgeComponent } from './event-type-badge.component';

describe('EventTypeBadgeComponent', () => {
  let component: EventTypeBadgeComponent;
  let fixture: ComponentFixture<EventTypeBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventTypeBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTypeBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
