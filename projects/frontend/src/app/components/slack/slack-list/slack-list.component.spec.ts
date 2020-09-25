import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlackListComponent } from './slack-list.component';

describe('SlackListComponent', () => {
  let component: SlackListComponent;
  let fixture: ComponentFixture<SlackListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlackListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
