import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoEventsComponent } from './repo-events.component';

describe('RepoEventsComponent', () => {
  let component: RepoEventsComponent;
  let fixture: ComponentFixture<RepoEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
