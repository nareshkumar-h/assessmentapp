import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravisBadgeComponent } from './travis-badge.component';

describe('TravisBadgeComponent', () => {
  let component: TravisBadgeComponent;
  let fixture: ComponentFixture<TravisBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravisBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravisBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
