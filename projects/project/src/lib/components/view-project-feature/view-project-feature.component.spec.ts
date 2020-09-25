import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectFeatureComponent } from './view-project-feature.component';

describe('ViewProjectFeatureComponent', () => {
  let component: ViewProjectFeatureComponent;
  let fixture: ComponentFixture<ViewProjectFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProjectFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProjectFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
