import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectActivityComponent } from './add-project-activity.component';

describe('AddProjectActivityComponent', () => {
  let component: AddProjectActivityComponent;
  let fixture: ComponentFixture<AddProjectActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjectActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
