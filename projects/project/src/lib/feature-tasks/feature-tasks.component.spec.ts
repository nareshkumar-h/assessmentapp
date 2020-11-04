import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureTasksComponent } from './feature-tasks.component';

describe('FeatureTasksComponent', () => {
  let component: FeatureTasksComponent;
  let fixture: ComponentFixture<FeatureTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
