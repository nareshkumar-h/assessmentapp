import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectFeatureComponent } from './add-project-feature.component';

describe('AddProjectFeatureComponent', () => {
  let component: AddProjectFeatureComponent;
  let fixture: ComponentFixture<AddProjectFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjectFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
