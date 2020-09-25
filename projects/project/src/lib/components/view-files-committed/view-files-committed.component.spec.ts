import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFilesCommittedComponent } from './view-files-committed.component';

describe('ViewFilesCommittedComponent', () => {
  let component: ViewFilesCommittedComponent;
  let fixture: ComponentFixture<ViewFilesCommittedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFilesCommittedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFilesCommittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
